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
            console.log(b.url)
            const urlObject = new URL(b.url);
            const hostname = urlObject.hostname;
            let siteName;
            b.url.includes("www")?
                siteName = hostname.split('.')[1]:
                siteName = hostname.split('.')[0]
            siteName = siteName.charAt(0).toUpperCase() + siteName.slice(1)
            return new BookMark(b.id, siteName, b.url)
        })
        return this.bookmarks;
    }

    isBookmarked(link: string):boolean {
        return this.getBookMark(link) != undefined
    }

    async addBookMark(url:string) {
        try  {
            const response = await axios.post("https://browser-bookmarker-backend.vercel.app/bookmark",
            {
                "username": user.username,
                "url": url
            },
            {
                headers: {
                    "Authorization": "Bearer " + user.token
                }
            })
            await this.getAllBookmarks()
            return response.data;
        } catch (e) {
            return false
        }
        // const urlObject = new URL(url);
        // const hostname = urlObject.hostname;
        // let siteName;
        // url.includes("www")?
        //     siteName = hostname.split('.')[1]:
        //     siteName = hostname.split('.')[0]
        // siteName = siteName.charAt(0).toUpperCase() + siteName.slice(1)
        // const newBookmark = new BookMark(siteName, url)
    }

    async deleteBookMark(link:string) {

        const id = this.bookmarks.find(bookmark => bookmark.link === link).id;
        try  {
            const response = await axios.delete("https://browser-bookmarker-backend.vercel.app/bookmark/" + id,
            {
                headers: {
                    "Authorization": "Bearer " + user.token
                }
            })
            await this.getAllBookmarks()
            return response.data;
        } catch (e) {
            return false
        }
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

export async function addBookMarkToDb(bookmark:BookMark){
    try  {
        const response = await axios.post("https://browser-bookmarker-backend.vercel.app/bookmark",
        {
            "username": user.username,
            "url": bookmark.link
        },
        {
            headers: {
                "Authorization": "Bearer " + user.token
            }
        })
        return response.data;
    } catch (e) {
        return false
    }
}