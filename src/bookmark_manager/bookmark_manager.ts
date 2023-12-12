import { BookMark } from "./bookmark";
import axios from "axios";
import * as user from "../user_manager/user"

export class BookMarkManager{
    bookmarks: BookMark[] = [];

    constructor(){
        this.getAllBookmarks()
    }

    getBookMark(link: string): BookMark{
        const foundBookmark = this.bookmarks.find(bookmark => bookmark.link === link);
        return foundBookmark
    }

    async getAllBookmarks() {
        let data = await fetchBookMarks(user.token, user.username)
        this.bookmarks = data.map((b:any) => {
            return new BookMark("", b.url)
        })
        return this.bookmarks;
    }

    isBookmarked(link: string):boolean {
        return this.getBookMark(link) != undefined
    }

    addBookMark(url:string): void{
        const urlObject = new URL(url);
        const hostname = urlObject.hostname;
        let siteName;
        url.includes("www")?
            siteName = hostname.split('.')[1]:
            siteName = hostname.split('.')[0]
        siteName = siteName.charAt(0).toUpperCase() + siteName.slice(1)
        const newBookmark = new BookMark(siteName, url)
        this.bookmarks.push(newBookmark);
    }

    deleteBookMark(link: string): boolean {
        const index = this.bookmarks.findIndex(bookmark => bookmark.link === link);

        if (index !== -1) {
            this.bookmarks.splice(index, 1);
            return true;
        }

        return false;
    }

}

export async function fetchBookMarks(token:string, username: string){
    try  {
        const response = await axios.get("https://browser-bookmarker-backend.vercel.app/bookmarks/" + username, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        return response.data;
    } catch (e) {
        return false
    }
}

export async function addBookMark(username: string, password: string){
    // try  {
    //     const response = await axios.post('https://browser-bookmarker-backend.vercel.app/login', {
    //         username: username,
    //         password: password
    //     })
        
    //     return token;
    // } catch (e) {
    //     return false
    // }
}