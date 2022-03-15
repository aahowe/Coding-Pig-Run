
import { _decorator, Component, Node, Prefab, instantiate, Vec3, MATH_FLOAT_ARRAY } from 'cc';
const { ccclass, property } = _decorator;


enum trType {
    B,
    G,
};

@ccclass('treasureController')
export class treasureController extends Component {
    @property
    speed: number = 120;

    @property({ type: Prefab })
    public BPrfb: Prefab | null = null;

    @property({ type: Prefab })
    public GPrfb: Prefab | null = null;

    //生成宝石
    makeTre(type: trType): Node {
        let tre: Node | null = null;
        switch (type) {
            case trType.B:
                tre = instantiate(this.BPrfb);
                break;
            case trType.G:
                tre = instantiate(this.GPrfb);
                break;
        }
        return tre;
    }

    //放置宝石
    put(x: number, y: number) {
        let typenum = 2 * Math.random();
        if (typenum <= 1) {  //钻石和绿宝石生成的概率各为50%
            let tre: Node = this.makeTre(trType.B);
            if (tre) {
                this.node.addChild(tre);
                tre.setPosition(x, y, 0);
            }
        } else {
            let tre: Node = this.makeTre(trType.G);
            if (tre) {
                this.node.addChild(tre);
                tre.setPosition(x, y, 0);
            }
        }
    }

    //随机生成宝石
    random() {
        let ran: number = 100 * Math.random();
        if (ran <= 50) {  //生成几率为50%
            if (ran <= 20) {  //上部分20%
                this.put(650, 120);
            } else if (ran >= 30) {  //下部分20%
                this.put(650, -360);
            } else {  //中间10%
                this.put(650, -148);
            }
        }
    }


    start() {

    }


    update(deltaTime: number) {
        //遍历管道子节点
        for (let bg of this.node.children) {
            //计算下一帧移动到的位置
            let x: number = bg.position.x - this.speed * deltaTime;
            //设置新位置
            bg.setPosition(new Vec3(x, bg.position.y, 0));
        }
    }


}
