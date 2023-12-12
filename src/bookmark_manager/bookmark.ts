import axios from "axios";
export class BookMark{
    siteName: string;
    link: string;
    addDate: Date;
    id: number;

    constructor(id:number, siteName: string, link: string){
        this.siteName = siteName;
        this.link = link;
        this.addDate = new Date();
        this.id = id
    }

    getBookMark(): BookMark{
        return this;
    }
}
export const createBookmark = (userId: string, url: string): Promise<string> => {
    return axios.post('http://browser-bookmarker-backend.vercel.app/bookmarks', {
        userId: userId,
        url: url
    })
    .then(response => response.data)
    .catch(error => {
        console.error(error);
        throw error;
    });
}

export const getBookmarks = (userId: string): Promise<string> => {
    return axios.get('http://browser-bookmarker-backend.vercel.app/bookmarks/1')
    .then(response => response.data)
    .catch(error => {
        console.error(error);
        throw error;
    });
}