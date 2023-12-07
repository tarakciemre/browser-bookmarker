
class History {

    defaultPage: string = "https://www.google.com";
    historyArray: Array<string>;
    index: number;

    constructor() {
        this.historyArray = [];
        this.index = -1;
    }

    getCurrent() {
        switch (this.index) {
            case -1:
                return this.defaultPage;
            default:
                return this.historyArray[this.index];
        }
    }

    getBackward() {
        switch (this.index) {
            case -1:
                return false;
            case 0:
                return this.defaultPage;
            default:
                return this.historyArray[this.index + 1];
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

    add(link: string) {
        this.index = this.index + 1;
        this.historyArray.slice(0, this.index);
        this.historyArray.push(link);
    }
}
