
import { _decorator, Component, RigidBody2D, Vec2, Collider2D, Contact2DType, CircleCollider2D, IPhysics2DContact, Label, game } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = birdController
 * DateTime = Sat Mar 05 2022 21:22:19 GMT+0800 (中国标准时间)
 * Author = aahowe
 * FileBasename = birdController.ts
 * FileBasenameNoExtension = birdController
 * URL = db://assets/scripts/birdController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('birdController')
export class birdController extends Component {

    flyspeed: number = 10;
    //得分
    @property
    score: number = 0;
    //记分板
    @property({ type: Label })
    public scoreLable: Label | null = null;

    //更新得分
    setScoreLable(score: number) {
        this.scoreLable.string = '' + score;
    }
    //飞行方法
    fly() {
        this.getComponent(RigidBody2D).linearVelocity = new Vec2(0, this.flyspeed);
    }

    start() {
        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(CircleCollider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    //发生碰撞后执行的方法
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        //如果碰撞物体是管道间的计分器
        if (otherCollider.tag == 1) {
            console.info("得分");
            this.score += 1;
            //更新得分
            this.setScoreLable(this.score);
        } else {
            console.info("死亡");
        }
    }



    // update(deltaTime: number) {
    //     // [4]
    // }
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
