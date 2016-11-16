var TaskService = (function () {
    function TaskService() {
        this.observerList = []; //观察者列表
        this.taskList = {}; //任务列表
        if (!TaskService.taskService) {
            TaskService.taskService = this;
        }
        return TaskService.taskService;
    }
    var d = __define,c=TaskService,p=c.prototype;
    p.finish = function (id) {
        if (!id) {
            return ErrorCode.MISSING_TASK;
        }
        var task = this.taskList[id];
        if (!task) {
            return ErrorCode.ERROR_TASK;
        }
        task.status = TaskStatus.CAN_SUBMIT;
        this.notify();
        return ErrorCode.SUCCESS;
    };
    p.accept = function (id) {
        if (!id) {
            return ErrorCode.MISSING_TASK;
        }
        var task = this.taskList[id];
        if (!task) {
            return ErrorCode.ERROR_TASK;
        }
        task.status = TaskStatus.DURING;
        this.notify();
        return ErrorCode.SUCCESS;
    };
    p.submit = function (id) {
        if (!id) {
            return ErrorCode.MISSING_TASK;
        }
        var task = this.taskList[id];
        if (!task) {
            return ErrorCode.ERROR_TASK;
        }
        task.status = TaskStatus.SUBMITTED;
        this.notify();
        return ErrorCode.SUCCESS;
    };
    p.getTaskbyCustomRole = function (rule) {
        return rule(this.taskList);
    };
    p.notify = function () {
        for (var taskId in this.taskList) {
            for (var _i = 0, _a = this.observerList; _i < _a.length; _i++) {
                var observer = _a[_i];
                observer.onChange(this.taskList[taskId]);
            }
        }
    };
    p.addTask = function (task) {
        this.taskList[task.id] = task;
        this.notify();
    };
    p.addObserver = function (observer) {
        this.observerList.push(observer);
        this.notify();
    };
    return TaskService;
}());
egret.registerClass(TaskService,'TaskService');
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["MISSING_TASK"] = 0] = "MISSING_TASK";
    ErrorCode[ErrorCode["SUCCESS"] = 1] = "SUCCESS";
    ErrorCode[ErrorCode["ERROR_TASK"] = 0] = "ERROR_TASK";
})(ErrorCode || (ErrorCode = {}));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["UNACCEPTABLE"] = 0] = "UNACCEPTABLE";
    TaskStatus[TaskStatus["ACCEPTABLE"] = 1] = "ACCEPTABLE";
    TaskStatus[TaskStatus["DURING"] = 2] = "DURING";
    TaskStatus[TaskStatus["CAN_SUBMIT"] = 3] = "CAN_SUBMIT";
    TaskStatus[TaskStatus["SUBMITTED"] = 4] = "SUBMITTED"; //已交
})(TaskStatus || (TaskStatus = {}));
//# sourceMappingURL=TaskService.js.map