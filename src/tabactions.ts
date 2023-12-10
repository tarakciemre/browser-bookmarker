import { RenderDispatcher } from "./Events/renderEventDispatcher";
import { AppManager } from "./tab_manager/app_manager";
class TabManager {
  private tabsContainer: HTMLElement;
  private addTabButton: HTMLElement;
  private appManager: AppManager;
  private currentTab = 4;
  private dispatcher: RenderDispatcher;

  constructor() {
    this.dispatcher = RenderDispatcher.getInstance();
    this.tabsContainer = document.querySelector('.tab-bar')!;
    this.addTabButton = document.querySelector('.add-tab-button')!; 
    this.addTabButton.addEventListener('click', () => this.addNewTab());
    this.tabsContainer.querySelectorAll('.tab button').forEach((closeButton) => {
      closeButton.addEventListener('click', () => this.closeTab(closeButton.parentElement!));
    });
    this.tabsContainer.querySelectorAll('.tab').forEach((tab) => {
      this.dispatcher.addTabAction(tab)
    });

    this.appManager = new AppManager();
    this.appManager.addTab(this.currentTab);
  }  
  private addNewTab() {
    const tab = document.createElement('div');
    tab.className = 'tab fade-in';
    tab.id = `tab-${this.currentTab}`;

    const title = document.createElement('h4');
    title.textContent = 'Title';

    const closeButton = document.createElement('button');
    closeButton.className = 'remove-tab-button';
    closeButton.textContent = 'x';
    closeButton.addEventListener('click', () => this.closeTab(tab));
    tab.appendChild(title);
    tab.appendChild(closeButton);
    this.tabsContainer.insertBefore(tab, this.addTabButton);

    // this.appManager.addTab(this.currentTab);
    this.currentTab++;
  }

  private closeTab(tab: HTMLElement) {
    this.tabsContainer.removeChild(tab);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const tabManager = new TabManager();
});
