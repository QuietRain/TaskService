var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    function TaskPanel(_stage) {
        _super.call(this);
        this.height = 400;
        this.width = 400;
        this._stage = _stage;
        this.wordPanel = new egret.Shape();
        this.wordPanel.graphics.beginFill(0x000000, 0.5);
        this.wordPanel.graphics.drawRect(0, 0, this.width, this.height);
        this.wordPanel.graphics.endFill();
        this.addChild(this.wordPanel);
        this.textField = new egret.TextField();
        this.textField.y = 200;
        this.addChild(this.textField);
        this.taskname = new egret.TextField();
        this.taskname.y = 100;
        this.addChild(this.taskname);
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.onChange = function (task) {
        console.log("DialoguePanel is on change");
        if (task.status == TaskStatus.UNACCEPTABLE) {
        }
        else if (task.status == TaskStatus.ACCEPTABLE) {
            this.taskname.text = task.name + "(可接受)";
            this.textField.text = task.desc;
        }
        else if (task.status == TaskStatus.DURING) {
            this.taskname.text = task.name + "(进行中)";
            this.textField.text = task.desc;
        }
        else if (task.status == TaskStatus.DURING) {
            this.taskname.text = task.name + "(可完成)";
            this.textField.text = task.desc;
        }
        else if (task.status == TaskStatus.CAN_SUBMIT) {
            this.taskname.text = task.name + "(可交付)";
            this.textField.text = task.desc;
        }
        else if (task.status == TaskStatus.SUBMITTED) {
            this.taskname.text = task.name + "(已完成)";
            this.textField.text = task.desc;
        }
    };
    return TaskPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(TaskPanel,'TaskPanel');
//# sourceMappingURL=TaskPanel.js.map