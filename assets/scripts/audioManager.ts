
import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = audioManager
 * DateTime = Mon Mar 14 2022 17:10:53 GMT+0800 (中国标准时间)
 * Author = aahowe
 * FileBasename = audioManager.ts
 * FileBasenameNoExtension = audioManager
 * URL = db://assets/scripts/audioManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('audioManager')
export class audioManager extends Component {

    @property(AudioSource)
    public audioSource: AudioSource = null!;

    @property(AudioClip)
    public jump: AudioClip = null!;

    @property(AudioClip)
    public button: AudioClip = null!;

    @property(AudioClip)
    public die: AudioClip = null!;

    @property(AudioClip)
    public coin: AudioClip = null!;

    @property(AudioClip)
    public pass: AudioClip = null!;

    @property(AudioClip)
    public dialog: AudioClip = null!;

    play(name: string) {
        switch (name) {
            case this.jump.name:
                this.audioSource.playOneShot(this.jump, 1);
                break;
            case this.button.name:
                this.audioSource.playOneShot(this.button, 1);
                break;
            case this.die.name:
                this.audioSource.playOneShot(this.die, 1);
                break;
            case this.coin.name:
                this.audioSource.playOneShot(this.coin, 0.5);
                break;
            case this.pass.name:
                this.audioSource.playOneShot(this.pass, 2);
                break;
            case this.dialog.name:
                this.audioSource.playOneShot(this.dialog, 1);
                break;
        }
    }

    start() {

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
