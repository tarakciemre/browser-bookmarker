import { createBookmarkView } from "../Controllers/bookmarkController";
import { Tab } from "./tab";

export class BookmarkTab extends Tab {
    id: number;
    element:Element
    webView:Element

    constructor(id: number, element: Element){
        super(id, element)
        this.history = undefined
        this.destroy()
        this.webView = createBookmarkView()
    }

    destroy() {
        const parentElement = document.getElementById('webview-container');
        parentElement.removeChild(this.webView);
    }

    setTitle(url:string) {
        
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
        this.webView = createBookmarkView()
        return ""
    }

}