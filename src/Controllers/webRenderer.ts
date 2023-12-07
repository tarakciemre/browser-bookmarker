
export function renderUrl (link: string): void {
    const webviewId = 'webview-object';

    const existingWebView = document.getElementById(webviewId);
    if (existingWebView) {
        existingWebView.parentNode.removeChild(existingWebView);
    }

    const newWebView = document.createElement('webview');
    newWebView.setAttribute('src', link);
    newWebView.setAttribute('class', 'main-window');
    newWebView.setAttribute('id', webviewId);

    const parentElement = document.getElementById('webview-container'); // Replace with the ID of the parent element
    parentElement.appendChild(newWebView);
}
