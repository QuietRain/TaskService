class TaskService {
	public observerList: Observer[] = [];//观察者列表
	public taskList: {
		[index: string]: Task
	} = {};  //任务列表
	public static taskService;

	constructor() {
		if (!TaskService.taskService) {
			TaskService.taskService = this;
		}
		return TaskService.taskService;
	}


	public finish(id: string): ErrorCode {  //完成任务
		if (!id) {
			return ErrorCode.MISSING_TASK;
		}
		let task = this.taskList[id];
		if (!task) {
			return ErrorCode.ERROR_TASK;
		}
		task.status = TaskStatus.CAN_SUBMIT
		this.notify();
		return ErrorCode.SUCCESS;
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
		this.notify();
		return ErrorCode.SUCCESS;
	}

	public submit(id: string): ErrorCode {   //交付任务
		if (!id) {
			return ErrorCode.MISSING_TASK;
		}
		let task = this.taskList[id];
		if (!task) {
			return ErrorCode.ERROR_TASK;
		}
		task.status = TaskStatus.SUBMITTED
		this.notify();
		return ErrorCode.SUCCESS;
	}

	public getTaskbyCustomRole(rule: Function): Task {   //通过角色提取任务
		return rule(this.taskList);
	}

	public notify(): void {     //通知
		for (let taskId in this.taskList) {
			for (let observer of this.observerList) {
				observer.onChange(this.taskList[taskId]);
			}
		}
	}
	public addTask(task: Task) {
		this.taskList[task.id] = task;
		this.notify();
	}

	public addObserver(observer: Observer) {
		this.observerList.push(observer);
		this.notify();
	}
}
enum ErrorCode {
	MISSING_TASK = 0,
	SUCCESS = 1,
	ERROR_TASK = 0
}

interface Observer {
	onChange(task: Task);
}

enum TaskStatus {
	UNACCEPTABLE = 0,       //不可接
	ACCEPTABLE = 1,          //可接
	DURING = 2,              //进行中
	CAN_SUBMIT = 3,          //可交
	SUBMITTED = 4            //已交
}