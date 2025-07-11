import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Translate the following Polish text into clear, simple English. Also explain what action should be taken if the message is an instruction.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
    });

    const translation = completion.choices[0].message?.content || 'Translation failed.';
    res.status(200).json({ translation });
  } catch (error) {
    console.error("OpenAI API error:", error);

    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
}
