import { SearchHistory } from "../Navigator/history";

export class Tab{
    history: SearchHistory;
    id: number;
    static nextId: number;

    constructor(){
        this.id = Tab.getNextId();
        this.history = new SearchHistory();
    }

    static getNextId(): number {
        if (this.nextId === undefined) {
            this.nextId = 0;
        }
        return this.nextId++;
    }


    getTab(): Tab{
        return this;
    }
}