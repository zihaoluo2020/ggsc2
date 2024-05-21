
//=============================================================================
// tetest.js
//=============================================================================

/*:
 * @plugindesc 我的第一个插件
 * @author Nazgul
 *
 * @param centent1
 * @desc 这是第一个测试的插件参数
 * @default hello world
 *
 * @param centent2
 * @desc 这是第二个测试的插件参数
 * @default hello world
 *
 * @param This is centent3
 * @desc 这是第三个名称带空格的测试的插件参数
 * @default hello world
 *
 * @help
 * 
 * 这里是帮助信息
 *
 */
 
var MyParameters = PluginManager.parameters('test');
alert(MyParameters.centent1);
alert(MyParameters.centent2);
alert(MyParameters["This is centent3"])