import { requestFromOpenAi } from "../gpt_service/gptService";
import { NewTabDispatcher } from "../Events/NewTabDispatcher";
import { BookMark } from "../bookmark_manager/bookmark";

export function createBookmarkView(bookmarksData:BookMark[]) {
    
    const mainWindow = document.createElement('div');
    mainWindow.classList.add('main-window');
    mainWindow.classList.add('container');
    
    const windowTitle = document.createElement('h1');
    windowTitle.textContent = 'Bookmarks';

    const bookmarkList = document.createElement('ul');
    bookmarkList.id = "bookmark-list"
    bookmarkList.classList.add('bookmark-list');

    bookmarksData.forEach((bookmark:BookMark) => {
        const listItem = document.createElement('li');

        const bookmarkInfo = document.createElement('p');
        bookmarkInfo.textContent = `${bookmark.siteName} - ${bookmark.link}`;

        const goToWebSiteButton = document.createElement('button');
        goToWebSiteButton.textContent = 'Go to Website';
        goToWebSiteButton.id = bookmark.link
        NewTabDispatcher.getInstance().addDispatchAction(goToWebSiteButton)


        const generateButton = document.createElement('button');
        generateButton.textContent = 'Generate Similar Bookmarks';
        generateButton.addEventListener('click', () => handleButtonClick(bookmark.link, listItem));  
        const generateText = document.createElement('p');
        generateText.style.display = 'none'; 
        listItem.appendChild(bookmarkInfo);
        listItem.appendChild(generateText);

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

function handleButtonClick(url:string, listItem:HTMLLIElement) {
    requestFromOpenAi(url).then((res) => {
        // the string format is category: category_name, similar websites: url1, url2, url3
        // get the url's after similar websites:
        // websites have https:// in front of them
        const similarWebsites = res.split('similar websites: ')[1].split(', ');
        
        const parentList = document.querySelector('#bookmark-list');
        
        similarWebsites.map((w:any) => {
            const rec = document.createElement('li');
            const goToWebSiteButton = document.createElement('button');
            goToWebSiteButton.textContent = 'Go to Website';
            goToWebSiteButton.id = w
            NewTabDispatcher.getInstance().addDispatchAction(goToWebSiteButton)
            const text = document.createElement('p');
            text.innerText = w
            rec.appendChild(text)
            rec.appendChild(goToWebSiteButton)
            rec.classList.add("gpt-bookmark")
            if (listItem.nextSibling != undefined && listItem.nextSibling != null && listItem.nextSibling) {
                parentList.insertBefore(rec, listItem.nextSibling)
            }
            else {
                parentList.appendChild(rec)
            }
        })
    });
}