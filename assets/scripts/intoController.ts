
import { _decorator, Component, Node, Animation, AnimationClip, AnimationState } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('intoController')
export class intoController extends Component {


    start() {


        const animationComponent = this.node.getComponent(Animation);
        animationComponent.play();
        const [idleClip, runClip] = animationComponent.clips;

        // 获取 idleClip 的动画状态
        const idleState = animationComponent.getState(idleClip.name);
        idleState.repeatCount = 1;
    }

    update(deltaTime: number) {
        // [4]
    }
}


