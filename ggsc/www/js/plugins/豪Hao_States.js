/*:
 * @plugindesc Modify $dataStates on game start
 * @help
 * 在数据库加载完成后更新 技能状态效果
 */


(function() {
    

    // 在 Scene_Boot 的 start 方法中修改 $dataStates
    var _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);
        // 确保数据已经加载完毕
        if ($dataStates) {
            for (var stateId in StatesJS.StatesFuncs) {
                if ($dataStates[stateId]) {
                    var stateFuncs = StatesJS.StatesFuncs[stateId];
                    var customEffectEval = {};

                    for (var funcName in stateFuncs) {
                        customEffectEval[funcName] = stateFuncs[funcName];
                    }

                    $dataStates[stateId].customEffectEval = customEffectEval;
                    console.log(`$dataStates[${stateId}] has been modified.`);
                } else {
                    console.error(`Failed to modify $dataStates[${stateId}]. State not found.`);
                }
            }
        } else {
            console.error("Failed to modify $dataStates. Data not loaded.");
        }
    };
})();
