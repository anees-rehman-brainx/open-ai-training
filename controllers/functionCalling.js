const openAIClient = require('../config/openai');

const getWeatherUsingFunctionCall = async (req, res) => {
  try {
    // Definign the function
    const tools = [
      {
        type: 'function',
        function: {
          name: 'get_weather',
          description:
            'Get current temperature for provided coordinates in celsius.',
          parameters: {
            type: 'object',
            properties: {
              latitude: { type: 'number' },
              longitude: { type: 'number' },
            },
            required: ['latitude', 'longitude'],
            additionalProperties: false,
          },
          strict: true,
        },
      },
    ];

    // prompt message
    const messages = [
      {
        role: 'user',
        content: "What's the weather like in Paris today?",
      },
    ];

    // calling the open ai
    const completion = await openAIClient.chat.completions.create({
      model: 'gpt-4o',
      messages,

      //   comment below line to test the behaviour of chatgpt before function call
      tools,
    });

    // console.log(completion.choices[0].message);
    // console.log(completion.choices[0].message.tool_calls);

    const toolCall = completion.choices[0].message.tool_calls[0];
    const args = JSON.parse(toolCall.function.arguments);

    const result = await getWeather(args.latitude, args.longitude);

    // passing the result again in api call
    messages.push(completion.choices[0].message); // append model's function call message
    messages.push({
      // append result message
      role: 'tool',
      tool_call_id: toolCall.id,
      content: result.toString(),
    });

    const completion2 = await openAIClient.chat.completions.create({
      model: 'gpt-4o',
      messages,
      tools,
    });

    console.log(completion2.choices[0].message.content);
  } catch (error) {
    console.log(error);
  }
};

async function getWeather(latitude, longitude) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
  );
  const data = await response.json();
  return data.current.temperature_2m;
}

module.exports = {
  getWeatherUsingFunctionCall,
};
