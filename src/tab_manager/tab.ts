import { SearchHistory } from "../Navigator/history";
import { renderUrl } from "../Controllers/webRenderer";
import { renderListener } from "../Events/eventInterfaces";
import { RenderDispatcher } from "../Events/renderEventDispatcher";

export class Tab implements renderListener{
    history: SearchHistory;
    id: number;
    element:Element

    constructor(id: number, element: Element){
        this.id = id;
        this.history = new SearchHistory();
        RenderDispatcher.getInstance().addObserver(this);
    }

    onTabActivation(id: String): void {
        if(this.id === Number(id)){
            const link = this.history.getCurrent();
            renderUrl(link);
            this.element.classList.add("tab-active")
            return
        }
        if( this.element.classList.contains("tab-active")) {
            this.element.classList.remove("tab-active")
        }
    }
}