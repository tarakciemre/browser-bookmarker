import { BookMark } from "../bookmark_manager/bookmark";
import { createBookmarkView } from "../Controllers/bookmarkController";
import { Tab } from "./tab";

export class BookmarkTab extends Tab {
    id: number;
    element:Element
    webView:Element
    bookmarks: BookMark[]

    constructor(id: number, element: Element, bookmarks: BookMark[]){
        super(id, element)
        this.destroy()
        this.bookmarks = bookmarks
        this.webView = createBookmarkView(bookmarks)
    }

    destroy() {
        const parentElement = document.getElementById('webview-container');
        parentElement.removeChild(this.webView);
    }

    setTitle() {
        
    }

    getURL() {
        return ""
    }

    searchWebURL(url:string): string {
        return ""
    }

    goToPrevious(): string {
        return ""
    }
    
    goToNext(): string{
        return ""
    }

    reload(): string {
        this.destroy()
        this.webView = createBookmarkView(this.bookmarks)
        return ""
    }

}