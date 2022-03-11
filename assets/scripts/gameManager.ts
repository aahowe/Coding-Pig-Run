
import { _decorator, Component, RigidBody2D, ButtonComponent, Sprite, Vec3, input, Input, EventTouch, Vec2, __private } from 'cc';
import { bgController } from './bgController';
import { birdController } from './birdController';
import { landController } from './landController';
import { pipeController } from './pipeController';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = gameManager
 * DateTime = Sun Mar 06 2022 14:56:13 GMT+0800 (中国标准时间)
 * Author = aahowe
 * FileBasename = gameManager.ts
 * FileBasenameNoExtension = gameManager
 * URL = db://assets/scripts/gameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

enum GameState {
    INIT,
    PLAYING,
    END,
};

@ccclass('gameManager')
export class gameManager extends Component {
    // [1]
    // dummy = '';

    //引入bird
    @property(birdController)
    bird: birdController | null = null;
    //引入backgrand
    @property(bgController)
    bg: bgController | null = null;
    //引入land
    @property(landController)
    land: landController | null = null;
    //引入pipe
    @property(pipeController)
    pipe: pipeController | null = null;

    setInputActive(active: boolean) {
        if (active) {
            input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
            input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        } else {
            input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
            input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        }
    }
    onTouchEnd(event: EventTouch) {
        this.bird.unfly();
        console.info("结束飞行");
    }

    onTouchStart(event: EventTouch) {
        this.bird.fly();
        console.info("开始飞行");
    }

    start() {
        //设置游戏状态为初始化
        this.curState = GameState.INIT;
    }

    //根据游戏状态进行操作
    set curState(value: GameState) {
        switch (value) {
            case GameState.INIT:
                console.info("初始化");
                this.init();
                break;
            case GameState.PLAYING:
                this.startGame();
                console.info("开始游戏");
                break;
            case GameState.END:
                this.endGame();
                console.info("结束");
                break;
        }
    }

    //初始化方法
    init() {

        //取消显示restart
        this.node.getChildByName("restart").getComponent(Sprite).enabled = false;
        this.node.getChildByName("restart").getComponent(ButtonComponent).enabled = false;
        //设置管道不移动
        this.pipe.speed = 0;
        //显示play按钮
        this.node.getChildByName("start").getComponent(Sprite).enabled = true;
        this.node.getChildByName("start").getComponent(ButtonComponent).enabled = true;
    }

    //开始游戏
    startGame() {
        //启用监听
        this.setInputActive(true);
        //禁用play按钮
        this.node.getChildByName("start").getComponent(ButtonComponent).enabled = false;
        this.node.getChildByName("start").getComponent(Sprite).enabled = false;
        //初始化管道
        this.pipe.reset();
    }

    //结束游戏
    endGame() {
        //关闭监听碰撞
        this.bird.getComponent(RigidBody2D).enabledContactListener = false;
        //关闭监听触摸
        this.setInputActive(false);
        setTimeout(() => {
            //显示restart
            this.node.getChildByName("restart").getComponent(Sprite).enabled = true;
            this.node.getChildByName("restart").getComponent(ButtonComponent).enabled = true;
        }, 1000)
        //背景停止移动
        this.bg.speed = 0;
        //地面停止移动
        this.land.speed = 0;
        //管道停止移动
        this.pipe.speed = 0;
    }

    //重新游戏
    restart() {
        //取消显示restart
        this.node.getChildByName("restart").getComponent(Sprite).enabled = false;
        this.node.getChildByName("restart").getComponent(ButtonComponent).enabled = false;
        //小鸟归位
        this.bird.node.setPosition(new Vec3(0, 0, 0));
        //管道归位
        this.pipe.reset();
        this.pipe.speed = 0;
        //背景恢复
        this.bg.speed = 50;
        //地面恢复
        this.land.speed = 100;
        //设置得分和记分板为0
        this.bird.score = 0;
        this.bird.scoreLable.string = '' + 0;
        //开启监听碰撞
        this.bird.getComponent(RigidBody2D).enabledContactListener = true;
        //bird速度归零
        this.bird.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
        //初始化游戏
        this.curState = GameState.INIT;
    }

    // update (deltaTime: number) {
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
