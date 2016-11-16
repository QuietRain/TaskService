class Task {
	public id: string;             //任务id
	public name: string;           //任务名称
	public desc: string;           //描述
	public status: TaskStatus;     //任务状态
	public fromNpcId: string;      //从谁处得到任务
	public toNpcId: string;        //任务传递给谁
	public constructor(id: string, name: string, desc: string, fromNpcId: string, toNpcId: string) {
		this.id = id;
		this.name = name;
		this.desc = desc;
		this.status = TaskStatus.ACCEPTABLE;
		this.fromNpcId = fromNpcId;
		this.toNpcId = toNpcId;
	}

}