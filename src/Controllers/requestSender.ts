import axios from 'axios';
import * as cheerio from 'cheerio';

export async function setElementTitle(url:string, element:HTMLElement): Promise<string> {
  try {
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    // Extract and return the title
    const title = $('head title').text();
    element.innerHTML
  } catch (error) {
    return 'Error';
  }
}