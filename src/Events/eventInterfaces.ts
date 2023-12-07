export interface renderListener {
    onRender(): void;
}

// Subject interface
export interface EventDispatcher {
    addObserver(observer: renderListener): void;
    removeObserver(observer: renderListener): void;
    notifyRender(url:String): void;
}