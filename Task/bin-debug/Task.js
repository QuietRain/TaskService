var Task = (function () {
    function Task(id, name, desc, fromNpcId, toNpcId) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.status = TaskStatus.ACCEPTABLE;
        this.fromNpcId = fromNpcId;
        this.toNpcId = toNpcId;
    }
    var d = __define,c=Task,p=c.prototype;
    return Task;
}());
egret.registerClass(Task,'Task');
//# sourceMappingURL=Task.js.map