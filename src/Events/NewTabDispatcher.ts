import { EventDispatcher, NewTabEventDispatcher, NewTabListener } from "./eventInterfaces";

export class NewTabDispatcher implements NewTabEventDispatcher{
    observers: NewTabListener[]
    private tabsContainer: HTMLElement;
    private static instance: NewTabDispatcher | null = null;


    private constructor() {
      this.observers = []
      this.tabsContainer = document.querySelector('.tab-bar')!;
    }

    notifyNewTab(url: string): void {
        this.observers.map(o=> {
            o.onNewTab(url)
        })
    }

    public static getInstance(): NewTabDispatcher {
      if (!NewTabDispatcher.instance) {
        NewTabDispatcher.instance = new NewTabDispatcher();
      }
      return NewTabDispatcher.instance;
    }

    addDispatchAction(button:Element) {
      button.addEventListener('click', () => this.notifyNewTab(button.getAttribute("id")));
    }
    
    addObserver(observer: NewTabListener): void {
      this.observers.push(observer)
    }
    removeObserver(observer: NewTabListener): void {
      let indexToRemove = this.observers.indexOf(observer);
      if (indexToRemove !== -1) {
        this.observers.splice(indexToRemove, 1);
      }
    }

}
  