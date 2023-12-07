import { AppManager } from "../tab_manager/app_manager";
import {BookMarkManager} from "../bookmark_manager/bookmark_manager";

class User{
    email: string;
    password: string;
    appManager: AppManager;
    bookMarkManager: BookMarkManager;

    constructor(email: string, password: string){
        this.email = email;
        this.password = password;
        this.appManager = new AppManager();
        this.bookMarkManager = new BookMarkManager();
    }
}