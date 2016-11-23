class NPC extends egret.DisplayObjectContainer implements Observer {
	private _emoji: egret.Bitmap = new egret.Bitmap();
	private _accept_mark: egret.Bitmap = new egret.Bitmap();
	private _unfinish_mark: egret.Bitmap = new egret.Bitmap();
	private _finish_mark: egret.Bitmap = new egret.Bitmap();
	private dialoguePanel: DialoguePanel;
	public _id: String;                  //NPC的id
	private _stage: any;
	private MARK_Y = -80;
	//private taskList: Task[] = [];      //
	public constructor(NpcId: string, emoji: string, accept_mark: string, unfinish_mark: string, finish_mark: string, _stage: any,
		dialoguePanel: DialoguePanel) {
		super();
		this._emoji
		this._emoji.texture = RES.getRes(emoji);
		this._accept_mark.texture = RES.getRes(accept_mark);
		this._unfinish_mark.texture = RES.getRes(unfinish_mark);
		this._finish_mark.texture = RES.getRes(finish_mark);
		this._id = NpcId;
		this._stage = _stage
		this.dialoguePanel = dialoguePanel;

		this._emoji.touchEnabled = false;
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
			console.log("Npc is click");
			this.onNPCClick();
		}, this);
	}

	private onNPCClick() {
		var task = TaskService.taskService.getTaskbyCustomRole(this._rule);

		if (task == null) {
			task = SceneService.sceneService.getTaskbyCustomRole(this._rule);
			if (task == null) {
				console.log("没有任务");
			}
		}
		this._stage.addChild(this.dialoguePanel);
		this.dialoguePanel.onChange(task);
		this.dialoguePanel.setTaskFiled(task.desc);
		this.onChange(task);
	}

	public onChange(task: Task) {
		console.log(this._id + " is on Change!!");
		if (task.status == TaskStatus.UNACCEPTABLE) {   //不可接任务
			this._accept_mark.alpha = 0;
			this._unfinish_mark.alpha = 0;
			this._finish_mark.alpha = 0;

			return 0;
		} else if (task.status == TaskStatus.ACCEPTABLE && task.condition.fromNpcId == this._id) { //可接任务
			console.log("可接任务")
			this._accept_mark.alpha = 1;
			this._unfinish_mark.alpha = 0;
			this._finish_mark.alpha = 0;
			this._emoji.touchEnabled = true;
			return 1;
		} else if (task.status == TaskStatus.DURING && task.condition.toNpcId == this._id) { //进行中任务 现npc
			console.log("进行中 现Npc");
			this._accept_mark.alpha = 0;
			this._unfinish_mark.alpha = 1;
			this._finish_mark.alpha = 0;
			this._emoji.touchEnabled = true;
			return 0;
		} else if (task.status == TaskStatus.DURING && task.condition.fromNpcId == this._id) { //进行中任务 原npc
			console.log("进行中任务 原npc")
			this._accept_mark.alpha = 0;
			this._unfinish_mark.alpha = 0;
			this._finish_mark.alpha = 0;
			if (task.condition.fromNpcId != task.condition.toNpcId) {
				this._emoji.touchEnabled = false;
			}
			return 1;
		} else if (task.status == TaskStatus.CAN_SUBMIT && task.condition.toNpcId == this._id) { //可交任务
			this._accept_mark.alpha = 0;
			this._unfinish_mark.alpha = 0;
			this._finish_mark.alpha = 1;
			this._emoji.touchEnabled = true;

			return 1;
		} else if (task.status == TaskStatus.SUBMITTED) { //已交任务
			this._accept_mark.alpha = 0;
			this._unfinish_mark.alpha = 0;
			this._finish_mark.alpha = 0;
			this._emoji.touchEnabled = false;
			return 1;
		}
	}

	public _rule = (taskList): Task => {
		for (let taskid in taskList) {

			if ((taskList[taskid].status == TaskStatus.ACCEPTABLE && (taskList[taskid].condition.fromNpcId == this._id || taskList[taskid].condition.toNpcId == this._id)) ||
				(taskList[taskid].status == TaskStatus.DURING && (taskList[taskid].condition.fromNpcId == this._id || taskList[taskid].condition.toNpcId == this._id)) ||
				taskList[taskid].status == TaskStatus.CAN_SUBMIT && (taskList[taskid].condition.fromNpcId == this._id || taskList[taskid].condition.toNpcId == this._id)) {
				return taskList[taskid];
			}
		}
		return null;
	}
}