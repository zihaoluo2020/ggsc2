// JavaScript source code
/*:
* @plugindesc util函数
* @author 星马豪
* @help
* Util 函数
*/

// 输出调试信息，确保文件加载
console.log("myUtil 已加载");


// 定义全局常量和变量
window.GLOBAL_CONSTANTS = {
    INIT_TITLE: [0,1,1,1,1,2,2,3,3,2], //各个角色初始星级
    TITLE_NAME: ["0","R","SR","SSR","突破","极致","无双"],
    TITLE_CHIP_GIVEN: [0, 60, 45, 30], //重复获取角色，基于初始星级获得碎片
    TITLE_UPGRADE_NEED: [0, 60, 90, 120, 150, 180], //从i升至i+1星需要的碎片
    TITLE_COLORS: {
        1: [135, 206, 235, 128] ,   // 蓝色
        2: [186, 85, 211, 128], // 紫色
        3: [255, 223, 0, 128]  // 金黄色
    }
};

window._initPicId = 100;

window.gainActorChip = function(item, itemNum) {
    
    var actid=Math.ceil((item-100)/2);
    var tit = window.GLOBAL_CONSTANTS.TITLE_NAME;

    //抽到为召唤券
    if (item%2 === 0) {
        item -= 1;
        itemNum = $gameParty.allMembers().contains($gameActors.actor(actid)) ?
        window.GLOBAL_CONSTANTS.TITLE_CHIP_GIVEN[window.GLOBAL_CONSTANTS.INIT_TITLE[actid]] :
        60;
        if($gameParty.allMembers().contains($gameActors.actor(actid))){
            $gameMessage.add($dataActors[actid].name + "已在队伍中 额外转化为碎片");
        }

    }

    
    $gameParty.gainItem($dataItems[item], itemNum);

    //角色若不在队伍中
    if (!($gameParty.allMembers().contains($gameActors.actor(actid)))) {
        if ($gameParty.numItems($dataItems[item]) >= 60) {
            $gameParty.addActor(actid);
            $gameParty.loseItem($dataItems[item], 60);
            // 产生强烈效果
            triggerGambleEffects(item);
            $gameMessage.add("【恭喜 "+ "合成出"
            + $dataActors[actid].name+" "+tit[$gameActors.actor(actid).luk]+" " +
             $dataActors[actid].name+" "+tit[$gameActors.actor(actid).luk] + "加入了队伍】");
        }
    }else {
        // 角色已经在队伍中，检查是否可以升级
        $gameMessage.add("【恭喜 获得"
            + $dataActors[actid].name+"碎片"+itemNum+"个】");
        var actor = $gameActors.actor(actid);
        var currentStarLevel = actor.luk; // 使用幸运属性记录角色的星级
        var currentItemIndex = 99 + actid * 2; // 计算当前角色对应的碎片ID

        if (currentStarLevel < 6 &&
               $gameParty.numItems($dataItems[currentItemIndex]) >= window.GLOBAL_CONSTANTS.TITLE_UPGRADE_NEED[currentStarLevel]) {
            // 碎片数量足够升级到下一星级

            // 产生强烈效果
            triggerChipEffects(currentStarLevel, actid);

            $gameParty.loseItem($dataItems[currentItemIndex], window.GLOBAL_CONSTANTS.TITLE_UPGRADE_NEED[currentStarLevel]);
            actor.addParam(7, 1);

            // console.log("角色" + actid + "升级至" + actor.luk + "星级");
            $gameMessage.add("【恭喜 "+$gameActors.actor(actid).name()+"进阶为"
            + $dataActors[actid].name+" "+tit[$gameActors.actor(actid).luk]+"】");
            $gameActors.actor(actid).setName($dataActors[actid].name+" "+tit[$gameActors.actor(actid).luk])
            
        }
       
    }

}

