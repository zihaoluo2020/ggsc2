/*:
 * @plugindesc Modify $dataStates on game start
 * @help
 * 各个状态的js代码
 */

//template
// add: 
// actionEndState：当角色的行动结束时触发。
// actionStartState：当角色的行动开始时触发。
// battle：当战斗开始时触发（适用于全体）。
// concludeState：当战斗结束时触发。
// confirmState：当选择角色进行行动并确认时触发。
// defeat：当战斗失败时触发（适用于全体）。
// deselectState：当取消选择角色时触发。
// escape：当战斗逃跑时触发（适用于全体）。
// establishState：当战斗初始化时触发（适用于全体）。
// initiateState：当战斗开始时触发（适用于全体）。
// leaveState：当角色离开队伍时触发。
// reactState：当角色受到物理攻击且生命值减少时触发。
// regenerateState：当角色的生命值或魔法值进行再生时触发（如在回合开始或结束时）。
// removeState：当状态从角色身上移除时触发。
// respondState：当角色受到攻击后反应时触发。
// selectState：当选择角色时触发。
// turnEndState：当角色的回合结束时触发。
// turnStartState：当角色的回合开始时触发。
// victory：当战斗胜利时触发（适用于全体）。

// Quick Reference:
//   Action Starts
//   - Attacker: Initiate
//   - Defender: Select
//   Action Connects as a Success Hit, skip if Missed or Evaded
//   - Attacker: Confirm
//   - Defender: React
//   Damage is Applied to the Defender
//   - Defender: Respond
//   - Attacker: Establish
//   These occur regardless if the action is successfully hit.
//   - Defender: Deselect
//   - Attacker: Conclude

var templateState = {
    addState: "",
    actionEndState: "",
    actionStartState: "",
    battle: "",
    concludeState: "",
    confirmState: "",
    defeat: "",
    deselectState: "",
    escape: "",
    establishState: "",
    initiateState: "",
    leaveState: "",
    reactState: "",
    regenerateState: "",
    removeState: "",
    respondState: "",
    selectState: "",
    turnEndState: "",
    turnStartState: "",
    victory: ""
}


// $gameTroop.members()[0].addState(12)
// $gameParty.members()[1].gainTp(20)
// $gameParty.members()[1].addState(34)
// $gameParty.members()[1].gainTp(20)

// $gameTroop.members()[0].addState(12)
// undefined
// $gameParty.members()[0].addState(12)
// undefined
// $gameParty.members()[0]._zhongziList
// $gameTroop.members()[0]._zhongziList

{/* <Custom Action End Effect>
if(origin.luk>=3&&origin.isAlive()){
origin.gainTp(5*user._stockpile);
origin.startAnimation(151);
origin.startDamagePopup();
}  
  
</Custom Action End Effect> */}

