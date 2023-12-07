export interface renderListener {
    onRender(id: String): void;
}

// Subject interface
export interface EventDispatcher {
    addObserver(observer: renderListener): void;
    removeObserver(observer: renderListener): void;
    notifyRender(id:String): void;
}