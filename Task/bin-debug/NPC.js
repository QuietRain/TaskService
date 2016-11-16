var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC(NpcId, emoji, accept_mark, unfinish_mark, finish_mark, _stage, dialoguePanel) {
        var _this = this;
        _super.call(this);
        this._emoji = new egret.Bitmap();
        this._accept_mark = new egret.Bitmap();
        this._unfinish_mark = new egret.Bitmap();
        this._finish_mark = new egret.Bitmap();
        this.MARK_Y = -80;
        this.taskList = [];
        /*	public _rule(taskList): Task {
                console.log("NPC is rule!!!")
                for (let taskid in taskList) {
                    if (taskList[taskid].status == TaskStatus.ACCEPTABLE || taskList[taskid].status == TaskStatus.CAN_SUBMIT) {
                        //	console.log(taskid);
                        //		taskList[taskid].fromNpcId.onChange(taskList[taskid]);
                        return taskList[taskid];
                    }
                }
                return null;
            }*/
        this._rule = function (taskList) {
            for (var taskid in taskList) {
                console.log("taskList[taskid]" + taskList[taskid].status);
                console.log("fromNpcId" + taskList[taskid].fromNpcId);
                console.log("toNpcId" + taskList[taskid].toNpcId);
                if ((taskList[taskid].status == TaskStatus.ACCEPTABLE && (taskList[taskid].fromNpcId == _this._id || taskList[taskid].toNpcId == _this._id)) ||
                    (taskList[taskid].status == TaskStatus.DURING && (taskList[taskid].fromNpcId == _this._id || taskList[taskid].toNpcId == _this._id)) ||
                    taskList[taskid].status == TaskStatus.CAN_SUBMIT && (taskList[taskid].fromNpcId == _this._id || taskList[taskid].toNpcId == _this._id)) {
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
        console.log(" constructor this.id:" + this._id);
        this._stage = _stage;
        this.dialoguePanel = dialoguePanel;
        this._emoji.touchEnabled = true;
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
            console.log("click     !!!!!!");
            _this.onNPCClick();
        }, this);
    }
    var d = __define,c=NPC,p=c.prototype;
    p.onNPCClick = function () {
        var task = TaskService.taskService.getTaskbyCustomRole(this._rule);
        if (task == null) {
            console.log("No task! NPC onNpcClick");
            return ErrorCode.MISSING_TASK;
        }
        console.log(task.desc);
        this._stage.addChild(this.dialoguePanel);
        this.dialoguePanel.onChange(task);
        this.dialoguePanel.setTaskFiled(task.desc);
        this.onChange(task);
    };
    p.onChange = function (task) {
        console.log("NPC is on Change!!");
        console.log("onChange this.id:" + this._id);
        if (task.status == TaskStatus.UNACCEPTABLE) {
            this._accept_mark.alpha = 0;
            this._unfinish_mark.alpha = 0;
            this._finish_mark.alpha = 0;
        }
        else if (task.status == TaskStatus.ACCEPTABLE && task.fromNpcId == this._id) {
            this._accept_mark.alpha = 1;
            this._unfinish_mark.alpha = 0;
            this._finish_mark.alpha = 0;
        }
        else if (task.status == TaskStatus.DURING && task.fromNpcId == this._id) {
            this._accept_mark.alpha = 0;
            this._unfinish_mark.alpha = 1;
            this._finish_mark.alpha = 0;
        }
        else if (task.status == TaskStatus.CAN_SUBMIT && task.fromNpcId == this._id) {
            this._accept_mark.alpha = 0;
            this._unfinish_mark.alpha = 0;
            this._finish_mark.alpha = 1;
        }
        else if (task.status == TaskStatus.SUBMITTED) {
            this._accept_mark.alpha = 0;
            this._unfinish_mark.alpha = 0;
            this._finish_mark.alpha = 0;
        }
        console.log("onChange finsih this.id:" + this._id);
    };
    return NPC;
}(egret.DisplayObjectContainer));
egret.registerClass(NPC,'NPC',["Observer"]);
//# sourceMappingURL=NPC.js.map