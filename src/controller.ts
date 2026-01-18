import { type Request, type Response } from "express";
import prompts from "../prompts.json" with { type: "json" };
import { GoogleGenAI } from "@google/genai";
import path from "node:path";
import process from "node:process";
import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";

// const ai = new GoogleGenAI({});

const SCOPES = ["https://www.googleapis.com/auth/documents"];
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

export const startJob = async (req: Request, res: Response) => {
  // console.log('prompts ',req)
  // const { text }: { text: string } = req.body;

  const auth = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  console.log('autenticado');

  const docs = google.docs({ version: "v1", auth });
  console.log('docs iniciado')

  const docCreate = await docs.documents.create({
    requestBody: { title: "test title" },
  });

  const docId = docCreate.data.documentId;
  if (!docId) {
    console.log("undef docId");
    return res.json({ success: false, message: "undef docId" });
  }
  console.log('doc created:', docId)

  // console.log("text", text);
  // const prompt = prompts["travel-guide"].replaceAll("{{text}}", text);
  // console.log("\n---", prompt);

  // const response = await ai.models.generateContent({
  //   model: "gemini-3-flash-preview",
  //   contents: prompt,
  // });

  res.json({ success: true, message: 'done' });
};
