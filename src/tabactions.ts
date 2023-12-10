import { RenderDispatcher } from "./Events/renderEventDispatcher";
import { AppManager } from "./tab_manager/app_manager";
import{ processString } from "./StringManipulation/link_processor";
class TabManager {
  private tabsContainer: HTMLElement;
  private addTabButton: HTMLElement;
  private appManager: AppManager;
  private searchBar: HTMLElement;
  private forwardBackButtons: HTMLElement;
  private currentTab = 4;
  private dispatcher: RenderDispatcher;

  constructor() {
    this.dispatcher = RenderDispatcher.getInstance();
    this.tabsContainer = document.querySelector('.tab-bar')!;
    this.addTabButton = document.querySelector('.add-tab-button')!; 
    this.searchBar = document.querySelector('.search-container')!;
    this.forwardBackButtons = document.querySelector('.nav-buttons')!;
    this.forwardBackButtons.querySelector('#left')!.addEventListener('click', () => this.goBack());
    this.forwardBackButtons.querySelector('#right')!.addEventListener('click', () => this.goNext());
    this.forwardBackButtons.querySelector('#reload')!.addEventListener('click', () => this.reload());
    this.searchBar.querySelector("#search-button").addEventListener('click', () => this.renderUrl());
    this.addTabButton.addEventListener('click', () => this.addNewTab());
    this.tabsContainer.querySelectorAll('.tab button').forEach((closeButton) => {
      closeButton.addEventListener('click', () => this.closeTab(closeButton.parentElement!));
    });
    this.tabsContainer.querySelectorAll('.tab').forEach((tab) => {
      this.dispatcher.addTabAction(tab)
    });

    this.appManager = new AppManager();

    
    this.openBookMarkTab()
  }  
  private addNewTab() {
    const tab = document.createElement('div');
    tab.className = 'tab fade-in tab-active';
    tab.id = `${this.currentTab}`;
    
    const title = document.createElement('h4');
    title.textContent = 'Title';

    const closeButton = document.createElement('button');
    closeButton.className = 'remove-tab-button';
    closeButton.textContent = 'x';
    closeButton.addEventListener('click', () => this.closeTab(tab));
    tab.appendChild(title);
    tab.appendChild(closeButton);
    tab.addEventListener('click', () => this.changeUrl(Number(tab.getAttribute("id"))));
    
    this.tabsContainer.insertBefore(tab, this.addTabButton);

    this.appManager.addTab(this.currentTab, tab);
    this.dispatcher.addTabAction(tab)

    this.currentTab++;
  }

  private openBookMarkTab() {
    const tab = document.createElement('div');
    tab.className = 'tab fade-in tab-active';
    tab.id = `${this.currentTab}`;
    
    const title = document.createElement('p');
    title.textContent = 'Title';

    const closeButton = document.createElement('button');
    closeButton.className = 'remove-tab-button';
    closeButton.textContent = 'x';
    closeButton.addEventListener('click', () => this.closeTab(tab));
    tab.appendChild(title);
    tab.appendChild(closeButton);
    this.tabsContainer.insertBefore(tab, this.addTabButton);

    this.appManager.addBookmarkTab(this.currentTab, tab);
    this.dispatcher.addTabAction(tab)

    this.currentTab++;

  }

  private closeTab(tab: HTMLElement) {
    this.tabsContainer.removeChild(tab);
    const tabObject = this.appManager.getTab(Number(tab.id))
    tabObject.destroy()
  }
  private renderUrl() {
    const searchBarInput = this.searchBar.querySelector('#search-bar') as HTMLInputElement;
    const url = searchBarInput.value;
    const tabObject = this.appManager.activeTab
    const alteredUrl = processString(url);
    tabObject.searchWebURL(alteredUrl)
  }
  private goBack() {
    const activeTab = this.appManager.activeTab;
    const url = activeTab.goToPrevious();
    const searchBarInput = this.searchBar.querySelector('#search-bar') as HTMLInputElement;
    searchBarInput.value = url;

  }
  private goNext() {
    const activeTab = this.appManager.activeTab;
    const url = activeTab.goToNext();
    const searchBarInput = this.searchBar.querySelector('#search-bar') as HTMLInputElement;
    searchBarInput.value = url;
  }
  private reload() {
    const activeTab = this.appManager.activeTab;
    activeTab.reload();
  }
  private changeUrl(id: number) {
    const activeTab = this.appManager.getTab(id);
    const url = activeTab.history.getCurrent();
    const searchBarInput = this.searchBar.querySelector('#search-bar') as HTMLInputElement;
    searchBarInput.value = url;  
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const tabManager = new TabManager();
});
