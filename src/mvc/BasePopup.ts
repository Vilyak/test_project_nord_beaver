import { BaseView } from "./BaseView";

export class BasePopup extends BaseView {
    closeView() {
        this.sceneManager.closeCurrentPopup();
    }
}