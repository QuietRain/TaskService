var TaskService = (function (_super) {
    __extends(TaskService, _super);
    function TaskService() {
        _super.call(this);
        if (!TaskService.taskService) {
            TaskService.taskService = this;
        }
        return TaskService.taskService;
    }
    var d = __define,c=TaskService,p=c.prototype;
    p.accept = function (id) {
        if (!id) {
            return ErrorCode.MISSING_TASK;
        }
        var task = this.taskList[id];
        if (!task) {
            return ErrorCode.ERROR_TASK;
        }
        task.status = TaskStatus.DURING;
        return ErrorCode.SUCCESS;
    };
    p.getTaskbyCustomRole = function (rule) {
        return rule(this.taskList);
    };
    p.notify = function () {
        console.log("TaskService notify");
        for (var taskId in this.taskList) {
            for (var _i = 0, _a = this.observerList; _i < _a.length; _i++) {
                var observer = _a[_i];
                if (observer.onChange(this.taskList[taskId]) == 0) {
                    return;
                }
                else {
                    continue;
                }
            }
        }
    };
    p.addObserver = function (observer) {
        this.observerList.push(observer);
        this.notify();
    };
    p.addTask = function (task) {
        this.taskList[task.id] = task;
        this.notify();
    };
    return TaskService;
}(EventEmitter));
egret.registerClass(TaskService,'TaskService');
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["MISSING_TASK"] = 0] = "MISSING_TASK";
    ErrorCode[ErrorCode["SUCCESS"] = 1] = "SUCCESS";
    ErrorCode[ErrorCode["ERROR_TASK"] = 0] = "ERROR_TASK";
})(ErrorCode || (ErrorCode = {}));
//# sourceMappingURL=TaskService.js.map