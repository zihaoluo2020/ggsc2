/*:
* @plugindesc ����ʹ�õĽű�
* @author ѩ��ȼ
*
* @param isNotTitle
* @desc �Ƿ����������⻭�湦��(on/off)
* @default on
*
* @help ���õĽű�������һ���ڳ����ﻭ���ƶ�λ�õķ������Լ�һ����������
* ����Ľű�
*/
var jsTool = {};
(function () {
    var parameters = PluginManager.parameters('jsTool');
    var isNotTitle = String(parameters['isNotTitle'] || 'on');
    var color = "";
    function randColor() {
        var num = ~~(Math.random()*90+10);
        var num2 = ~~(Math.random()*90+10);
        var num3 = ~~(Math.random()*90+10);
        return "#"+num+num2+num3;
    }
    jsTool.dragX = function (x) {
        color = randColor();
        var sprite = new Sprite(new Bitmap(2, Graphics.boxHeight));
        sprite.bitmap.fillAll(color);
        sprite.x = x;
        SceneManager._scene._windowLayer.addChild(sprite);
    }
    jsTool.dragY = function (y) {
        var sprite = new Sprite(new Bitmap(Graphics.boxWidth, 2));
        sprite.bitmap.fillAll(color);
        sprite.y = y;
        SceneManager._scene._windowLayer.addChild(sprite);
    }
    jsTool.msg = function (msg) {
        console.log(msg);
    }
    var _old_sceneBoot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        if (isNotTitle == 'on') {
            DataManager.setupNewGame();
            SceneManager.goto(Scene_Map);
        } else {
            _old.call(this);
        }
    }
})();