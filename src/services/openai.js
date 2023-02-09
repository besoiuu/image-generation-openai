import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY,
});

const openAi = new OpenAIApi(configuration);

export const createImage = async (imageParameters) => {
  
  const response = await openAi.createImage(imageParameters);
  const imageResult = response?.data?.data[0]?.url;
  return imageResult;
};
