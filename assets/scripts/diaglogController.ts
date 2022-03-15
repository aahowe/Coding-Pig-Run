
import { _decorator, Component, Node, director, AudioSource, AudioClip } from 'cc';
import { diaglog_messageController } from './diaglog_messageController';
import { diaglog_mushroomController } from './diaglog_mushroomController';
import { diaglog_pigController } from './diaglog_pigController';
const { ccclass, property } = _decorator;

class Message {
    pig: string;
    mushroom: string;
    text: string;


    constructor(pig: string, mushroom: string, text: string) {
        this.mushroom = mushroom;
        this.pig = pig;
        this.text = text;
    }

}



@ccclass('diaglogController')
export class diaglogController extends Component {

    @property(diaglog_pigController)
    Diaglog_pigcontrol: diaglog_pigController = null;

    @property(AudioSource)
    public audioSource: AudioSource = null!;

    @property(AudioClip)
    public dialog: AudioClip = null!;

    @property(diaglog_mushroomController)
    Diaglog_mushroomcontrol: diaglog_mushroomController = null;


    @property(diaglog_messageController)
    Diaglog_messagecontrol: diaglog_messageController = null;


    msgs: Message[] = null;

    index: number = 0;

    start() {

        director.preloadScene("main", function () {
            console.log('main preloaded');
        });


        this.msgs = [
            new Message('', '', '夜晚，一只程序猪破防了'),
            new Message('', '', '程序蘑菇却不以为然'),
            new Message('pig2-1/spriteFrame', '', '好多工作'),
            new Message('', 'mushroom-export/spriteFrame', '。。。'),
            new Message('pig2-2/spriteFrame', '', '我要罢工'),
            new Message('', 'mushroom-export/spriteFrame', '。。。'),
            new Message('pig2-2/spriteFrame', '', '我要离开这里！'),
            new Message('', 'mushroom-export/spriteFrame', '。。?'),
            new Message('pig2-1/spriteFrame', '', '我要飞出去！！！'),
            new Message('', 'mushroom-export/spriteFrame', '??!')
        ]


        this.node.on(Node.EventType.TOUCH_START, (Event) => {
            if (this.index < this.msgs.length) {
                this.audioSource.playOneShot(this.dialog, 0.5);

                if (this.Diaglog_messagecontrol.node.active == false) {
                    this.Diaglog_messagecontrol.node.active = true;
                }
                if (this.Diaglog_pigcontrol.node.active == false && this.index == 1) {
                    this.Diaglog_pigcontrol.node.active = true;
                }
                if (this.Diaglog_mushroomcontrol.node.active == false && this.index == 2) {
                    this.Diaglog_mushroomcontrol.node.active = true;
                }
                let message = this.msgs[this.index];

                this.Diaglog_pigcontrol.setImage(message.pig);
                this.Diaglog_messagecontrol.setmessage(message.text);
                this.Diaglog_mushroomcontrol.setImage(message.mushroom);

            }
            this.index++;

            if (this.index == this.msgs.length + 1) {
                director.loadScene("main");
            }



        });




    }

    update(deltaTime: number) {
        // [4]
    }


}


