import { SearchHistory } from "../Navigator/history";
import { renderUrl } from "../Controllers/webRenderer";
import { renderListener } from "../Events/eventInterfaces";
import { RenderDispatcher } from "../Events/renderEventDispatcher";

export class Tab implements renderListener{
    history: SearchHistory;
    id: number;

    constructor(id: number){
        this.id = id;
        this.history = new SearchHistory();
        RenderDispatcher.getInstance().addObserver(this);
    }

    onRender(id: String): void {
        if(this.id === Number(id)){
            const link = this.history.getCurrent();
            renderUrl(link);
        }
    }
}