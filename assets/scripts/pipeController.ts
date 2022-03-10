
import { _decorator, Component, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = pipeController
 * DateTime = Sat Mar 05 2022 21:58:23 GMT+0800 (中国标准时间)
 * Author = aahowe
 * FileBasename = pipeController.ts
 * FileBasenameNoExtension = pipeController
 * URL = db://assets/scripts/pipeController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('pipeController')
export class pipeController extends Component {
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
            if (bg.position.x < -172) {
                //y值赋值为随机数，达到随机柱子高度的效果
                y = 185 + Math.random() * 200;
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

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
