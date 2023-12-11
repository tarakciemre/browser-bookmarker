import { BookMark } from "./bookmark";

export class BookMarkManager{
    bookmarks: BookMark[] = [];

    constructor(){
        this.bookmarks = []
    }

    getBookMark(link: string): BookMark{
        const foundBookmark = this.bookmarks.find(bookmark => bookmark.link === link);
        return foundBookmark
    }

    getAllBookmarks() {
        return this.bookmarks;
    }

    isBookmarked(link: string):boolean {
        return this.getBookMark(link) != undefined
    }

    addBookMark(url:string): void{
        const newBookmark = new BookMark("", url)
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