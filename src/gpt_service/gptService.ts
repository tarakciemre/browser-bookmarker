import axios from "axios";
import * as user from "../user_manager/user"

export async function requestFromOpenAi(url:string) {
    const response = await axios.post('https://browser-bookmarker-backend.vercel.app/recommendation', {
        "url": url,
      }, 
      {
        headers: {
            "Authorization": "Bearer " + user.token
        }
    }
    );
    console.log(response.data)
    return response.data;
}



