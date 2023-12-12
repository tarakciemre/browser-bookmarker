export class History {
    private static lastId = -1; 
    id: number;
    link: string;
    title: string;
    date: Date;

    constructor(link: string, title: string) {
        this.id = History.getNextId(); 
        this.link = link;
        this.title = title;
        this.date = new Date();
    }

    private static getNextId(): number {
        return ++History.lastId; 
    }

    getLink(): string{
        return this.link;
    }
}
