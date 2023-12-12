import OpenAI from "openai";

const OPENAI_API_KEY = "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"
const requestOptions: { temperature: number } = {
  temperature: 0,
};

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export const requestSongFromOpenAi = async (url:string): Promise<string> => {
  const openAiResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "Determine the category of the provided website with url: " + url + 
        " and offer 3 similar websites with the same category." +
        "Response format should be: category: <category>, similar websites: <website1>, <website2>, <website3>." ,
      },
    ],
    ...requestOptions,
  });
  
  return openAiResponse.choices[0].message.content;
};
