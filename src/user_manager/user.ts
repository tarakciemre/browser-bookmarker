import { AppManager } from "../tab_manager/app_manager";
import {BookMarkManager} from "../bookmark_manager/bookmark_manager";
import axios from "axios";

class User{
    email: string;
    password: string;
    appManager: AppManager;
    bookMarkManager: BookMarkManager;

    async createUser(email: string, password: string){
        const response = await axios.post('http://browser-bookmarker-backend.vercel.app/', {
            email: email,
            password: password
        });
        return response;
    }

    constructor(email: string, password: string){
        this.email = email;
        this.password = password;
        this.appManager = new AppManager();
        this.bookMarkManager = new BookMarkManager();
    }
}