var stateFunctions = [
    {
        //寄生种子
        stateId: 31,
        addState: function(){
            // 初始化种子总数和种子列表
            if (target._zhongziSum === undefined) {
                target._zhongziSum = 0;
            }
            target._zhongziSum += 1;
            if (target._zhongziList === undefined) {
                target._zhongziList = [];
            }
            // 记录每次的 origin
            target._zhongziList.push(origin);
            // 更新状态计数器
            target.setStateCounter(stateId, target._zhongziSum);
        },
        confirmState: function(){
            // 所有攻击伤害降低
            var drate = user.luk <= 5 ? 0.05 : Math.min(0.2, 0.05*user._zhongziSum);
            value = Math.floor(value* (1 - drate));
        },
        //被吸死的情况
        removeState: function() {
            target._zhongziSum = undefined;
            target._zhongziList = undefined;
        }
    },
    {
        //焚身
        stateId: 32,
        addState: function(){
            // 设定焚身伤害
            target._fenshendamage = Math.floor(origin.mat * 1.50);

        },
        reactState: function () {
            // Check to see if any physical damage is dealt.
            if (value > 0 && ((user.isEnemy() && target.isActor()) || (user.isActor() && target.isEnemy()))) {
                // 计算魔抗
                var mdfRate = (1 - user.mdf / (user.mdf + 20 + user.level * 2));
                // 计算伤害
                var damage = Math.ceil(target._fenshendamage * mdfRate);

                // 处理护盾
                var barrierPoints = user.barrierPoints();
                if (barrierPoints >= damage) {
                    user.loseBarrier(damage);
                } else {
                    user.loseBarrier(barrierPoints);
                    user.gainHp(barrierPoints - damage);
                }
                // 动画效果
                user.startAnimation(149);

                // 检查攻击者是否死亡
                if (user.isDead()) {
                    user.performCollapse();
                }

                // 额外效果 魅惑
                if (origin.luk >= 5) {
                    if (Math.random() < 0.1) {
                        user.addState(9);
                    }
                    origin.startAnimation(151);
                }
            }
        }
    },
    {
        //铁布衫
        stateId: 33,
        reactState: function(){
            if (target.luk >= 5 && this.isPhysical() && this.isHpEffect() && value > 0) {
                // 物理伤害减免
                value = Math.ceil(value * 0.70);
                target.startAnimation(153);
            }
        }
    },
    {
        //奥利安费
        stateId: 34,
        addState: function () {
            
            if (user.luk >= 1) { user._stateTurns[stateId] = 3; } //
            if (user.luk >= 5) { user._stateTurns[stateId] = 4; } //5阶持续3回合
            user.setStateCounter(stateId, user._stateTurns[stateId]);

            if (user.luk >= 6) { user.addState(12); } //6阶获得免死
            if (user.luk >= 3) { user.gainBarrier(user.mat * 10, 0); } //3阶获得护盾
            
        },
        turnEndState: function () {
            user.addState(27); //禁止换行
            user._stateTurns[stateId] -= 1;
            user.setStateCounter(stateId, user._stateTurns[stateId]);
            // Check if the user is not immune to death nor resistant to it.
            // 检查状态剩余回合数
            if (user._stateTurns[stateId] === 0) {
                // Get the death state for the user.
                var deathState = user.deathStateId();
                if (user.stateRate(deathState) > 0.01 && !user.isStateResist(deathState)) {
                    user.removeState(12);
                    // Play animation on the user.
                    user.startAnimation(65);
                    // Set the user's HP to 0.
                    user.setHp(0);
                    user.removeState(27); //禁止换行移除
                    // Check if the user is dead.
                    if (user.isDead()) {
                        // Make the user collapse.
                        user.performCollapse();
                    }
                }
            }
        }
    },

]

var JiShengZhongziTurnEnd = function (){
    // 获取所有角色（敌方和友方）
    var allBattlers = $gameTroop.aliveMembers().concat($gameParty.aliveMembers());
    // 遍历所有角色
    allBattlers.forEach(function(battler) {
        // 检查角色是否拥有 寄生种子 31
        if (battler.isStateAffected(31)) {
            // 遍历 _zhongziList，处理每个来源的吸血逻辑
            battler._zhongziList.forEach(function(origin) {
                if (origin) {

                    // 计算魔抗
                    var mdfRate = (1 - battler.mdf / (battler.mdf + 20 + battler.level * 2));
                    if (origin.luk >= 6) { mdfRate = 1; } //6阶真实伤害
                    
                    // 计算伤害
                    var damage = Math.ceil(battler.mhp / 8 * mdfRate);
                    
                    // 处理护盾
                    var barrierPoints = battler.barrierPoints();
                    if (barrierPoints >= damage) {
                        battler.loseBarrier(damage);
                    } else {
                        battler.loseBarrier(barrierPoints);
                        battler.gainHp(barrierPoints - damage);// 减少目标角色的 HP
                    }

                    battler.startDamagePopup();

                    if (origin.isAlive()) {
                    origin.gainHp(Math.ceil(damage/2)); // 增加来源角色的 HP
                    origin.startDamagePopup();
                    }

                    battler.startAnimation(165); // 播放吸血动画
                    origin.startAnimation(41); // 播放回血动画

                    // 检查被吸是否死亡
                    if (battler.isDead()) {
                        battler._zhongziSum = undefined;
                        battler._zhongziList = undefined;
                        battler.performCollapse();
                    }
                }
            });
        }
    });
}


StatesJS = {
    StatesFuncs: {},
    JiShengZhongziTurnEnd: JiShengZhongziTurnEnd,
};

//stringify函数
function stringifyFunctionBody(fn) {
    var fnString = fn.toString();
    var bodyMatch = fnString.match(/function\s*[^{]*{([\s\S]*)}/);
    if (bodyMatch && bodyMatch.length > 1) {
        return bodyMatch[1].trim();
    }
    return '';
}

// 将状态函数按 stateId 存储到 StatesJS.StatesFuncs 中
stateFunctions.forEach(function(stateFunction) {
    var stateId = stateFunction.stateId;
    StatesJS.StatesFuncs[stateId] = {};

    Object.keys(stateFunction).forEach(function(key) {
        if (key !== 'stateId' && typeof stateFunction[key] === 'function') {
            StatesJS.StatesFuncs[stateId][key] = stringifyFunctionBody(stateFunction[key]);
        }
    });
});

//console.log(StatesJS);