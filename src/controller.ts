import { type Request, type Response } from 'express';
import prompts from '../prompts.json' with { type: "json" };

export const startJob = (req: Request, res: Response) => {
  // console.log('prompts ',req)
  const { text }: { text: string } = req.body;
  console.log('text', text)
  const prompt = prompts['travel-guide'].replaceAll('{{text}}', text);
  console.log('\n---',prompt)
  res.json({ success: true, prompt });
}
