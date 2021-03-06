//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    p.createGameScene = function () {
        var background = this.createBitmapByName("map_jpg");
        this.addChild(background);
        var taskservice = new TaskService();
        var sceneservice = new SceneService();
        var npc0dialoguePanel = new DialoguePanel("npc_0", this);
        var npc1dialoguePanel = new DialoguePanel("npc_1", this);
        npc0dialoguePanel.x = (this.width - npc0dialoguePanel.width) / 2;
        npc0dialoguePanel.y = (this.height - npc0dialoguePanel.height) / 2;
        npc1dialoguePanel.x = (this.width - npc0dialoguePanel.width) / 2;
        npc1dialoguePanel.y = (this.height - npc0dialoguePanel.height) / 2;
        //      this.addChild(npc0dialoguePanel);
        //      this.addChild(npc1dialoguePanel);
        var Npc0 = new NPC("npc_0", "Npc1_png", "tanhao_png", "wenhao2_png", "wenhao_png", this, npc0dialoguePanel);
        this.addChild(Npc0);
        Npc0.x = 100;
        Npc0.y = 100;
        var Npc1 = new NPC("npc_1", "Npc2_png", "tanhao_png", "wenhao2_png", "wenhao_png", this, npc1dialoguePanel);
        this.addChild(Npc1);
        Npc1.x = 500;
        Npc1.y = 100;
        var npcTalkCondition = new NPCTalkCondition();
        var killMonsterTaskCondition = new KillMonsterTaskCondition(sceneservice);
        var task1 = new Task("task1", "新手教程", "与另一个NPC见面", "npc_0", "npc_1", 1, npcTalkCondition, 0, taskservice);
        var task2 = new Task("task2", "杀敌", "击杀10个敌人", "npc_1", "npc_1", 10, killMonsterTaskCondition, 1, sceneservice);
        task1.status = TaskStatus.ACCEPTABLE;
        var taskPanel = new TaskPanel(this);
        this.addChild(taskPanel);
        taskPanel.x = this.width - 400;
        taskPanel.y = (this.height - npc0dialoguePanel.height) / 2;
        taskservice.addObserver(Npc0);
        taskservice.addObserver(Npc1);
        taskservice.addObserver(taskPanel);
        sceneservice.addObserver(Npc1);
        sceneservice.addObserver(taskPanel);
        sceneservice.addObserver(killMonsterTaskCondition);
        taskservice.addTask(task1);
        sceneservice.addTask(task2);
        // var task = taskservice.getTaskbyCustomRole(Npc0.rule);
        var Monster = this.createBitmapByName("_monster_png");
        this.addChild(Monster);
        var MonsterButton = new MockKillMonstorButton(Monster, sceneservice, 1);
        this.addChild(MonsterButton);
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map