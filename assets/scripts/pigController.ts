
import { _decorator, Component, RigidBody2D, Vec2, Collider2D, Contact2DType, IPhysics2DContact, PolygonCollider2D } from 'cc';
import { gameManager } from './gameManager';

const { ccclass, property } = _decorator;


@ccclass('pigController')
export class pigController extends Component {

    @property({ type: gameManager })
    public game: gameManager | null = null;

    start() {
        this.getComponent(RigidBody2D).gravityScale = 0;
        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(PolygonCollider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    //发生碰撞后执行的方法
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        //如果碰撞物体是管道间的计分器
        if (otherCollider.tag == 1) {
            console.info("得分");

        } else {
            console.info("end");
            this.game.endGame();
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
