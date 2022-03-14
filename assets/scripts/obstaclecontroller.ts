
import { _decorator, Component, Node, Vec3, GbufferStage, Prefab, instantiate, math } from 'cc';
const { ccclass, property } = _decorator;

enum obsType {
    HOLE,
    UP,
    DOWN,
    SIGN,
};

@ccclass('obstaclecontroller')
export class obstaclecontroller extends Component {
    //移动速度
    @property
    speed: number = 120;

    @property({ type: Prefab })
    public holePrfb: Prefab | null = null;

    @property({ type: Prefab })
    public upPrfb: Prefab | null = null;

    @property({ type: Prefab })
    public downPrfb: Prefab | null = null;

    @property({ type: Prefab })
    public signPrfb: Prefab | null = null;


    makeObs(type: obsType): Node {
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
                break;
            case obsType.SIGN:
                obs = instantiate(this.signPrfb);
                break;
        }
        return obs;
    }

    randomObs(distance: number) {
        let typenum = 4 * Math.random();
        if (typenum <= 1) {
            let obs: Node = this.makeObs(obsType.DOWN);
            if (obs) {
                this.node.addChild(obs);
                obs.setPosition(distance, -500, 0);
            }
        } else if (typenum <= 2) {
            let obs: Node = this.makeObs(obsType.HOLE);
            if (obs) {
                this.node.addChild(obs);
                obs.setPosition(distance, 155, 0);
            }
        } else if (typenum <= 3) {
            let obs: Node = this.makeObs(obsType.SIGN);
            if (obs) {
                this.node.addChild(obs);
                obs.setPosition(distance, -316, 0);
            }
        } else {
            let obs: Node = this.makeObs(obsType.UP);
            if (obs) {
                this.node.addChild(obs);
                obs.setPosition(distance, 270, 0);
            }
        }
    }

    reset() {
        this.node.removeAllChildren();
        this.randomObs(800);
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
                this.randomObs(188);
                bg.destroy();
            }
        }
    }

}


