import { SearchHistory } from "../Navigator/history";
import { createWebView } from "../Controllers/webRenderer";
import { renderListener } from "../Events/eventInterfaces";
import { RenderDispatcher } from "../Events/renderEventDispatcher";

export class Tab implements renderListener{
    history: SearchHistory;
    id: number;
    element:Element
    webView:Element

    constructor(id: number, element: Element){
        this.id = id;
        this.history = new SearchHistory();
        this.element = element
        RenderDispatcher.getInstance().addObserver(this);
        this.webView = createWebView("https://www.youtube.com/")
    }

    destroy() {
        const parentElement = document.getElementById('webview-container');
        parentElement.removeChild(this.webView);
    }

    setTitle(url:string) {
        
    }

    searchWebURL(url:string) {
        this.history.add(url)
        this.destroy()
        this.webView = createWebView(url)
    }

    goToPrevious() {

    }
    
    goToNext() {

    }

    onTabActivation(id: number): void {
        if(this.id === id){
            //const link = this.history.getCurrent();
            //renderUrl(this.webView);
            this.element.classList.add("tab-active")
            this.webView.classList.remove("no-display")
            return
        }
        if( this.element.classList.contains("tab-active")) {
            this.element.classList.remove("tab-active")
            this.webView.classList.add("no-display")
        }
    }
}