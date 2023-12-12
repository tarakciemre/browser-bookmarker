import { NewTabDispatcher } from "../Events/NewTabDispatcher";
import { BookMark } from "../bookmark_manager/bookmark";

export function createBookmarkView(bookmarksData:BookMark[]) {
    
    const mainWindow = document.createElement('div');
    mainWindow.classList.add('main-window');
    mainWindow.classList.add('container');
    
    const windowTitle = document.createElement('h1');
    windowTitle.textContent = 'Bookmarks';

    const bookmarkList = document.createElement('ul');
    bookmarkList.classList.add('bookmark-list');

    bookmarksData.forEach((bookmark:BookMark) => {
        const listItem = document.createElement('li');

        const bookmarkInfo = document.createElement('p');
        bookmarkInfo.textContent = `${bookmark.siteName} (${bookmark.link})`;

        const goToWebSiteButton = document.createElement('button');
        goToWebSiteButton.textContent = 'Go to Website';
        goToWebSiteButton.id = bookmark.link
        NewTabDispatcher.getInstance().addDispatchAction(goToWebSiteButton)


        const generateButton = document.createElement('button');
        generateButton.textContent = 'Generate Similar Bookmarks';
        generateButton.addEventListener('click', () => handleButtonClick(bookmark.link));

        listItem.appendChild(bookmarkInfo);
        listItem.appendChild(goToWebSiteButton)
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