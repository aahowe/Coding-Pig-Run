
import { _decorator, Component, Node, Vec3, GbufferStage, Prefab, instantiate, math } from 'cc';
const { ccclass, property } = _decorator;

enum obsType {
    HOLE,
    UP,
    DOWN,
};

@ccclass('obstaclecontroller')
export class obstaclecontroller extends Component {
    //管道移动速度
    @property
    speed: number = 150;

    @property({ type: Prefab })
    public holePrfb: Prefab | null = null;

    @property({ type: Prefab })
    public upPrfb: Prefab | null = null;

    @property({ type: Prefab })
    public downPrfb: Prefab | null = null;


    makeObs(type: obsType) {
        if (!this.holePrfb || !this.upPrfb || this.downPrfb) {
            return null;
        }
        let obs: Node | null = null;
        switch (type) {
            case obsType.HOLE:
                obs = instantiate(this.holePrfb);
                break;
            case obsType.DOWN:
                obs = instantiate(this.downPrfb);
                break;
            case obsType.UP:
                obs = instantiate(this.upPrfb);
        }
        return obs;
    }

    start() {
        // [3]
    }

    update(deltaTime: number) {
        //遍历管道子节点
        for (let bg of this.node.children) {
            //计算下一帧移动到的位置
            let x: number = bg.position.x - this.speed * deltaTime;
            //设置新位置
            bg.setPosition(new Vec3(x, bg.position.y, 0));
            //如果背景图出了视野则移动到后方等待下一轮循环
            if (bg.position.x < -200) {
                // if (bg.name = "up") {
                //     //y值赋值为随机数，达到随机柱子高度的效果
                //     bg.setPosition(new Vec3(x + 701, Math.random() * 174 - 9, 0));
                // } else {
                //     bg.setPosition(new Vec3(x + 800, bg.position.y, 0));
                // }
                let typenum = 3 * Math.random();
                if (typenum <= 1) {
                    let obs: Node | null = this.makeObs(obsType.DOWN);
                    if (obs) {
                        this.node.addChild(obs);
                        obs?.setScale(count, 1, 1);
                        obs?.setPosition(lastPos - (count - 1) * 0.5, -1.5, 0);
                    }
                } else if (typenum <= 2) {

                } else {

                }
            }
        }
    }

}


