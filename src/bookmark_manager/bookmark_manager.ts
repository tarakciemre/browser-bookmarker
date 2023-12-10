import { BookMark } from "./bookmark";

export class BookMarkManager{
    bookmarks: BookMark[] = [];

    constructor(){
        this.bookmarks = []
    }

    getBookMark(link: string): BookMark{
        const foundBookmark = this.bookmarks.find(bookmark => bookmark.link === link);

        if (foundBookmark) {
            return foundBookmark;
        }   

        return null; 
    }

    addBookMark(newBookMark: BookMark): void{
        this.bookmarks.push(newBookMark);
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