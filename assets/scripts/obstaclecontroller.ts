
import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('obstaclecontroller')
export class obstaclecontroller extends Component {
    //管道移动速度
    @property
    speed: number = 100;

    start() {
        // [3]
    }

    update(deltaTime: number) {
        //遍历管道子节点
        for (let bg of this.node.children) {
            //计算下一帧移动到的位置
            let x: number = bg.position.x - this.speed * deltaTime;
            let y: number = bg.position.y;
            //设置新位置
            bg.setPosition(new Vec3(x, y, 0));
            //如果背景图出了视野则移动到后方等待下一轮循环
            if (bg.position.x < -400) {
                //y值赋值为随机数，达到随机柱子高度的效果
                y = Math.random() * 100;
                bg.setPosition(new Vec3(x + 400, y, 0));
            }
        }
    }

    //重置管道
    reset() {
        this.node.children[0].setPosition(new Vec3(174, 256, 0));
        this.node.children[1].setPosition(new Vec3(374, 163, 0));
        this.speed = 100;
    }
}


