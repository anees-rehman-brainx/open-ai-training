const openAIClient = require('../config/openai');

const generateText = async () => {
  const completion = await openAIClient.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'developer', content: 'You are a helpful assistant.' },
      {
        role: 'user',
        content: 'Write a haiku about recursion in programming.',
      },
    ],
  });

  console.log(completion.choices[0].message);
};

const generateTextJSONFormat = async () => {
  try {
    // Request completion with function calling
    const completion = await openAIClient.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an assistant that extracts data in JSON format.',
        },
        {
          role: 'user',
          content: 'Medicines for headache',
        },
      ],
      functions: [
        {
          name: 'extract_medicine_info',
          description:
            'Extracts medicine name, price, and potency into a JSON object.',
          parameters: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'The name of the medicine',
              },
              price: {
                type: 'number',
                description: 'The price of the medicine',
              },
              potency: {
                type: 'string',
                description: 'The potency of the medicine',
              },
            },
            required: ['name', 'price', 'potency'],
          },
        },
      ],
      function_call: { name: 'extract_medicine_info' }, // Explicit function call
    });

    console.log(completion.choices[0].message);
  } catch (error) {
    console.error(
      'Error:',
      error.response ? error.response.data : error.message
    );
  }
};

module.exports = {
  generateText,
  generateTextJSONFormat,
};
