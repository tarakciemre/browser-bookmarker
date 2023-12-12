import AppManager from "../tab_manager/app_manager";
import axios from "axios";
import { app } from "electron";

export let username: string;
export let password: string;
export let appManager = new AppManager()
export let token: string;

export async function login(usernameIn: string, passwordIn: string){
    try  {
        const response = await axios.post('https://browser-bookmarker-backend.vercel.app/login', {
            username: usernameIn,
            password: passwordIn
        })
        username = usernameIn;
        password = passwordIn;
        console.log(response)
        token = response.data.token
        return token;
    } catch (e) {
        return false
    }
}

