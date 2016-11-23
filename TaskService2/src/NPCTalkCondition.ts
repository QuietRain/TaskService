class NPCTalkCondition extends TaskCondition{
	constructor(){
		super();
	}
	public onAccept(task: TaskConditionContext) {
		if (task.getcurrent() == currentStatus.NOTCONTINUABLE) {
			task.setcurrent(currentStatus.CONTINUABLE);
		}
		task.setcurrent(task.getcurrent() + 1);
	}

	public onSubmit(task:TaskConditionContext){
		task.setcurrent(currentStatus.FINISH);
	}

}