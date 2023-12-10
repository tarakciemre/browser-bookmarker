
export function createWebView(url:string) {
    const webviewId = 'webview-object';
    const newWebView = document.createElement('webview');
    newWebView.setAttribute('src', url);
    newWebView.setAttribute('class', 'main-window');
    newWebView.setAttribute('id', webviewId);
    const parentElement = document.getElementById('webview-container');
    parentElement.appendChild(newWebView);
    return newWebView
}

export function renderUrl (webView:Node): void {
    const webviewId = 'webview-object';

    const existingWebView = document.getElementById(webviewId);
    if (existingWebView) {
        existingWebView.parentNode.removeChild(existingWebView);
    }

    const parentElement = document.getElementById('webview-container');
    parentElement.appendChild(webView);
}
