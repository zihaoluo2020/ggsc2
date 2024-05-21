//=============================================================================

// VIPArcher_SkipTitle.js

//=============================================================================

 

/*:

 * @plugindesc ��������Ĭ�ϱ��⣬�����¼���ķ��ر���ͽ�����Ϸʱ�ķ���

 * @author VIPArcher

 *

 * @param Test Only

 * @desc ����Ϊ true ʱ��������ʱ����������Ϊ false ʱ��������

 * @default true

 *

 * @help ������û����Ҫ������ָ�����Ҫ������

 */

 

void function() {

    var parameters = PluginManager.parameters('VIPArcher_SkipTitle');

    var testOnly = parameters['Test Only'] !== 'false';

    if (!testOnly || location.search === '?test') {

        Scene_Title.prototype.start = function() {

            Stage.prototype.initialize.call(this);

            SceneManager.goto(Scene_Map);

        };

    }

}();