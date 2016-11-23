var SceneService = (function (_super) {
    __extends(SceneService, _super);
    function SceneService() {
        _super.call(this);
        if (!SceneService.sceneService) {
            SceneService.sceneService = this;
        }
        return SceneService.sceneService;
    }
    var d = __define,c=SceneService,p=c.prototype;
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
    // public getTaskbyCustomRole(rule: Function): Task {   //通过角色提取任务
    // 	return rule(this.taskList);
    // }
    p.notify = function () {
        //	console.log("SceneService notify");
        for (var taskId in this.taskList) {
            for (var _i = 0, _a = this.observerList; _i < _a.length; _i++) {
                var observer = _a[_i];
                // if (observer.onChange(this.taskList[taskId]) == 0) {
                observer.onChange(this.taskList[taskId]);
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
    p.getTaskbyCustomRole = function (rule) {
        return rule(this.taskList);
    };
    return SceneService;
}(EventEmitter));
egret.registerClass(SceneService,'SceneService');
//# sourceMappingURL=SceneService.js.map