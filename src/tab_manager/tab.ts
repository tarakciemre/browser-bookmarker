import { SearchHistory } from "../Navigator/searchHistory";
import { createWebView } from "../Controllers/webRenderer";
import { renderListener } from "../Events/eventInterfaces";
import { RenderDispatcher } from "../Events/renderEventDispatcher";

export class Tab implements renderListener{
    history: SearchHistory;
    id: number;
    element:Element
    webView:any

    constructor(id: number, element: Element){
        this.id = id;
        this.history = new SearchHistory();
        this.element = element
        RenderDispatcher.getInstance().addObserver(this);
        this.webView = createWebView(this.history.getCurrent());
        this.setTitle()
    }

    destroy() {
        const parentElement = document.getElementById('webview-container');
        parentElement.removeChild(this.webView);
    }
    
    setTitle() {
        try {
            const title:HTMLElement = this.element.querySelector(".tab-title")
            title.innerText = this.getTitle()
          } catch (error) {
            const title:HTMLElement = this.element.querySelector(".tab-title")
            title.innerText = ""
        }
    }

    searchWebURL(url:string): string {
        this.history.add(url, this.getTitle())
        this.destroy()
        this.webView = createWebView(url)
        this.setTitle()
        return url
    }

    goToPrevious(): string {
        this.destroy()
        const url = this.history.goBackward()
        this.webView = createWebView(url)
        this.setTitle()
        return url
    }
    
    goToNext(): string{
        this.destroy()
        this.history.goForward()
        const url = this.history.getCurrent()
        this.webView = createWebView(this.history.getCurrent())
        this.setTitle()
        return url
    }

    getURL(): string {
        return this.history.getCurrent()
    }
    getTitle() {
        const urlObject = new URL(this.getURL());
        const hostname = urlObject.hostname;
        let siteName;
        this.getURL().includes("www")?
            siteName = hostname.split('.')[1]:
            siteName = hostname.split('.')[0]
        return siteName.charAt(0).toUpperCase() + siteName.slice(1)
    }

    reload(): string {
        this.destroy()
        this.webView = createWebView(this.history.getCurrent())
        return this.history.getCurrent()
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
