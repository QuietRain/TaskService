class TaskPanel extends egret.DisplayObjectContainer {

	private textField: egret.TextField;
	private taskname: egret.TextField;
	private wordPanel: egret.Shape;
	priate
	public height = 400;
	public width = 400;

	public _stage: any;
	public constructor( _stage: any) {
		super();
		this._stage = _stage;
		this.wordPanel = new egret.Shape();
        this.wordPanel.graphics.beginFill(0x000000, 0.5);
        this.wordPanel.graphics.drawRect(0, 0, this.width, this.height);
        this.wordPanel.graphics.endFill();
        this.addChild(this.wordPanel);

		this.textField = new egret.TextField();
		this.textField.y = 200;
		this.addChild(this.textField);

		this.taskname = new egret.TextField();
		this.taskname.y = 100;
		this.addChild(this.taskname);

	}

	public onChange(task: Task) {
	//	console.log("DialoguePanel is on change");
		if (task.status == TaskStatus.UNACCEPTABLE) {   //不可接任务

		} else if (task.status == TaskStatus.ACCEPTABLE) { //可接任务
			this.taskname.text = task.name+"(可接受)";
			this.textField.text = task.desc;
		} else if (task.status == TaskStatus.DURING) { //进行中任务 发布任务的Npc
			this.taskname.text = task.name+"(进行中)";
			this.textField.text = task.desc;
		} else if (task.status == TaskStatus.DURING) { //进行中任务 完成任务的Npc
			this.taskname.text = task.name+"(可完成)";
			this.textField.text = task.desc;
		}
		else if (task.status == TaskStatus.CAN_SUBMIT) { //可交任务
			this.taskname.text = task.name+"(可交付)";
			this.textField.text = task.desc;

		} else if (task.status == TaskStatus.SUBMITTED) { //已交任务
			this.taskname.text = task.name+"(已完成)";
			this.textField.text = task.desc;
		}
	}
	
}