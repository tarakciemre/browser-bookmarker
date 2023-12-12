export interface renderListener {
    onTabActivation(id: number): void;
}

export interface NewTabListener {
    onNewTab(url:string): void;
}

// Subject interface
export interface EventDispatcher {
    addObserver(observer: renderListener): void;
    removeObserver(observer: renderListener): void;
    notifyTabActivation(id:number): void;
}

export interface NewTabEventDispatcher {
    addObserver(observer: NewTabListener): void;
    removeObserver(observer: NewTabListener): void;
    notifyNewTab(url:string): void;
}

