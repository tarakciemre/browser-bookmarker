import { Tab } from './tab'; // Import the Tab class from tab.ts

export class AppManager {
    tabs: Tab[] = [];

    constructor() {
        this.tabs = []; // Creating an instance of the Tab class
        // You can pass an ID or any required parameter to the Tab constructor
        // For example, here I'm passing 1 as the ID

        const tab1 = new Tab();
        this.tabs.push(tab1);
    }

    // Example method that uses the Tab instance
    getTab(id: number): Tab {
        return this.tabs[id];
    }

    addTab(): void {
        const newTab = new Tab();
        this.tabs.push(newTab);
    }

    addNewTab(newTab: Tab): void {
        this.tabs.push(newTab);
    }

    getNumberOfTabs(): number {
        return this.tabs.length;
    }

    
}
