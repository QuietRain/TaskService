class SceneService extends EventEmitter {


	public static sceneService;
	constructor() {
		super();
		if (!SceneService.sceneService) {
			SceneService.sceneService = this;
		}
		return SceneService.sceneService;
	}



	public accept(id: string): ErrorCode {   //接受任务
		if (!id) {
			return ErrorCode.MISSING_TASK;
		}
		let task = this.taskList[id];
		if (!task) {
			return ErrorCode.ERROR_TASK;
		}
		task.status = TaskStatus.DURING;

		return ErrorCode.SUCCESS;
	}

	// public getTaskbyCustomRole(rule: Function): Task {   //通过角色提取任务
	// 	return rule(this.taskList);
	// }

	public notify(): void {     //通知
		//	console.log("SceneService notify");
		for (let taskId in this.taskList) {
			for (let observer of this.observerList) {
				// if (observer.onChange(this.taskList[taskId]) == 0) {
					observer.onChange(this.taskList[taskId]);
				// 	console.log(this.taskList[taskId].status);
				// 	console.log(this.taskList[taskId].current);
				// 	console.log("SceneService notify结束了");
				// 	return;
				// } else {
				// 	console.log(this.taskList[taskId].status);
				// 	console.log("SceneService notify在继续");
				// 	continue;
				// }
			}
		}
	}
	public addObserver(observer: Observer) {
		this.observerList.push(observer);
		this.notify();
	}

	public addTask(task: Task) {
		this.taskList[task.id] = task;
		this.notify();
	}
	public getTaskbyCustomRole(rule: Function): Task {   //通过角色提取任务
		return rule(this.taskList);
	}
}