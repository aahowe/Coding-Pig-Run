
import { _decorator, Component, RigidBody2D, Vec2, Collider2D, Contact2DType, IPhysics2DContact, PolygonCollider2D, CircleCollider2D } from 'cc';
import { audioManager } from './audioManager';
import { gameManager } from './gameManager';
import { treasureController } from './treasureController';

const { ccclass, property } = _decorator;


@ccclass('pigController')
export class pigController extends Component {

    @property({ type: gameManager })
    public game: gameManager | null = null;

    @property({ type: treasureController })
    public tre: treasureController | null = null;

    @property(audioManager)
    audio: audioManager | null = null;

    addScore(score: number) {
        this.game.score += score;
        this.game.scoreLable.string = '' + this.game.score;
    }

    start() {
        this.getComponent(RigidBody2D).gravityScale = 0;
        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(CircleCollider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    //发生碰撞后执行的方法
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.tag == 1) { //通过得分点
            this.audio.play("pass");
            this.addScore(1);
            setTimeout(() => {
                this.tre.random();
            }, 1);
        } else if (otherCollider.tag == 2) {  //吃到钻石
            this.audio.play("coin");
            this.addScore(3);
            setTimeout(() => {
                this.tre.node.destroyAllChildren();
            }, 1);
        } else if (otherCollider.tag == 3) {  //吃到绿宝石
            this.audio.play("coin");
            this.addScore(2);
            setTimeout(() => {
                this.tre.node.destroyAllChildren();
            }, 1);
        } else {  //死亡
            setTimeout(() => {
                this.tre.node.destroyAllChildren();
            }, 1);
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
