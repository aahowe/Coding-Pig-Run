
import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('diaglog_messageController')
export class diaglog_messageController extends Component {


    start() {
        // [3]
    }

    update(deltaTime: number) {
        // [4]
    }

    setmessage(text: string) {

        this.node.children[0].getComponent(Label).string = text;

    }



}


