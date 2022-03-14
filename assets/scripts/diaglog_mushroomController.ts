
import { _decorator, Component, Node, resources, SpriteFrame, Sprite } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('diaglog_mushroomController')
export class diaglog_mushroomController extends Component {


    start() {
        // [3]
    }

    update(deltaTime: number) {
        // [4]
    }

    //改变图片
    setImage(mushroom: string) {

        resources.load(mushroom, SpriteFrame, (err, spriteFrame) => {
            this.node.children[0].getComponent(Sprite).spriteFrame = spriteFrame;
        });

    }
}

