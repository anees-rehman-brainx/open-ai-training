const openAIClient = require('../config/openai');

const textImageModeration = async () => {
  //   let text = 'You are an idiot and no one likes you.';
  let text = 'Let’s have a productive meeting tomorrow at 10 AM.';
  // let text = "I feel like ending my life";
  // let text = "I will kill you if you don’t listen to me!";

  const moderation = await openAIClient.moderations.create({
    model: 'omni-moderation-latest',
    input: [
      { type: 'text', text: text },
      //   {
      //     type: 'image_url',
      //     image_url: {
      //       url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnDppTZUZu7YrZI31sNdPzF2NYUT8Mm6-moQ&s',
      //       // can also use base64 encoded image URLs
      //       // url: "data:image/jpeg;base64,abcdefg..."
      //     },
      //   },
    ],
  });

  console.log(moderation);
  console.log(moderation?.results[0]?.categories);
  console.log(moderation?.results[0]?.category_scores);
  console.log(moderation?.results[0]?.category_applied_input_types);
};

module.exports = {
  textImageModeration,
};
