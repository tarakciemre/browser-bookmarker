import { BookMark } from "./bookmark";

class BookMarkManager{
    bookmarks: BookMark[] = [];

    addBookMark(newBookMark: BookMark): void{
        this.bookmarks.push(newBookMark);
    }

}