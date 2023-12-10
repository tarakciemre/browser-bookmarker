export function createBookmarkView() {
    const bookmarksData = [
        { name: 'Google', url: 'https://google.com' },
        { name: 'X', url: 'https://x.com' },
        { name: 'Youtube', url: 'https://youtube.com' },
      ];
      
    const mainWindow = document.createElement('div');
    mainWindow.classList.add('main-window');
    
    const windowTitle = document.createElement('h1');
    windowTitle.textContent = 'Bookmarks';

    const bookmarkList = document.createElement('ul');
    bookmarkList.classList.add('bookmark-list');

    bookmarksData.forEach(bookmark => {
        const listItem = document.createElement('li');

        const bookmarkInfo = document.createElement('p');
        bookmarkInfo.textContent = `${bookmark.name} (${bookmark.url})`;

        const generateButton = document.createElement('button');
        generateButton.textContent = 'Generate Similar Bookmarks';

        generateButton.addEventListener('click', () => handleButtonClick(bookmark.url));

        listItem.appendChild(bookmarkInfo);
        listItem.appendChild(generateButton);

        bookmarkList.appendChild(listItem);
    });
    
    // Append elements to the main window
    mainWindow.appendChild(windowTitle);
    mainWindow.appendChild(bookmarkList);

    // ADD
    const parentElement = document.getElementById('webview-container');
    parentElement.appendChild(mainWindow);
    return mainWindow
}

function handleButtonClick(url:string) {

}