export interface renderListener {
    onTabActivation(id: number): void;
}

// Subject interface
export interface EventDispatcher {
    addObserver(observer: renderListener): void;
    removeObserver(observer: renderListener): void;
    notifyTabActivation(id:number): void;
}