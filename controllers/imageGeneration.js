const openAIClient = require('../config/openai');
const fs = require('fs');
const path = require('path');

const textToImage = async () => {
  const response = await openAIClient.images.generate({
    model: 'dall-e-3',
    prompt:
      'A delicious pizza with extra cheese and pepperoni, served on a wooden table, with two persons enjoying it',
    n: 1,
    size: '1024x1024',
  });

  console.log(response.data[0].url);
};

const imageVariation = async () => {
  try {
    // Correct path to your image in the assets folder
    const imagePath = path.join(__dirname, '../assets/cat.png');

    // Create variation
    const response = await openAIClient.images.createVariation({
      image: fs.createReadStream(imagePath),
      n: 1,
      size: '1024x1024',
    });

    console.log(response); // Prints the URL of the generated image variation
  } catch (error) {
    console.error(
      'Error creating image variation:',
      error.response ? error.response.data : error.message
    );
  }
};

module.exports = {
  textToImage,
  imageVariation,
};
