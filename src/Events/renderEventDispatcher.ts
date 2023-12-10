import { EventDispatcher, renderListener } from "./eventInterfaces";

export class RenderDispatcher implements EventDispatcher{
    observers: renderListener[]
    private tabsContainer: HTMLElement;
    private static instance: RenderDispatcher | null = null;


    private constructor() {
      this.observers = []
      this.tabsContainer = document.querySelector('.tab-bar')!;
    }

    public static getInstance(): RenderDispatcher {
      if (!RenderDispatcher.instance) {
        RenderDispatcher.instance = new RenderDispatcher();
      }
      return RenderDispatcher.instance;
    }

    addTabAction(tab:Element) {
      tab.addEventListener('click', () => this.activateTab(tab));
      this.activateTab(tab)
    }
    
    addObserver(observer: renderListener): void {
      this.observers.push(observer)
    }
    removeObserver(observer: renderListener): void {
      let indexToRemove = this.observers.indexOf(observer);
      if (indexToRemove !== -1) {
        this.observers.splice(indexToRemove, 1);
      }
    }
    notifyTabActivation(id: String): void {
      this.observers.map(o=> {
        o.onTabActivation(id)
      })
    }


    private activateTab(tab:Element) {
      this.notifyTabActivation(tab.getAttribute("id"))
    }
}
  