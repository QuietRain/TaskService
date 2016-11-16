class NPC extends egret.DisplayObjectContainer implements Observer {
	private _emoji: egret.Bitmap = new egret.Bitmap();
	private _accept_mark: egret.Bitmap = new egret.Bitmap();
	private _unfinish_mark: egret.Bitmap = new egret.Bitmap();
	private _finish_mark: egret.Bitmap = new egret.Bitmap();
	private dialoguePanel: DialoguePanel;
	public _id: String;
	private _stage: any;
	private MARK_Y = -80;
	private taskList: Task[] = [];
	public constructor(NpcId: string, emoji: string, accept_mark: string, unfinish_mark: string, finish_mark: string, _stage: any,
		dialoguePanel: DialoguePanel) {
		super();
		this._emoji
		this._emoji.texture = RES.getRes(emoji);
		this._accept_mark.texture = RES.getRes(accept_mark);
		this._unfinish_mark.texture = RES.getRes(unfinish_mark);
		this._finish_mark.texture = RES.getRes(finish_mark);
		this._id = NpcId;
	//	console.log(" constructor this.id:" + this._id)
		this._stage = _stage
		this.dialoguePanel = dialoguePanel;

		this._emoji.touchEnabled = true;
		this._accept_mark.y = this.MARK_Y;
		this._unfinish_mark.y = this.MARK_Y;
		this._finish_mark.y = this.MARK_Y;

		this._accept_mark.alpha = 0;
		this._unfinish_mark.alpha = 0;
		this._finish_mark.alpha = 0;

		this.addChild(this._emoji);
		this.addChild(this._accept_mark);
		this.addChild(this._unfinish_mark);
		this.addChild(this._finish_mark);

		this._emoji.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
	//		console.log("click     !!!!!!");
			this.onNPCClick();
		}, this);
	}

	private onNPCClick() {
		var task = TaskService.taskService.getTaskbyCustomRole(this._rule);

		if (task == null) {
	//		console.log("No task! NPC onNpcClick");
			return ErrorCode.MISSING_TASK
		}
	//	console.log(task.desc);
		this._stage.addChild(this.dialoguePanel);
		this.dialoguePanel.onChange(task);
		this.dialoguePanel.setTaskFiled(task.desc);
		this.onChange(task);
	}

	public onChange(task: Task) {
//		console.log("NPC is on Change!!");
//		console.log("onChange this.id:" + this._id)
		if (task.status == TaskStatus.UNACCEPTABLE) {   //不可接任务
			this._accept_mark.alpha = 0;
			this._unfinish_mark.alpha = 0;
			this._finish_mark.alpha = 0;
		} else if (task.status == TaskStatus.ACCEPTABLE && task.fromNpcId == this._id) { //可接任务
			this._accept_mark.alpha = 1;
			this._unfinish_mark.alpha = 0;
			this._finish_mark.alpha = 0;
		} else if (task.status == TaskStatus.DURING && task.fromNpcId == this._id) { //进行中任务
			this._accept_mark.alpha = 0;
			this._unfinish_mark.alpha = 1;
			this._finish_mark.alpha = 0;
		} else if (task.status == TaskStatus.CAN_SUBMIT && task.fromNpcId == this._id) { //可交任务
			this._accept_mark.alpha = 0;
			this._unfinish_mark.alpha = 0;
			this._finish_mark.alpha = 1;
		} else if (task.status == TaskStatus.SUBMITTED) { //已交任务
			this._accept_mark.alpha = 0;
			this._unfinish_mark.alpha = 0;
			this._finish_mark.alpha = 0;
		}
	//	console.log("onChange finsih this.id:" + this._id)
	}
	/*	public _rule(taskList): Task {
			console.log("NPC is rule!!!")
			for (let taskid in taskList) {
				if (taskList[taskid].status == TaskStatus.ACCEPTABLE || taskList[taskid].status == TaskStatus.CAN_SUBMIT) {
					//	console.log(taskid);
					//		taskList[taskid].fromNpcId.onChange(taskList[taskid]);
					return taskList[taskid];
				}
			}
			return null;
		}*/
	public _rule = (taskList): Task => {
		for (let taskid in taskList) {
	//		console.log("taskList[taskid]" + taskList[taskid].status);
	//		console.log("fromNpcId" + taskList[taskid].fromNpcId);
	//		console.log("toNpcId" + taskList[taskid].toNpcId);
			if ((taskList[taskid].status == TaskStatus.ACCEPTABLE && (taskList[taskid].fromNpcId == this._id || taskList[taskid].toNpcId == this._id)) ||
				(taskList[taskid].status == TaskStatus.DURING && (taskList[taskid].fromNpcId == this._id || taskList[taskid].toNpcId == this._id)) ||
				taskList[taskid].status == TaskStatus.CAN_SUBMIT && (taskList[taskid].fromNpcId == this._id || taskList[taskid].toNpcId == this._id)) {
				return taskList[taskid];
			}
		}
		return null;
	}
}