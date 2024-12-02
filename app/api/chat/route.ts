import { google } from "@ai-sdk/google"
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google("models/gemini-1.5-pro-latest", { 
        safetySettings: [
            {category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE'},
            {category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE'},
            {category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE'},
            {category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE'}
          ],
    }),   
    messages,
    system: `\n
    - you will generate springboot microservice entire code required for converting TIBCO BW project to springboot microservice
    - ensure it is clear and detailed code with comments
    - for example, if any log statement is used, then give implementation for the same.
    - give title for the each code snippets
    - If any code is copied from any other source, then give reference for the same.
    - ensure the code is working and unit test cases are included
    - If any question is asked other than code, then generate a response 'I am trained to answer only about TIBCO BW to Java conversion.`,
  });

  return result.toDataStreamResponse();
}