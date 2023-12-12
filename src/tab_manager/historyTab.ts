import { SearchHistory } from "../Navigator/searchHistory";
import { Tab } from "./tab";

export class HistoryTab extends Tab{
    id: number;
    searchHistory: SearchHistory;
    element: Element;
    webView: Element;

    constructor(id: number, element: Element, searchHistory: SearchHistory){
        super(id, element);
        this.destroy();
        this.searchHistory = searchHistory
    }

    destroy(): void {
        const parentElement = document.getElementById('webview-container');
        parentElement.removeChild(this.webView);
    }
}