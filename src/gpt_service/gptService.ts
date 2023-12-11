import * as os from "os";
import OpenAI from "openai";

const OPENAI_API_KEY = "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";

const requestOptions: { temperature: number } = {
  temperature: 0,
};

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const requestFromOpenAi = async (url: string): Promise<string> => {
  const openAiResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content:
          "Determine the category of the provided website with url: " +
          url +
          " and offer 3 similar websites with the same category." +
          "Response format should be: category: <category>, similar websites: <website1>, <website2>, <website3>.",
      },
    ],
    ...requestOptions,
  });

  return openAiResponse.choices[0].message.content;
};
