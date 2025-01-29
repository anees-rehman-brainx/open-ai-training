const openAIClient = require('../config/openai');

const imageDescription = async () => {
  const response = await openAIClient.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: "What's in this image?" },
          {
            type: 'image_url',
            image_url: {
              url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg',
            },
          },
        ],
      },
    ],
  });

  console.log(response.choices[0]);
};

module.exports = {
  imageDescription,
};
