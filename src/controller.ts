import { type Request, type Response } from 'express';
import prompts from '../prompts.json' with { type: 'json' };
import { GoogleGenAI } from '@google/genai';
import path from 'node:path';
import proc from 'node:process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { config } from 'dotenv';

config();

// const {GEMINI_API_KEY} = process.env;
// console.log('GEMINI_API_KEY', GEMINI_API_KEY)

// const ai = new GoogleGenAI({});

const { AI_TO_DOCS_USER_TO_PERMISSION_EMAIL } = process.env;
const emailToGrantPermission = AI_TO_DOCS_USER_TO_PERMISSION_EMAIL || '';

const SCOPES = ['https://www.googleapis.com/auth/documents', 'https://www.googleapis.com/auth/drive'];
const CREDENTIALS_PATH = path.join(proc.cwd(), 'credentials.json');

const auth = await authenticate({
  scopes: SCOPES,
  keyfilePath: CREDENTIALS_PATH,
});

export const startJob = async (req: Request, res: Response) => {
  try {
    // console.log('prompts ',req)
    const { text }: { text: string } = req.body;

    // const docs = google.docs({ version: "v1", auth });
    // console.log('docs api instantiated')
    const drive = google.drive({ version: 'v3', auth });
    // console.log('drive api instantiated')


    // const docCreate = await docs.documents.create({
    //   requestBody: { title: 'test title' },
    // });

    // const documentId = docCreate.data.documentId;
    const documentId = '1hTi8zOYh05C0jFc9Mwap9ByR0rBnZIXx_GEneSF_LwM';

    if (!documentId) {
      console.log('undef documentId');
      return res.json({ success: false, message: 'undef documentId' });
    }
    console.log('docs file created:', documentId)

    // const prompt = prompts["travel-guide"].replaceAll("{{text}}", text);

    // console.log('generating ai response')
    // const aiResponse = await ai.models.generateContent({
    //   model: "gemini-3-flash-preview",
    //   contents: prompt,
    // });

    // console.log('response', aiResponse.text);
    // const responseText = aiResponse.text;
    // if (!responseText) {
    //   console.log('Response text is undefined!');
    //   return res.status(500).json({ success: false, message: 'No response text from AI' });
    // }
    // const requests = [{
    //   insertText: {
    //     location: {
    //       index: 1,
    //     },
    //     text: responseText
    //   }
    // },
    // ];

    // const response = await docs.documents.batchUpdate({
    //   documentId,
    //   requestBody: {
    //     requests
    //   }
    // });

    // if (!response.data) {
    //   console.log('no data response!!!')
    // }

    // console.log(`Updated document with ${response.data.replies?.length} replies.`);
    // console.log(response.data);

    const docCreatePermission = {
      'type': 'user',
      'role': 'writer',
      'emailAddress': emailToGrantPermission,
    }

    const res = drive.permissions.create({ fileId: documentId, requestBody: docCreatePermission })
    const docFile = await drive.files.get({ fileId: documentId });
    
    docFile.data.lin


    res.json({ success: true, message: 'done' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'internal error' });
  }

};
