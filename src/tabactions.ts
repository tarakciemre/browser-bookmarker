class TabManager {
  private tabsContainer: HTMLElement;
  private addTabButton: HTMLElement;
  private tabCloseButton: HTMLElement;

  constructor() {
    this.tabsContainer = document.querySelector('.tab-bar')!;
    this.addTabButton = document.querySelector('.add-tab-button')!; 
    this.addTabButton.addEventListener('click', () => this.addNewTab());
    this.tabsContainer.querySelectorAll('.tab button').forEach((closeButton) => {
      closeButton.addEventListener('click', () => this.closeTab(closeButton.parentElement!));
    });
  }  
  private addNewTab() {
    const tab = document.createElement('div');
    tab.className = 'tab fade-in';

    const title = document.createElement('h4');
    title.textContent = 'Title';

    const closeButton = document.createElement('button');
    closeButton.className = 'remove-tab-button';
    closeButton.textContent = 'x';
    closeButton.addEventListener('click', () => this.closeTab(tab));
    tab.appendChild(title);
    tab.appendChild(closeButton);
    this.tabsContainer.insertBefore(tab, this.addTabButton);
  }

  private closeTab(tab: HTMLElement) {
    this.tabsContainer.removeChild(tab);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const tabManager = new TabManager();
});