function interpolateColor(color1, color2, factor) {
    var result = color1.slice();
    for (var i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
}

function getColorForStarLevel(starLevel) {
    var startColor = [75, 0, 130, 128]; // 蓝紫色
    var endColor = [255, 223, 0, 128]; // 金黄色
    var factor = Math.min(1, starLevel / 5); // 1 级到 5 级逐渐过渡
    return interpolateColor(startColor, endColor, factor);
}

function triggerChipEffects(starLevel, actid) {
    // 变色参数
    var color = getColorForStarLevel(starLevel);
    var duration = 1000; // 持续时间，ms

    // 开始变色
    $gameScreen.startTint(color, duration/16.67);
    window.showCardPic(actid, 2, starLevel);


    // 延迟一段时间后恢复正常颜色
    setTimeout(function() {
        var normalColor = [0, 0, 0, 0];
        $gameScreen.startTint(normalColor, 300/16.67);
    }, duration + starLevel * 1000); // 将帧数转换为毫秒（假设每秒60帧）

    // 播放名为 "Victory" 的 ME 文件，根据星级调整音效的音高
    AudioManager.playMe({ name: "Fanfare2", volume: 90, pitch: 180 - starLevel * 20, pan: 0 });

    // 播放动画给玩家角色，根据星级选择不同的动画
    var animationId = 132; // 假设每级使用不同的动画
    $gamePlayer.requestAnimation(animationId);

    // 根据星级调整屏幕抖动效果
    var shakePower = starLevel * 2; // 每级增加 5 的抖动强度
    var shakeSpeed = 2; // 固定的抖动速度
    var shakeDuration = starLevel * 20; // 每级增加 10 帧的抖动持续时间

    // 开始屏幕抖动
    $gameScreen.startShake(shakePower, shakeSpeed, shakeDuration);
}

window.triggerGambleEffects = function (item) {
    var actid=Math.ceil((item-100)/2);
    var title = window.GLOBAL_CONSTANTS.INIT_TITLE[actid];
    var starLevel = title * 2 - 1;

    // 变色参数
    var color = window.GLOBAL_CONSTANTS.TITLE_COLORS[title];
    var duration = 1000; // 持续时间，ms

    // 开始变色
    $gameScreen.startTint(color, duration/16.67);
    //$gameScreen.showPicture(1, actid, 1, 400, 300,200, 200, 255, 0);
    window.showCardPic(actid, 100, starLevel);

    // 延迟一段时间后恢复正常颜色
    setTimeout(function() {
        var normalColor = [0, 0, 0, 0];
        $gameScreen.startTint(normalColor, 300/16.67);
    }, duration + starLevel * 1000 ); // 将帧数转换为毫秒（假设每秒60帧）

    
    // 播放名为 "Victory" 的 ME 文件，根据星级调整音效的音高
    if(title === 2){
        AudioManager.playMe({ name: "Organ", volume: 90, pitch: 150, pan: 0 });
    }if(title === 3){
        AudioManager.playMe({ name: "Fanfare1", volume: 90, pitch: 70, pan: 0 });
        
    }
    

    // 根据星级调整屏幕抖动效果
    var shakePower = starLevel * 2; // 每级增加 5 的抖动强度
    var shakeSpeed = 2; // 固定的抖动速度
    var shakeDuration = starLevel * 20; // 每级增加 10 帧的抖动持续时间

    // 开始屏幕抖动
    $gameScreen.startShake(shakePower, shakeSpeed, shakeDuration);
}


window.showCardPic = function (actid,pictureId,starLevel) {
    // 定义图片ID，文件名和图片位置
    // var pictureId = 1;
    var pictureName = actid; // 图片文件名，不包括扩展名
    var origin = 1; // 0 = Top-Left, 1 = Center

    // 获取屏幕尺寸
    var screenWidth = Graphics.width;
    var screenHeight = Graphics.height;

    // 加载图片以获取图片的原始尺寸
    var bitmap = ImageManager.loadPicture(pictureName);
    bitmap.addLoadListener(function() {
        // 获取图片原始尺寸
        var imageWidth = bitmap.width;
        var imageHeight = bitmap.height;

         // 计算最终缩放比例，使图片长度为屏幕的0.6倍
        var targetScale = (screenHeight * 0.8) / imageHeight * 100;

        // 初始缩放比例（例如：图片一开始比屏幕大两倍）
        var initialScale = targetScale * 15;

        // 计算居中位置
        var x = screenWidth / 2;
        var y = screenHeight / 2;

        // 显示图片，初始不透明度为0（完全透明），初始缩放为initialScale
        $gameScreen.showPicture(pictureId, pictureName, origin, x, y, initialScale, initialScale, 0, 0);

        // 动画效果
        var duration = 30; // 动画持续时间，帧数
        var targetOpacity = 255; // 最终透明度

        // 使用movePicture来实现动画效果
        $gameScreen.movePicture(pictureId, origin, x, y, targetScale, targetScale, targetOpacity, 0, duration);
        
        // 等待动画完成
        setTimeout(function() {
            // 停留3秒
            setTimeout(function() {
                // 向下移动至屏幕外
                var moveDuration = 20; // 向下移动的动画持续时间，帧数
                var finalY = screenHeight + (imageHeight * targetScale / 100) / 2;
                $gameScreen.movePicture(pictureId, origin, x, finalY, targetScale, targetScale, targetOpacity, 0, moveDuration);

                // 移除图片
                setTimeout(function() {
                    $gameScreen.erasePicture(pictureId);
                }, moveDuration * (1000 / 60)); // 转换帧数为毫秒
            }, 1000 * starLevel*2); // 停留3秒
        }, duration * (1000 / 60)); // 等待初始动画完成
    });
}

window.fiveGambles = function(){
    // 创建三个数组来存储 item.id, itemnum 和 actid
    var itemIds = [];
    var itemNums = [];
    var actids = [];
    
    // 随机获得五组 item.id 和 itemnum，并存储到数组中
    for (var i = 0; i < 5; i++) {
        if (RandomItem(3, false) > 0) {
            var itemId = LastRandomItem().id;
            var itemNum = LastRandomItemNum();
            
            itemIds.push(itemId);
            itemNums.push(itemNum);

            // 计算 actid，并存储到 actids 数组中
            var actid = Math.ceil((itemId - 100) / 2);
            actids.push(actid);
        }
    }

    // 确保我们得到了五个有效的 actid
    if (actids.length === 5) {
        window.showCardPicFive(actids).then(function() {
            // 循环五次调用 gainActorChip 使用存储的 item.id 和 itemnum
            for (var j = 0; j < 5; j++) {
                window.gainActorChip(itemIds[j], itemNums[j]);
            }

            // 输出获取到的 actids 数组
            console.log("actids: ", actids);
        });
    } else {
        console.error("未能成功获得五组有效的 item.id 和 itemnum");
    }
}

window.showCardPicFive = function (actids) {
    return new Promise(function(resolve) {
        if (actids.length !== 5) {
            console.error("需要5个actid才能正确显示。");
            return;
        }

        var origin = 0; // 0 = 左上角
        var screenWidth = Graphics.width;
        var screenHeight = Graphics.height;
        var targetWidth = screenWidth/5; // 每张图片的目标宽度为屏幕宽度的1/5
        var y = screenHeight / 2; // 居中显示
        var duration = 120; // 动画持续时间，帧数
        var targetScale = targetWidth / 1500 * 100; // 计算缩放比例
        
        // 计算最大title值及其对应的actid
        var maxTitle = -Infinity;
        var maxTitleActId = null;
        for (var i = 0; i < actids.length; i++) {
            var actid = actids[i];
            var title = window.GLOBAL_CONSTANTS.INIT_TITLE[actid];
            if (title > maxTitle) {
                maxTitle = title;
                maxTitleActId = actid;
            }
        }
            
        // 显示底图，完全居中填满整个屏幕
        var backgroundId = 0; // 底图的 pictureId
        var backgroundName = "卡"; // 底图文件名
        var backgroundScaleX = screenWidth/ 1024 * 100 ; // X方向的缩放比例
        var backgroundScaleY = screenHeight/ 1024 * 100 ; // Y方向的缩放比例
        $gameScreen.showPicture(1, backgroundName, 1, screenWidth / 2, screenHeight / 2, backgroundScaleX, backgroundScaleY, 0, 0);
        $gameScreen.movePicture(1, 1, screenWidth / 2, screenHeight / 2, backgroundScaleX, backgroundScaleY, 255, 0, 60);

        for (var i = 0; i < actids.length; i++) {
            var pictureId = -i + 99; // 每个图片都有一个唯一的pictureId
            var pictureName = actids[i]; // 图片文件名
            var title = window.GLOBAL_CONSTANTS.INIT_TITLE[actids[i]]; 

            // 计算目标位置
            var initialX = - targetWidth ; // 初始位置设为屏幕外
            var targetX = i * targetWidth ; // 目标位置

            // 显示图片，初始不透明度为255（完全不透明），初始缩放为targetScale
            $gameScreen.showPicture(pictureId, pictureName, origin, initialX, y - (2100 * targetScale / 200), targetScale, targetScale, 255, 0);

            // 动画效果：每张图片按顺序依次移动
            setTimeout(function(pictureId, targetX) {
                //return function() {
                    $gameScreen.movePicture(pictureId, origin, targetX, y - (2100 * targetScale / 200), targetScale, targetScale, 255, 0, duration);
                //};
            }(pictureId, targetX), i * duration * (1000 / 60));

            
            if (title >= 2) {
                setTimeout(function(pictureId, targetX, extraScale) {
                    return function() {
                        $gameScreen.movePicture(pictureId, origin, targetX, y - (2100 * extraScale / 200), extraScale, extraScale, 255, 0, 60);
                    };
                }(pictureId, targetX, targetScale * (1.1 + 0.1 * title * 1.5)), (duration) * (1000 / 60)); // 在移动动画完成后执行
            }
        }
        
        // 在所有卡牌动画完成后执行
        setTimeout(function() {
            if(maxTitle >= 2){
                window.triggerGambleEffects(maxTitleActId*2 + 100);
            }
            
        }, duration * (1000 / 60) /2 ); // 在所有卡牌移动完成后停留一段时间再执行


        // 计算停留时间
        var stayDuration = 1000 + maxTitle * 3000; // 停留时间取决于最大title值（单位：毫秒）
        

        // 在所有卡牌动画完成后执行
        setTimeout(function() {
            resolve();
            for (var i = 0; i < actids.length; i++) {
                (function(i) {
                    var pictureId = -i + 99;
                    var targetX = i * targetWidth;
                    var finalY = screenHeight + (2100 * targetScale / 100) / 2; // 向下移出屏幕

                    setTimeout(function() {
                        $gameScreen.movePicture(pictureId, origin, targetX, finalY, targetScale, targetScale, 255, 0, 60); // 向下移动的动画持续时间为60帧
                        setTimeout(function() {
                            $gameScreen.erasePicture(pictureId); // 清除图片
                            $gameScreen.erasePicture(1); // 清除底图
                        }, 60 * (1000 / 60)); // 在向下移动动画完成后执行清除
                    }, i * 100); // 每张图片按顺序依次移动
                })(i);
            }
        }, duration * (1000 / 60) + stayDuration); // 在所有卡牌移动完成后停留一段时间再执行
    });
}


// one time thing
// 重新定义 Game_Actor 的 faceName 和 faceIndex 方法以确保脸部图片被重新加载
window.refreshFace = function(){
    Game_Actor.prototype.faceName = function() {
        var faceName = this.actor().faceName;
        ImageManager.loadFace(faceName);
        return faceName;
    };

    Game_Actor.prototype.faceIndex = function() {
        var faceIndex = this.actor().faceIndex;
        return faceIndex;
    };
}