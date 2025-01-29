const openAIClient = require('../config/openai');
const fs = require('fs');
const path = require('path');

const textToSpeech = async () => {
  try {
    const speechFile = path.resolve('./speech.mp3');

    const mp3 = await openAIClient.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy',
      input:
        'A futuristic cityscape at night with flying cars and neon lights.',
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);
  } catch (error) {}
};

const speechToText = async () => {
  try {
    const transcription = await openAIClient.audio.transcriptions.create({
      file: fs.createReadStream('./speech.mp3'),
      model: 'whisper-1',
      response_format: 'verbose_json',
      //   timestamp_granularities: ['word'],
    });

    console.log(transcription);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  textToSpeech,
  speechToText,
};
