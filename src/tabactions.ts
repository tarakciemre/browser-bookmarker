import { RenderDispatcher } from "./Events/renderEventDispatcher";
import { AppManager } from "./tab_manager/app_manager";
import{ processString } from "./StringManipulation/link_processor";
import { getUrlTitle } from "./Controllers/requestSender";
import { BookMarkManager } from "./bookmark_manager/bookmark_manager";
class TabManager {
  private tabsContainer: HTMLElement;
  private addTabButton: HTMLElement;
  private appManager: AppManager;
  private bookmarkManager:BookMarkManager
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

    document.querySelector('#star-button').addEventListener('click', () => this.addToBookMark());
    document.querySelector('#bookmark-button').addEventListener('click', () => this.openBookMarkTab());


    this.addTabButton.addEventListener('click', () => this.addNewTab());
    this.tabsContainer.querySelectorAll('.tab button').forEach((closeButton) => {
      closeButton.addEventListener('click', () => this.closeTab(closeButton.parentElement!));
    });
    this.tabsContainer.querySelectorAll('.tab').forEach((tab) => {
      this.dispatcher.addTabAction(tab)
    });

    this.appManager = new AppManager();
    this.bookmarkManager = new BookMarkManager();

    this.addNewTab();
  }
  private addNewTab() {
    const tab = document.createElement('div');
    tab.className = 'tab fade-in tab-active';
    tab.id = `${this.currentTab}`;
    
    const title = document.createElement('p');
    title.className = "tab-title"
    title.textContent = 'Google';

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
    this.setStarFill("https://www.google.com")

    this.currentTab++;
  }

  private openBookMarkTab() {
    const tab = document.createElement('div');
    tab.className = 'tab fade-in tab-active';
    tab.id = `${this.currentTab}`;
    
    const title = document.createElement('p');
    title.textContent = 'Bookmarks';

    const closeButton = document.createElement('button');
    closeButton.className = 'remove-tab-button';
    closeButton.textContent = 'x';
    closeButton.addEventListener('click', () => this.closeTab(tab));
    tab.addEventListener('click', () => this.changeUrl(Number(tab.getAttribute("id"))));
    tab.appendChild(title);
    tab.appendChild(closeButton);
    this.tabsContainer.insertBefore(tab, this.addTabButton);

    this.appManager.addBookmarkTab(this.currentTab, tab, this.bookmarkManager.getAllBookmarks());
    this.dispatcher.addTabAction(tab)

    this.setStarFill("")
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

    this.setStarFill(url)
  }
  private goBack() {
    const activeTab = this.appManager.activeTab;
    const url = activeTab.goToPrevious();
    const searchBarInput = this.searchBar.querySelector('#search-bar') as HTMLInputElement;
    searchBarInput.value = url;

    this.setStarFill(url)
  }
  private goNext() {
    const activeTab = this.appManager.activeTab;
    const url = activeTab.goToNext();
    const searchBarInput = this.searchBar.querySelector('#search-bar') as HTMLInputElement;
    searchBarInput.value = url;

    this.setStarFill(url)
  }
  private reload() {
    const activeTab = this.appManager.activeTab;
    activeTab.reload();
  }
  private changeUrl(id: number) {
    const activeTab = this.appManager.getTab(id);
    const url = activeTab.getURL();
    const searchBarInput = this.searchBar.querySelector('#search-bar') as HTMLInputElement;
    searchBarInput.value = url;  
    this.setStarFill(url)
  }

  private addToBookMark() {
    const activeTab = this.appManager.activeTab
    if (this.bookmarkManager.isBookmarked(activeTab.getURL())) {
      this.bookmarkManager.deleteBookMark(activeTab.getURL())
      const starImage:HTMLImageElement = document.querySelector("#star-image")
      starImage.src = "assets/icons/star_empty.png"
    }
    else {
      this.bookmarkManager.addBookMark(activeTab.getURL())
      const starImage:HTMLImageElement = document.querySelector("#star-image")
      starImage.src = "assets/icons/star_filled.png"
    }
  }

  private setStarFill(link:string) {
    if (this.bookmarkManager.isBookmarked(link)) {
      const starImage:HTMLImageElement = document.querySelector("#star-image")
      starImage.src = "assets/icons/star_filled.png"
    }
    else {
      const starImage:HTMLImageElement = document.querySelector("#star-image")
      starImage.src = "assets/icons/star_empty.png"
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const tabManager = new TabManager();
});
