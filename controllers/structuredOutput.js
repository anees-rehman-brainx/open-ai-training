const openAIClient = require('../config/openai');
const { z } = require('zod');
const { zodResponseFormat } = require('openai/helpers/zod');

// Chain of thoughts
const chainOfThoughts = async () => {
  try {
    const Step = z.object({
      explanation: z.string(),
      output: z.string(),
    });

    const MathReasoning = z.object({
      steps: z.array(Step),
      final_answer: z.string(),
    });

    const completion = await openAIClient.beta.chat.completions.parse({
      model: 'gpt-4o-2024-08-06',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful math tutor. Guide the user through the solution step by step.',
          // 'You are a helpful biology tutor who does not know math at all. When a math problem is presented, refuse to solve it and explain that you can guide through the thought process, but cannot solve it directly.',
        },
        { role: 'user', content: 'who was hitler' },
      ],
      response_format: zodResponseFormat(MathReasoning, 'math_reasoning'),
    });

    const math_reasoning = completion.choices[0].message.parsed;
    if (math_reasoning.refusal) {
      console.log(math_reasoning.refusal);
    } else {
      console.log(math_reasoning);
    }
  } catch (error) {
    console.log(error);
  }
};

const structuredDataExtraction = async () => {
  try {
    const ResearchPaperExtraction = z.object({
      title: z.string(),
      authors: z.array(z.string()),
      abstract: z.string(),
      keywords: z.array(z.string()),
    });

    const completion = await openAIClient.beta.chat.completions.parse({
      model: 'gpt-4o-2024-08-06',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert at structured data extraction. You will be given unstructured text from a research paper and should convert it into the given structure.',
        },
        {
          role: 'user',
          content:
            'The influence of Artificial Intelligence (AI) in modern healthcare is growing exponentially. AI applications in the healthcare sector are vast, from AI-driven diagnostic tools to personalized medicine. These technologies are revolutionizing how medical professionals deliver care to patients. However, the integration of AI into healthcare also raises concerns, such as ethics, data privacy, and security. The paper explores these challenges and the future potential of AI in clinical settings. Our analysis also includes the benefits of AI in patient management systems and its effectiveness in diagnosing diseases at early stages.',
        },
      ],
      response_format: zodResponseFormat(
        ResearchPaperExtraction,
        'research_paper_extraction'
      ),
    });

    const research_paper = completion.choices[0].message.parsed;

    console.log(research_paper);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  chainOfThoughts,
  structuredDataExtraction,
};
