import { Tab } from "./tab";
import { createSignUpTab } from "../Controllers/SignupTabController";

export class SignUpTab extends Tab{
    id: number
    element: Element
    webView: any;

    constructor(id: number, element: Element){
        super(id, element)
        this.setTitle();
        this.destroy();
        this.webView = createSignUpTab()
    }

    destroy(): void {
        const parentElement = document.getElementById('webview-container');
        parentElement.removeChild(this.webView);
    }

    getURL() {
        return "Sign Up"
    }

    searchWebURL(url:string): string {
        return ""
    }

    goToPrevious(): string {
        return ""
    }
    
    goToNext(): string{
        return ""
    }

    reload(): string {
        this.destroy()
        this.webView = createSignUpTab()
        return ""
    }
}