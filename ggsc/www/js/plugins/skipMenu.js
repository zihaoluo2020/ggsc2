// JavaScript source code
/*:
* @plugindesc 简洁战斗
* @author 靖康
* @help
* 将分布式的战斗窗口整合成一个，战斗直接打开技能窗口
* 攻击、防御和逃跑命令需要额外加在技能里。目前没办法使用道具，除非想办法把道具加入技能
* 技能类型被妥协了，也就是只能使用1号技能类型了，切换技能类型不会做
*
* 垃圾小白代码，几乎没有兼容性
*/



Scene_Battle.prototype.changeInputWindow = function() {
    if (BattleManager.isInputting()) {
        if (!BattleManager.actor()) {BattleManager.selectNextCommand();}
        this.refreshStatus();
        this._statusWindow.deselect();
        this._statusWindow.open();//取消队伍命令，把它额外做了的工作搬出来
        
        if(BattleManager.actor()){
            this._statusWindow.select(BattleManager.actor().index());//选定将要行动的角色
            this._skillWindow.setStypeId(2);//不知道怎么读取角色技能类型，直接设为1
            this.commandSkill();//选中技能时的回调
        }
        
        //this.startActorCommandSelection();
        /* if (BattleManager.actor()) {
            this.startActorCommandSelection();
        } else {
            this.startPartyCommandSelection();
        }*/
    } else {
        this.endCommandSelection();
    }
};

Scene_Battle.prototype.commandSkill = function() {
    this._skillWindow.setActor(BattleManager.actor());
    //this._skillWindow.setStypeId(this._actorCommandWindow.currentExt());//移到外面做，其实并没有什么意义
    this._skillWindow.refresh();
    this._skillWindow.show();
    this._skillWindow.activate();
};

Scene_Battle.prototype.onSkillCancel = function() { //取消你的取消
   
   
    this._skillWindow.hide();
    this._skillWindow.deactivate();
    BattleManager.selectPreviousCommand();

    if (BattleManager.actor()) {
        this.refreshStatus();
        this._statusWindow.deselect();
        this._statusWindow.open();
        this._statusWindow.select(BattleManager.actor().index());
        this.commandSkill();
    } else {
        

        BattleManager._bypassMoveToStartLocation = true;
        $gameParty.loadActorImages();
        this.prepareBackground();
        BattleManager._savedActor = BattleManager.actor();
        $gameSystem.setBattleRowCooldown();
        Yanfly.Row.SavedBattleBgm = AudioManager.saveBgm();
        Yanfly.Row.SavedBattleBgs = AudioManager.saveBgs();
        $gameTemp.storeBattleSpriteset();
        SceneManager.push(Scene_Row);
        BattleManager._phase = 'input';
        $gameTemp._rowBattle = true;


        // 如果没有上一个队友，可以选择重新激活命令窗口，或者其他处理方式
        // this._actorCommandWindow.activate();
        // 或者显示某种提示信息
    }

};

