var EventEmitter = (function () {
    function EventEmitter() {
        this.observerList = []; //观察者列表
        this.taskList = {}; //任务列表
    }
    var d = __define,c=EventEmitter,p=c.prototype;
    p.notify = function () {
    };
    p.addObserver = function (observer) {
    };
    p.addTask = function (task) {
    };
    return EventEmitter;
}());
egret.registerClass(EventEmitter,'EventEmitter');
//# sourceMappingURL=EventEmitter.js.map