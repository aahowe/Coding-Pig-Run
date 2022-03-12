
import { _decorator, Component, Node, input, Input, EventTouch, SpotLightComponent, Label, ButtonComponent, Sprite, RigidBody2D, Vec3, Vec2 } from 'cc';
import { bgController } from './bgController';
import { landController } from './landController';
import { obstaclecontroller } from './obstaclecontroller';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = gameManager
 * DateTime = Fri Mar 11 2022 16:29:16 GMT+0800 (中国标准时间)
 * Author = aahowe
 * FileBasename = gameManager.ts
 * FileBasenameNoExtension = gameManager
 * URL = db://assets/scripts/gameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('gameManager')
export class gameManager extends Component {

    score: number = 0

    @property(landController)
    land: landController | null = null;

    @property(obstaclecontroller)
    oba: obstaclecontroller | null = null;

    @property
    bg: bgController | null = null;

    //记分板
    @property({ type: Label })
    public scoreLable: Label | null = null;

    //设置触摸
    setInputActive(active: boolean) {
        if (active) {
            input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
            input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        } else {
            input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
            input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        }
    }
    //触摸结束
    onTouchStart(event: EventTouch) {
        console.info("touch");
        this.node.getChildByName("pig").getComponent(RigidBody2D).gravityScale = 0;
        this.node.getChildByName("pig").getComponent(RigidBody2D).linearVelocity = new Vec2(0, 7);
    }
    //触摸开始
    onTouchEnd(event: EventTouch) {
        console.info("untouch");
        this.node.getChildByName("pig").getComponent(RigidBody2D).gravityScale = 2;
    }

    //初始化方法
    init() {
        //取消显示restart
        this.node.getChildByName("restart").getComponent(Sprite).enabled = false;
        this.node.getChildByName("restart").getComponent(ButtonComponent).enabled = false;
        //设置管道不移动
        //this.oba.speed = 0;
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
        //this.oba.reset();
    }

    //结束游戏
    endGame() {
        //添加重力
        this.node.getChildByName("pig").getComponent(RigidBody2D).gravityScale = 2;
        //关闭监听碰撞
        this.node.getChildByName("pig").getComponent(RigidBody2D).enabledContactListener = false;
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
        //this.oba.speed = 0;
    }

    //重新游戏
    restart() {
        //取消显示restart
        this.node.getChildByName("restart").getComponent(Sprite).enabled = false;
        this.node.getChildByName("restart").getComponent(ButtonComponent).enabled = false;
        //猪归位
        this.node.getChildByName("pig").setPosition(new Vec3(0, 0, 0));
        //管道归位
        // this.pipe.reset();
        // this.pipe.speed = 0;
        //背景恢复
        this.bg.speed = 50;
        //地面恢复
        this.land.speed = 100;
        //设置得分和记分板为0
        this.score = 0;
        this.scoreLable.string = '' + 0;
        //开启监听碰撞
        this.node.getChildByName("pig").getComponent(RigidBody2D).enabledContactListener = true;
        //pig速度归零
        this.node.getChildByName("pig").getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
        //初始化游戏
        this.init();
    }


    start() {
        this.init();
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
