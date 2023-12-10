import axios from 'axios';
import * as cheerio from 'cheerio';

export async function setTitle(url: string): Promise<string> {
  try {
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    // Extract and return the title
    const title = $('head title').text();
    return title;
  } catch (error) {
    return 'Error';
  }
}