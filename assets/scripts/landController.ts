
import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('landController')
export class landController extends Component {

    //背景移动速度
    @property
    speed: number = 100;
    //背景宽度
    @property
    width: number = 320;

    start() {

    }

    update(deltaTime: number) {
        //遍历背景子节点
        for (let bg of this.node.children) {
            //计算下一帧移动到的位置
            let x: number = bg.position.x - this.speed * deltaTime;
            //设置新位置
            bg.setPosition(new Vec3(x, -460, 0));
            //如果背景图出了视野则移动到后方等待下一轮循环
            if (bg.position.x < -this.width) {
                bg.setPosition(new Vec3(x + 2 * this.width, 0, 0));
            }
        }
    }
}


