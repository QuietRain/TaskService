var DialoguePanel = (function (_super) {
    __extends(DialoguePanel, _super);
    function DialoguePanel(npcId, _stage) {
        var _this = this;
        _super.call(this);
        //	priate
        this.height = 400;
        this.width = 400;
        this.button_height = 100;
        this.button_width = 200;
        this._rule = function (taskList) {
            for (var taskid in taskList) {
                if ((taskList[taskid].status == TaskStatus.ACCEPTABLE && (taskList[taskid].condition.fromNpcId == _this.NPCId || taskList[taskid].condition.toNpcId == _this.NPCId)) ||
                    (taskList[taskid].status == TaskStatus.DURING && (taskList[taskid].condition.fromNpcId == _this.NPCId || taskList[taskid].condition.toNpcId == _this.NPCId)) ||
                    taskList[taskid].status == TaskStatus.CAN_SUBMIT && (taskList[taskid].condition.fromNpcId == _this.NPCId || taskList[taskid].condition.toNpcId == _this.NPCId)) {
                    console.log("Fromid: " + taskList[taskid].condition.fromNpcId + " toId: " + taskList[taskid].condition.toNpcId);
                    return taskList[taskid];
                }
            }
            return null;
        };
        this._stage = _stage;
        this.wordPanel = new egret.Shape();
        this.wordPanel.graphics.beginFill(0x000000, 0.5);
        this.wordPanel.graphics.drawRect(0, 0, this.width, this.height);
        this.wordPanel.graphics.endFill();
        this.addChild(this.wordPanel);
        this.button = new egret.TextField();
        this.button.x = (this.wordPanel.width - this.button.width) / 2;
        this.button.y = (this.wordPanel.height - this.button.height) / 2;
        this.button.text = "继续";
        this.addChild(this.button);
        this.textField = new egret.TextField();
        this.textField.y = 100;
        this.addChild(this.textField);
        this.taskField = new egret.TextField();
        this.taskField.y = 20;
        this.addChild(this.taskField);
        this.button.touchEnabled = true;
        this.NPCId = npcId;
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.onButtonClick();
        }, this);
    }
    var d = __define,c=DialoguePanel,p=c.prototype;
    p.onButtonClick = function () {
        var task = TaskService.taskService.getTaskbyCustomRole(this._rule); //找到当前任务
        var Service = TaskService;
        if (task == null || task.status == TaskStatus.SUBMITTED) {
            task = SceneService.sceneService.getTaskbyCustomRole(this._rule);
            Service = SceneService;
            if (task == null) {
                console.log("没有任务");
            }
        }
        this.onChange(task);
        if (task == null) {
        }
        else if (task.status == TaskStatus.ACCEPTABLE && task.condition.fromNpcId == this.NPCId) {
            if (Service == SceneService) {
                SceneService.sceneService.accept(task.id);
                SceneService.sceneService.notify();
            }
            else if (Service == TaskService) {
                TaskService.taskService.accept(task.id);
                TaskService.taskService.notify();
            }
        }
        else if (task.status == TaskStatus.DURING && task.condition.toNpcId == this.NPCId) {
            if (Service == SceneService) {
                SceneService.sceneService.notify();
            }
            else if (Service == TaskService) {
                console.log("调用taskservice");
                task.condition.onAccept(task);
                TaskService.taskService.notify();
            }
        }
        else if (task.status == TaskStatus.CAN_SUBMIT && task.condition.toNpcId == this.NPCId) {
            task.condition.onSubmit(task);
        }
        this._stage.removeChild(this);
    };
    p.setTextField = function (text) {
        this.textField.text = text;
    };
    p.setTaskFiled = function (text) {
        this.taskField.text = text;
    };
    p.onChange = function (task) {
        if (task.status == TaskStatus.UNACCEPTABLE) {
            return;
        }
        else if (task.status == TaskStatus.ACCEPTABLE && task.condition.fromNpcId == this.NPCId) {
            this.textField.text = "可接受任务，是否接受？";
            this.button.text = "接受";
            return 0;
        }
        else if (task.status == TaskStatus.DURING && task.condition.fromNpcId == this.NPCId) {
            this.textField.text = "正在进行中任务，不可交";
            this.button.text = "退出";
            return 0;
        }
        else if (task.status == TaskStatus.DURING && task.condition.toNpcId == this.NPCId) {
            this.textField.text = "正在进行中任务，可完成";
            this.button.text = "完成";
            return 0;
        }
        else if (task.status == TaskStatus.CAN_SUBMIT && task.condition.toNpcId == this.NPCId) {
            this.textField.text = "正在进行中任务，可交付";
            this.button.text = "交付";
            return 0;
        }
        else if (task.status == TaskStatus.SUBMITTED) {
            this.textField.text = "已完成的任务";
            this.button.text = "退出";
            return 0;
        }
    };
    return DialoguePanel;
}(egret.DisplayObjectContainer));
egret.registerClass(DialoguePanel,'DialoguePanel',["Observer"]);
//# sourceMappingURL=DialoguePanel.js.map