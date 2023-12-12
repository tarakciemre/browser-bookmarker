import { History } from "../history_manager/history"; 


export class SearchHistory {
    defaultLink = "https://www.google.com";
    defaultTitle = "Google";
    defaultPage: History;
    historyArray: History[] = [];
    index: number;

    constructor() {
        this.defaultPage = new History(this.defaultLink, this.defaultTitle)
        this.historyArray = [];
        this.index = -1;
    }

    getCurrent() {
        var current: History;
        switch (this.index) {
            case -1:
                current = this.defaultPage;
                break;
            default:
                current = this.historyArray[this.index];
                break;
        }
        return current.getLink();
    }

    getBackward() {
        switch (this.index) {
            case -1:
                return false;
            case 0:
                return this.defaultPage;
            default:
                return this.historyArray[this.index - 1];
        }
    }

    getForward() {
        switch (this.index) {
            case this.historyArray.length - 1:
                return false;
            case -1:
                return this.defaultPage;
            default:
                return this.historyArray[this.index + 1];
        }
    }

    goBackward() {
        if(this.getBackward()) {
            this.index = this.index - 1;
        }
        return this.getCurrent();
    }

    goForward() {
        if(this.getForward()) {
            this.index = this.index + 1;
        }
        return this.getCurrent();
    }

    add(link: string, title: string): void {
        const newHistory = new History(link, title)
        this.index = this.index + 1;
        this.historyArray = this.historyArray.slice(0, this.index);
        this.historyArray.push(newHistory);
    }
}
