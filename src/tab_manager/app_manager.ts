import { renderListener } from '../Events/eventInterfaces';
import { Tab } from './tab'; // Import the Tab class from tab.ts
import { RenderDispatcher } from "../Events/renderEventDispatcher";
import { BookmarkTab } from './bookmarkTab';
import { BookMark } from '../bookmark_manager/bookmark';

export class AppManager implements renderListener {
    tabs: Tab[] = [];
    activeTab: Tab;

    constructor() {
        this.tabs = []; // Creating an instance of the Tab class
        RenderDispatcher.getInstance().addObserver(this);
    }

    onTabActivation(id: number): void {
        this.activeTab = this.tabs.find(tab => tab.id === id);
    }

    // Example method that uses the Tab instance
    getTab(id: number): Tab {
        return this.tabs.find((tab) => tab.id === id);
    }

    addTab(id: number, element: Element): void {
        const newTab = new Tab(id, element);
        this.tabs.push(newTab);
        this.activeTab = newTab;
    }

    addBookmarkTab(id: number, element: Element, bookmarks: BookMark[]): void {
        const newTab = new BookmarkTab(id, element, bookmarks);
        this.tabs.push(newTab);
        this.activeTab = newTab;
    }

    // deleteTab(id: number): boolean{
    //     const index = this.tabs.findIndex(tab => tab.id === id);
        
    // }

    getNumberOfTabs(): number {
        return this.tabs.length;
    }

    // activate(id: number): void{
    //     const newActiveTab = this.tabs.find(tab => tab.id === id);

    //     if(newActiveTab)
    //         this.activeTab = newActiveTab;
    // }

}
