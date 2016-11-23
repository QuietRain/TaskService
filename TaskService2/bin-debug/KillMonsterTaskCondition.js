var KillMonsterTaskCondition = (function (_super) {
    __extends(KillMonsterTaskCondition, _super);
    function KillMonsterTaskCondition(_sceneService) {
        _super.call(this);
        this.sceneService = _sceneService;
    }
    var d = __define,c=KillMonsterTaskCondition,p=c.prototype;
    p.onAccept = function (task) {
        task.setcurrent(task.getcurrent() + 1);
    };
    p.onSubmit = function (task) {
        task.setcurrent(currentStatus.FINISH);
    };
    p.onChange = function (task) {
        console.log("Kill onCHange");
        // if (task.status == TaskStatus.DURING && task.monsterNumber == 1) {
        // 	console.log("杀怪" + task.current);
        // 	this.onAccept(task);
        // task.checkStatus();
        // 	// this.sceneService.notify();
        // }
    };
    return KillMonsterTaskCondition;
}(TaskCondition));
egret.registerClass(KillMonsterTaskCondition,'KillMonsterTaskCondition',["Observer"]);
//# sourceMappingURL=KillMonsterTaskCondition.js.map