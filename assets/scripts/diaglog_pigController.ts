
import { _decorator, Component, Node, loader, resources, SpriteFrame, Sprite } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('diaglog_pigController')
export class diaglog_pigController extends Component {


    start() {

    }

    update(deltaTime: number) {

    }

    //改变图片
    setImage(pig: string) {

        resources.load(pig, SpriteFrame, (err, spriteFrame) => {
            this.node.children[0].getComponent(Sprite).spriteFrame = spriteFrame;
        });

    }
}


