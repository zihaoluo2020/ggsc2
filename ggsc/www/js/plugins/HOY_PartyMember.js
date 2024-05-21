//==============================================================================
// 【HOY插件】增加战斗队员数量
//==============================================================================
/*:
 * @plugindesc 增加战斗人员数量
 * @作者 HOY
 * @Data : 2016/01/19
 * @Version : 1.0
 *
 * @param Max Battle Members
 * @desc 设置允许参战的最大人数，默认为5人
 * @default 5
 *
 * @param Member Battle Position
 * @desc 改变战斗Y轴位置
 * @default -40
 *
 * @param Party Followers
 * @desc 改变队伍跟随者数量
 * @default 5
 * 
 * @help 增加最大战斗人数，队伍跟随人数及角色战斗位置
 */

 var Imported = Imported || {};
 Imported.HOY_PartyMember = true;
 var HOY = HOY || {};

 HOY.Parameters = PluginManager.parameters('HOY_PartyMember');
 HOY.Param = HOY.Param || {};
 HOY.Param.MaxBattleMembers = Number(HOY.Parameters['Max Battle Members']);
 HOY.Param.MemberBattlePosition = Number(HOY.Parameters['Member Battle Position']);
 HOY.Param.PartyFollowers = Number(HOY.Parameters['Party Followers']);


 (function() {


Game_Party.prototype.maxBattleMembers = function() {
 	return HOY.Param.MaxBattleMembers;
};

Sprite_Actor.prototype.setActorHome = function(index) {
 	this.setHome(600 + index * 32, 280 + index * 48 + HOY.Param.MemberBattlePosition);
};

Game_Followers.prototype.initialize = function() {
    this._visible = $dataSystem.optFollowers;
    this._gathering = false;
    this._data = [];
    var max = HOY.Param.PartyFollowers || $gameParty.maxBattleMembers();
    for (var i = 1; i < max; i++) {
        this._data.push(new Game_Follower(i));
    }
};

})();
//===============================================================================