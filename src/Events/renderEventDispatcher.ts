import { EventDispatcher, renderListener } from "./eventInterfaces";

class RenderDispatcher implements EventDispatcher{
    observers: renderListener[]
    private tabsContainer: HTMLElement;

    constructor() {
      this.observers = []
      this.tabsContainer = document.querySelector('.tab-bar')!;

      this.tabsContainer.querySelectorAll('.tab').forEach((tab) => {
        tab.addEventListener('click', () => this.activateTab(tab));
      });
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
    notifyRender(id: String): void {
      this.observers.map(o=> {
        o.onRender(id)
      })
    }

    private activateTab(tab: Element) {
      this.notifyRender(tab.getAttribute("id"))
    }
}
  
  
  