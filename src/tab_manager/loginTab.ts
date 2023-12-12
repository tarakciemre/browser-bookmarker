import { SearchHistory } from "../Navigator/searchHistory";
import { createWebView } from "../Controllers/webRenderer";
import { renderListener } from "../Events/eventInterfaces";
import { RenderDispatcher } from "../Events/renderEventDispatcher";
import { Tab } from "./tab";
import { createLoginTab } from "../Controllers/LoginTabController";

export class LoginTab extends Tab{
    id: number;
    element:Element
    webView:any

    constructor(id: number, element: Element){
        super(id, element)
        this.setTitle()
        this.destroy()
        this.webView = createLoginTab()
    }

    destroy() {
        const parentElement = document.getElementById('webview-container');
        parentElement.removeChild(this.webView);
    }
    
    setTitle() {
        
    }

    getURL() {
        return "Login"
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
        this.webView = createLoginTab()
        return ""
    }
    
}
