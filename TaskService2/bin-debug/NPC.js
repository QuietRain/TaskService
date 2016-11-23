var NPC = (function (_super) {
    __extends(NPC, _super);
    //private taskList: Task[] = [];      //
    function NPC(NpcId, emoji, accept_mark, unfinish_mark, finish_mark, _stage, dialoguePanel) {
        var _this = this;
        _super.call(this);
        this._emoji = new egret.Bitmap();
        this._accept_mark = new egret.Bitmap();
        this._unfinish_mark = new egret.Bitmap();
        this._finish_mark = new egret.Bitmap();
        this.MARK_Y = -80;
        this._rule = function (taskList) {
            for (var taskid in taskList) {
                if ((taskList[taskid].status == TaskStatus.ACCEPTABLE && (taskList[taskid].condition.fromNpcId == _this._id || taskList[taskid].condition.toNpcId == _this._id)) ||
                    (taskList[taskid].status == TaskStatus.DURING && (taskList[taskid].condition.fromNpcId == _this._id || taskList[taskid].condition.toNpcId == _this._id)) ||
                    taskList[taskid].status == TaskStatus.CAN_SUBMIT && (taskList[taskid].condition.fromNpcId == _this._id || taskList[taskid].condition.toNpcId == _this._id)) {
                    return taskList[taskid];
                }
            }
            return null;
        };
        this._emoji;
        this._emoji.texture = RES.getRes(emoji);
        this._accept_mark.texture = RES.getRes(accept_mark);
        this._unfinish_mark.texture = RES.getRes(unfinish_mark);
        this._finish_mark.texture = RES.getRes(finish_mark);
        this._id = NpcId;
        this._stage = _stage;
        this.dialoguePanel = dialoguePanel;
        this._emoji.touchEnabled = false;
        this._accept_mark.y = this.MARK_Y;
        this._unfinish_mark.y = this.MARK_Y;
        this._finish_mark.y = this.MARK_Y;
        this._accept_mark.alpha = 0;
        this._unfinish_mark.alpha = 0;
        this._finish_mark.alpha = 0;
        this.addChild(this._emoji);
        this.addChild(this._accept_mark);
        this.addChild(this._unfinish_mark);
        this.addChild(this._finish_mark);
        this._emoji.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("Npc is click");
            _this.onNPCClick();
        }, this);
    }
    var d = __define,c=NPC,p=c.prototype;
    p.onNPCClick = function () {
        var task = TaskService.taskService.getTaskbyCustomRole(this._rule);
        if (task == null) {
            task = SceneService.sceneService.getTaskbyCustomRole(this._rule);
            if (task == null) {
                console.log("没有任务");
            }
        }
        this._stage.addChild(this.dialoguePanel);
        this.dialoguePanel.onChange(task);
        this.dialoguePanel.setTaskFiled(task.desc);
        this.onChange(task);
    };
    p.onChange = function (task) {
        console.log(this._id + " is on Change!!");
        if (task.status == TaskStatus.UNACCEPTABLE) {
            this._accept_mark.alpha = 0;
            this._unfinish_mark.alpha = 0;
            this._finish_mark.alpha = 0;
            return 0;
        }
        else if (task.status == TaskStatus.ACCEPTABLE && task.condition.fromNpcId == this._id) {
            console.log("可接任务");
            this._accept_mark.alpha = 1;
            this._unfinish_mark.alpha = 0;
            this._finish_mark.alpha = 0;
            this._emoji.touchEnabled = true;
            return 1;
        }
        else if (task.status == TaskStatus.DURING && task.condition.toNpcId == this._id) {
            console.log("进行中 现Npc");
            this._accept_mark.alpha = 0;
            this._unfinish_mark.alpha = 1;
            this._finish_mark.alpha = 0;
            this._emoji.touchEnabled = true;
            return 0;
        }
        else if (task.status == TaskStatus.DURING && task.condition.fromNpcId == this._id) {
            console.log("进行中任务 原npc");
            this._accept_mark.alpha = 0;
            this._unfinish_mark.alpha = 0;
            this._finish_mark.alpha = 0;
            if (task.condition.fromNpcId != task.condition.toNpcId) {
                this._emoji.touchEnabled = false;
            }
            return 1;
        }
        else if (task.status == TaskStatus.CAN_SUBMIT && task.condition.toNpcId == this._id) {
            this._accept_mark.alpha = 0;
            this._unfinish_mark.alpha = 0;
            this._finish_mark.alpha = 1;
            this._emoji.touchEnabled = true;
            return 1;
        }
        else if (task.status == TaskStatus.SUBMITTED) {
            this._accept_mark.alpha = 0;
            this._unfinish_mark.alpha = 0;
            this._finish_mark.alpha = 0;
            this._emoji.touchEnabled = false;
            return 1;
        }
    };
    return NPC;
}(egret.DisplayObjectContainer));
egret.registerClass(NPC,'NPC',["Observer"]);
//# sourceMappingURL=NPC.js.map