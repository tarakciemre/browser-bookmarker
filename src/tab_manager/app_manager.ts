import { renderListener } from '../Events/eventInterfaces';
import { Tab } from './tab'; // Import the Tab class from tab.ts
import { RenderDispatcher } from "../Events/renderEventDispatcher";

export class AppManager implements renderListener {
    tabs: Tab[] = [];
    activeTab: Tab;

    constructor() {
        this.tabs = []; // Creating an instance of the Tab class
        RenderDispatcher.getInstance().addObserver(this);
    }

    onTabActivation(id: String): void {
        this.activeTab = this.tabs.find(tab => tab.id === Number(id));
        console.log(this.activeTab.id);
    }

    // Example method that uses the Tab instance
    getTab(id: number): Tab {
        return this.tabs[id];
    }

    addTab(id: number, element: Element): void {
        const newTab = new Tab(id, element);
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
