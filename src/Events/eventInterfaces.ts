export interface renderListener {
    onTabActivation(id: String): void;
}

// Subject interface
export interface EventDispatcher {
    addObserver(observer: renderListener): void;
    removeObserver(observer: renderListener): void;
    notifyTabActivation(id:String): void;
}