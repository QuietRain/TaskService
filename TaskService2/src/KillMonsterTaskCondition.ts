class KillMonsterTaskCondition extends TaskCondition implements Observer {
	public sceneService: SceneService;
	public constructor(_sceneService: SceneService) {
		super();
		this.sceneService = _sceneService;
	}
	public onAccept(task: TaskConditionContext) {
		task.setcurrent(task.getcurrent() + 1);
	}

	public onSubmit(task: TaskConditionContext) {
		task.setcurrent(currentStatus.FINISH);
	}
	onChange(task: Task) {
		console.log("Kill onCHange");
		// if (task.status == TaskStatus.DURING && task.monsterNumber == 1) {
		// 	console.log("杀怪" + task.current);
		// 	this.onAccept(task);


			// task.checkStatus();
		// 	// this.sceneService.notify();
		// }
	}

}