export class BookMark{
    id: number;
    siteName: string;
    link: string;
    addDate: Date;

    constructor(siteName: string, link: string){
        this.siteName = siteName;
        this.link = link;
        this.addDate = new Date();
    }

    getBookMark(): BookMark{
        return this;
    }
}