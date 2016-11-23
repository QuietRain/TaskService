var Task = (function (_super) {
    __extends(Task, _super);
    function Task(id, name, desc, fromNpcId, toNpcId, total, Condition, monsterNumber, Service) {
        _super.call(this);
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.status = TaskStatus.UNACCEPTABLE;
        this.condition = Condition;
        this.condition.fromNpcId = fromNpcId;
        this.condition.toNpcId = toNpcId;
        this.total = total;
        this.current = 0;
        this.monsterNumber = monsterNumber;
        this.Service = Service;
    }
    var d = __define,c=Task,p=c.prototype;
    p.checkStatus = function () {
        if (0 <= this.current && this.current < this.total) {
            return;
        }
        else if (this.current >= this.total) {
            this.status = TaskStatus.CAN_SUBMIT;
        }
        else if (this.current == -2) {
            this.status = TaskStatus.SUBMITTED;
            if (SceneService.sceneService.taskList["task2"].status != TaskStatus.SUBMITTED) {
                SceneService.sceneService.taskList["task2"].status = TaskStatus.ACCEPTABLE;
            }
            SceneService.sceneService.notify();
        }
    };
    p.getcurrent = function () {
        return this.current;
    };
    p.setcurrent = function (num) {
        this.current = num;
        this.checkStatus();
    };
    return Task;
}(EventEmitter));
egret.registerClass(Task,'Task',["TaskConditionContext"]);
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["UNACCEPTABLE"] = 0] = "UNACCEPTABLE";
    TaskStatus[TaskStatus["ACCEPTABLE"] = 1] = "ACCEPTABLE";
    TaskStatus[TaskStatus["DURING"] = 2] = "DURING";
    TaskStatus[TaskStatus["CAN_SUBMIT"] = 3] = "CAN_SUBMIT";
    TaskStatus[TaskStatus["SUBMITTED"] = 4] = "SUBMITTED"; //已交
})(TaskStatus || (TaskStatus = {}));
var currentStatus;
(function (currentStatus) {
    currentStatus[currentStatus["NOTCONTINUABLE"] = -1] = "NOTCONTINUABLE";
    currentStatus[currentStatus["CONTINUABLE"] = 0] = "CONTINUABLE";
    currentStatus[currentStatus["FINISH"] = -2] = "FINISH";
})(currentStatus || (currentStatus = {}));
//# sourceMappingURL=Task.js.map