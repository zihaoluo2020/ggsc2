//=============================================================================
// DevToolsManage.js
// ----------------------------------------------------------------------------
// (C)2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 2.10.2 2021/04/10 タイトルカット設定時にCTRLキーを押し続けているとカットしなくなる機能が不完全だったので無効化
// 2.10.1 2019/05/26 高速化有効時にメッセージ強制スキップのみを無効化する設定を追加しました。
// 2.9.1 2019/05/19 DynamicDatabase.jsと併用したとき、データベースリロード機能を使うと動的データベースの内容が初期化される競合を解消
// 2.9.0 2019/04/01 テストプレー時のみ、特定の日付もしくは設定した誕生日になるとタイトル画面に専用メッセージが流れる機能を追加
// 2.8.1 2019/02/10 プラグイン等で画面サイズを変え、かつメニューバーを有効にしているとウィンドウサイズがおかしくなる問題を修正
// 2.8.0 2019/01/06 MakeScreenMovie.jsを有効にしていると録画用のツールバーが表示される機能を追加
// 2.7.0 2018/12/09 マップリロード機能で再読込したときに一時消去されたイベントが再表示されないよう仕様変更
// 2.6.0 2018/10/08 戦闘強制敗北、戦闘強制中断の機能を追加
// 2.5.1 2018/03/25 BGMが演奏されていないときに高速モードを切り替えるとエラーになる問題を修正
// 2.5.0 2018/03/17 最前面に表示しているとき、画面がフォーカスを失うと画面自動で右寄せになる機能を追加
//                  最新のNW.jsで使用できなくなる一部機能を削除
// 2.4.5 2018/03/06 各種ファンクションキーにCtrlおよびAltの同時押し要否の設定を追加しました。
// 2.4.4 2018/03/03 ブレークポイントから再開したときにキー入力が押しっぱなし扱いになってしまう場合があるMVの仕様を考慮。
// 2.4.3 2018/02/18 2.4.1の機能に加えて他のエディタから起動したとき全般で戦闘テストができるようにしました。
// 2.4.2 2018/02/18 ヘルプの記述を追加
// 2.4.1 2018/02/18 ブラウザ起動時に戦闘テストができる機能を追加しました。オプションのbtestは利用者が付与してください。
// 2.4.0 2018/02/15 ブラウザ起動時もテストプレーと判断した場合は一部の機能が使えるようにしました。
// 2.3.4 2017/12/02 リファクタリング
// 2.3.2 2017/11/23 Fix missing menu bar height at SceneManager.setWindowSizeForMenuBar
// 2.3.1 2017/11/11 画面キャプチャ管理プラグインとの連携による修正
// 2.3.0 2017/09/25 競合対策でマップとデータのリロード機能を無効にする設定を追加
//                  最新のNW.jsかつメニューバーを表示しない場合にエラーになる問題を修正
// 2.2.2 2017/09/25 ヘルプに注意事項を追記
// 2.2.1 2017/09/01 スクリプトエラー発生時に警告を出力する機能を追加
// 2.2.0 2017/08/09 パラメータ型指定機能に対応。一部パラメータは再設定が必要です。
//                  起動時に自動で最前面に表示するパラメータを追加。
//                  NW.jsを最新化したときに発生するエラーに対処（ただし一部機能は使用できません）
// 2.1.1 2017/03/10 コミュニティ版でロード時にエンジン名称を出力するよう修正。
// 2.1.0 2016/12/25 スローモーション機能を追加しました。一時的にゲーム速度を最低1/60倍速まで低下できます。
// 2.0.0 2016/12/16 ES2015向けにリファクタリングしました。
//                  JSON形式でのセーブ＆ロードに対応しました。
//                  ゲーム画面にフォーカスを戻した際に、マップとデータベースの再読込を自動で行うようにしました。
//                  「最前面に表示」機能をゲーム中に切り替えられるようにしました。
//                  一部、余分な機能を無効化しました。
// 1.5.1 2016/08/14 コアスクリプトのバージョンを出力するようにしました。
// 1.5.0 2016/06/25 スクリプトの常駐実行機能を追加
// 1.4.2 2016/06/14 SceneManager.initializeでエラーが発生した際にエラー内容を確認できない問題を修正
// 1.4.1 2016/06/14 YEP_CoreEngine.jsと併用したときにウィンドウ高さ補正が効かなくなる問題を修正
// 1.4.0 2016/06/03 メニューバーからデバッグ用のコマンドを実行できる機能を追加
//                  ゲーム画面の更新を停止し、一時的にフリーズする機能を追加
//                  セーブデータのエンコード・デコード機能を追加
// 1.3.0 2016/05/04 スクリプトのその場実行機能を追加
//                  モバイル偽装機能を追加
//                  コードのリファクタリング
// 1.2.2 2016/03/19 ゲームのスピード高速化を8倍速まで対応
// 1.2.1 2016/02/27 タイトルカットしたときにイベントテスト、戦闘テストが正しく開始されない不具合を修正
// 1.2.0 2016/02/24 ゲームのスピードを高速(2倍速)化する機能を追加
//                  戦闘を勝利扱いで即終了する機能を追加
// 1.1.0 2016/01/11 ゲーム開始時にFPS表示（FPS表示/MS表示に対応）を有効にする機能を追加
//                  タイトル画面を飛ばして最新のセーブファイルをロードする機能を追加
// 1.0.2 2016/01/02 繰り返しリセットすると警告が出る問題の解消
//                  ゲームウィンドウを端に寄せる機能(笑)を追加
// 1.0.1 2015/12/19 F12キーでリセットする機能を追加（F5と同様の動作）
// 1.0.0 2015/12/12 初版
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:ja
 * @plugindesc Developer tools management plugin
 * @author triacontane
 *
 * @param StartupDevTool
 * @desc It will start the developer tools at the start of the game.
 * @default true
 * @type boolean
 *
 * @param FuncKeyReload
 * @desc 画面のリロードを行うキーです(F1～F12)。デフォルトF5キーと同様の役割を持ちます。
 * @default F12
 * @option none
 * @option F1
 * @option F2
 * @option F3
 * @option F4
 * @option F5
 * @option F6
 * @option F7
 * @option F8
 * @option F9
 * @option F10
 * @option F11
 * @option F12
 *
 * @param FuncKeyOnTop
 * @desc ゲーム画面を最前面に表示するキーです。(F1～F12)。
 * @default
 * @option none
 * @option F1
 * @option F2
 * @option F3
 * @option F4
 * @option F5
 * @option F6
 * @option F7
 * @option F8
 * @option F9
 * @option F10
 * @option F11
 * @option F12
 *
 * @param FuncKeyRapidGame
 * @desc ゲームを高速化するキーです。(F1～F12)。
 * @default F10
 * @option none
 * @option F1
 * @option F2
 * @option F3
 * @option F4
 * @option F5
 * @option F6
 * @option F7
 * @option F8
 * @option F9
 * @option F10
 * @option F11
 * @option F12
 *
 * @param FuncKeyForceVictory
 * @desc 戦闘を勝利扱いで強制終了するキーです。(F1～F12)。
 * @default
 * @type select
 * @option none
 * @option F1
 * @option F2
 * @option F3
 * @option F4
 * @option F5
 * @option F6
 * @option F7
 * @option F8
 * @option F9
 * @option F10
 * @option F11
 * @option F12
 *
 * @param FuncKeyForceDefeat
 * @desc 戦闘を敗北扱いで強制終了するキーです。(F1～F12)。
 * @default
 * @type select
 * @option none
 * @option F1
 * @option F2
 * @option F3
 * @option F4
 * @option F5
 * @option F6
 * @option F7
 * @option F8
 * @option F9
 * @option F10
 * @option F11
 * @option F12
 *
 * @param FuncKeyForceAbort
 * @desc 戦闘を中断扱いで強制終了するキーです。(F1～F12)。
 * @default
 * @type select
 * @option none
 * @option F1
 * @option F2
 * @option F3
 * @option F4
 * @option F5
 * @option F6
 * @option F7
 * @option F8
 * @option F9
 * @option F10
 * @option F11
 * @option F12
 *
 * @param FuncKeyScript
 * @desc スクリプト実行用のウィンドウをポップアップするキーです。(F1～F12)。
 * @default F6
 * @option none
 * @option F1
 * @option F2
 * @option F3
 * @option F4
 * @option F5
 * @option F6
 * @option F7
 * @option F8
 * @option F9
 * @option F10
 * @option F11
 * @option F12
 *
 * @param FuncKeyFreeze
 * @desc 画面の更新を一時停止するキーです。(F1～F12)。
 * @default
 * @option none
 * @option F1
 * @option F2
 * @option F3
 * @option F4
 * @option F5
 * @option F6
 * @option F7
 * @option F8
 * @option F9
 * @option F10
 * @option F11
 * @option F12
 *
 * @param SimultaneousCtrl
 * @desc 各機能を利用する際にCtrlキーの同時押しが必要かどうかです。他のプラグインと対象キーが競合する場合に利用します。
 * @default false
 * @type boolean
 *
 * @param SimultaneousAlt
 * @desc 各機能を利用する際にAltキーの同時押しが必要かどうかです。他のプラグインと対象キーが競合する場合に利用します。
 * @default false
 * @type boolean
 *
 * @param ShowFPS
 * @desc 初期状態で画面左上にFPSもしくはMSを表示します（FPS/MS/OFF）。
 * @default OFF
 * @type select
 * @option FPS
 * @option MS
 * @option OFF
 *
 * @param CutTitle
 * @desc タイトル画面をとばして最新のセーブファイルをロードします。
 * @default false
 * @type boolean
 *
 * @param RapidStart
 * @desc 高速化された状態でゲームを開始します。（ON/OFF）
 * @default false
 * @type boolean
 *
 * @param RapidSpeed
 * @desc 高速化を実行した際のスピード倍率です。
 * @default 2
 * @type number
 * @min -60
 * @max 16
 *
 * @param InvalidMessageSkip
 * @desc 高速化された状態でのメッセージ強制スキップを無効にします。
 * @default false
 * @type boolean
 *
 * @param FakeMobile
 * @desc モバイル実行を偽装します。(ON/OFF)
 * モバイル版で異なるUIを使用する場合の表示確認ができます。
 * @default false
 * @type boolean
 *
 * @param MenuBarVisible
 * @desc メニューバーを表示し各種デバッグコマンドを実行できます。(ON/OFF)
 * @default true
 * @type boolean
 *
 * @param ClickMenu
 * @desc クリックメニューから各種デバッグコマンドを実行できます。(-1:無効 0:左 1:ホイール 2:右)
 * @default 1
 * @type select
 * @option 無効
 * @value -1
 * @option 左
 * @value 0
 * @option ホイール
 * @value 1
 * @option 右
 * @value 2
 *
 * @param JsonSave
 * @desc JSON形式でセーブ＆ロードできます。テキストエディタ等でセーブファイルを自由に編集できるようになります。
 * @default false
 * @type boolean
 *
 * @param OutputStartupInfo
 * @desc 起動時に様々な情報をログ出力します。
 * @default true
 * @type boolean
 *
 * @param StartupOnTop
 * @desc 起動時にゲーム画面が最前面に固定されます。
 * @default false
 * @type boolean
 *
 * @param UseReloadData
 * @desc オンフォーカスでマップとデータを再読込します。競合等で動作に問題がある場合は無効にしてください。
 * @default true
 * @type boolean
 *
 * @param ShiftRightOnBlur
 * @desc ゲーム画面が最前面に表示されているときにフォーカスを失うと、指定した座標分画面を右寄せします。
 * @default 640
 * @type number
 *
 * @param GreetingHide
 * @desc タイトル画面の挨拶メッセージを非表示にします。
 * @default false
 * @type boolean
 *
 * @param BirthdayMonth
 * @desc 誕生日を入力しておくと当日にタイトル画面にメッセージが表示されます。
 * @default 0
 * @type number
 * @min 0
 * @max 12
 *
 * @param BirthdayDate
 * @desc 誕生日を入力しておくと当日にタイトル画面にメッセージが表示されます。
 * @default 0
 * @type number
 * @min 0
 * @max 31
 *
 * @help デベロッパツールの挙動を調整する制作支援プラグインです。
 * このプラグインはローカル環境でのテストプレー時のみ有効となります。
 * また、UserAgentやコアスクリプトのバージョン等役立つ情報をログに出力します。
 * 快適な開発支援のために以下の機能を提供します。
 *
 * 1. ゲーム開始時にデベロッパツールが自動で立ち上がります。(通常はF8で起動)
 *    OFFにしていた場合でもエラーが発生すると自動で立ち上がります。
 *
 * 2. ゲーム画面を常に最前面に表示してくれます。画面を見ながら作業をする場合に
 *    便利です。ゲーム中にメニューバーから切り替えできます。
 *
 * 3. マップやイベントを修正して再保存すると、ゲーム画面にフォーカスを戻した
 *    瞬間にマップとデータベースを自動でリロードしてくれます。
 *
 * 4. タイトル画面を飛ばして最新のセーブファイルをロードできます。
 *
 * 5. マップ上でのゲームのスピードを高速化(16倍速まで)できます。
 *    (マップ上で高速、フェードアウト、メッセージ表示の高速スキップ)
 *    逆に低速化(1/60倍速まで)することもできます。速度倍率に負の値を設定して
 *    ください。ゲームスピードが変化した場合は、BGMのピッチが変化します。
 *
 * 6. 強制的に敵を全滅させて勝利することができます。報酬も取得できます。
 *    強制敗北、強制中断も可能です。
 *
 * 7. 任意のスクリプトを毎フレーム実行させることができます。
 *    スクリプトの戻り値が変化したときのみ結果をコンソールに出力します。
 *
 * 8. ゲーム画面の更新を一時的に止めて画面をフリーズさせることができます。
 *
 * 9. セーブデータを保存する際にエンコーディングせずjson形式のまま
 *    セーブ・ロードできます。
 *
 * このプラグインにはプラグインコマンドはありません。
 *
 * 画面キャプチャ管理プラグインと連携すると画面キャプチャ用の
 * メニューバーが表示されます。
 * https://raw.githubusercontent.com/triacontane/RPGMakerMV/master/MakeScreenCapture.js
 *
 * ・高度な設定
 * ブラウザ起動時でも当プラグインのデバッグ機能を有効にしたい場合は、
 * 起動URLのオプションに「test」もしくは「best」を付与してください。
 * ただしNW.js由来のいくつかの機能は無効になります。
 *
 * 通常、ブラウザなど外部からゲーム起動の場合、戦闘テストは実行できませんが、
 * 当プラグインを有効にしていると戦闘テストが可能です。
 *
 * 外部エディタから起動する場合、以下の起動パラメータが指定可能です。
 * この指定はプラグインパラメータより優先されます。
 * devToolOff : デベロッパツールが起動しなくなります。
 * onTop : 最前面に画面を表示します。
 *
 * This plugin is released under the MIT License.
 */

/*:
 * @plugindesc 开发人员工具管理插件
 * @author トリアコンタン
 *
 * @param 開始時に起動
 * @text 开始时启动
 * @desc 游戏开始时同时启动开发人员工具。
 * @default true
 * @type boolean
 *
 * @param リロードキー
 * @text 重新加载键
 * @desc 进行画面重新加载的键(F1～F12)。其作用与默认F5键相同。
 * 这是为了与以前作者的插件向后兼容的功能。
 * @default F12
 * @type select
 * @option none
 * @option F1
 * @option F2
 * @option F3
 * @option F4
 * @option F5
 * @option F6
 * @option F7
 * @option F8
 * @option F9
 * @option F10
 * @option F11
 * @option F12
 *
 * @param 最前面に表示キー
 * @text 在最前面的显示键
 * @desc 切换游戏画面最前面显示的按键。(F1～F12)。
 * @default F11
 * @type select
 * @option none
 * @option F1
 * @option F2
 * @option F3
 * @option F4
 * @option F5
 * @option F6
 * @option F7
 * @option F8
 * @option F9
 * @option F10
 * @option F11
 * @option F12
 *
 * @param 高速化切替キー
 * @text 高速化切换键
 * @desc 是切换游戏高速化的按键。(F1～F12)。
 * @default
 * @type select
 * @option none
 * @option F1
 * @option F2
 * @option F3
 * @option F4
 * @option F5
 * @option F6
 * @option F7
 * @option F8
 * @option F9
 * @option F10
 * @option F11
 * @option F12
 *
 * @param 強制戦闘勝利キー
 * @text 强制战斗胜利键
 * @desc 这是强制战斗胜利的按键。(F1～F12)。
 * @default
 * @type select
 * @option none
 * @option F1
 * @option F2
 * @option F3
 * @option F4
 * @option F5
 * @option F6
 * @option F7
 * @option F8
 * @option F9
 * @option F10
 * @option F11
 * @option F12
 *
 * @param 強制戦闘敗北キー
 * @text 强制战斗失败键
 * @desc 这是强制战斗失败的按键。(F1～F12)。
 * @default
 * @type select
 * @option none
 * @option F1
 * @option F2
 * @option F3
 * @option F4
 * @option F5
 * @option F6
 * @option F7
 * @option F8
 * @option F9
 * @option F10
 * @option F11
 * @option F12
 *
 * @param 強制戦闘中断キー
 * @text 强制战斗中断键
 * @desc 这是强制战斗中断的按键。(F1～F12)。
 * @default
 * @type select
 * @option none
 * @option F1
 * @option F2
 * @option F3
 * @option F4
 * @option F5
 * @option F6
 * @option F7
 * @option F8
 * @option F9
 * @option F10
 * @option F11
 * @option F12
 *
 * @param スクリプト実行キー
 * @text 脚本执行键
 * @desc 脚本驻留执行的键。(F1～F12)。
 * @default
 * @type select
 * @option none
 * @option F1
 * @option F2
 * @option F3
 * @option F4
 * @option F5
 * @option F6
 * @option F7
 * @option F8
 * @option F9
 * @option F10
 * @option F11
 * @option F12
 *
 * @param フリーズキー
 * @text 暂停键
 * @desc 暂停画面刷新的键。(F1～F12)。
 * @default F10
 * @type select
 * @option none
 * @option F1
 * @option F2
 * @option F3
 * @option F4
 * @option F5
 * @option F6
 * @option F7
 * @option F8
 * @option F9
 * @option F10
 * @option F11
 * @option F12
 *
 * @param Ctrl同時押し
 * @text 同时按Ctrl
 * @desc 使用各功能时是否需要同时按下Ctrl键。当目标键与其他插件冲突时使用它。
 * @default false
 * @type boolean
 *
 * @param Alt同時押し
 * @text 同时按Alt
 * @desc 使用各功能时是否需要同时按下Alt键。当目标键与其他插件冲突时使用它。
 * @default false
 * @type boolean
 *
 * @param FPS表示
 * @text FPS显示
 * @desc 初始状态下在画面左上方显示FPS。（FPS/MS/OFF）
 * @default OFF
 * @type select
 * @option FPS
 * @option MS
 * @option OFF
 *
 * @param タイトルカット
 * @text 跳过标题
 * @desc 跳过标题画面，加载最新的保存文件。
 * @default false
 * @type boolean
 *
 * @param 高速開始
 * @text 开启高速化
 * @desc 在高速化的状态下开始游戏。（ON/OFF）
 * @default false
 * @type boolean
 *
 * @param 高速スピード
 * @text 高速化速率
 * @desc 执行高速化时的速度倍率。(-60...16)
 * 如果设置为负值，则会显示慢动作。
 * @default 2
 * @type number
 * @min -60
 * @max 16
 *
 * @param メッセージスキップ無効
 * @text 信息跳过无效
 * @desc 禁用高速化状态下的信息强制跳过。
 * @default false
 * @type boolean
 *
 * @param モバイル偽装
 * @text 模拟移动端
 * @desc 模拟移动端运行。(ON/OFF)
 * 可以在移动端中使用其他UI时检查显示。
 * @default false
 * @type boolean
 *
 * @param メニューバー表示
 * @text 菜单栏显示
 * @desc 显示菜单栏，可以执行各种调试命令。(ON/OFF)
 * @default true
 * @type boolean
 *
 * @param クリックメニュー
 * @text 点击菜单
 * @desc 可以从单击菜单中执行各种调试命令。(-1:无效 0:左 1:滚轮 2:右)
 * @default 1
 * @type select
 * @option 无效
 * @value -1
 * @option 左
 * @value 0
 * @option 滚轮
 * @value 1
 * @option 右
 * @value 2
 *
 * @param JSON形式セーブ
 * @text JSON格式保存
 * @desc 可以用JSON格式保存和加载。可以用文本编辑器等自由编辑保存文件。
 * @default false
 * @type boolean
 *
 * @param 起動時情報出力
 * @text 启动时信息输出
 * @desc 启动时日志输出各种信息。
 * @default true
 * @type boolean
 *
 * @param 最前面で起動
 * @text 在最前面启动
 * @desc 启动时游戏画面固定在最前面。
 * @default false
 * @type boolean
 *
 * @param リロード機能を使う
 * @text 使用重新加载功能
 * @desc 重新加载的地图和数据。如果由于冲突而导致操作出现问题，请禁用它。
 * @default true
 * @type boolean
 *
 * @param 右寄せ座標
 * @text 右对齐坐标
 * @desc 如果在游戏画面显示在最前面时失去焦点，则将指定的坐标部分画面靠右。
 * @default 640
 * @type number
 *
 * @param 挨拶非表示
 * @text 隐藏问候语
 * @desc 隐藏标题画面的问候信息。
 * @default false
 * @type boolean
 *
 * @param 誕生月
 * @text 生日-月
 * @desc 输入生日后，当天会在标题画面上显示信息。
 * @default 0
 * @type number
 * @min 0
 * @max 12
 *
 * @param 誕生日
 * @text 生日-日
 * @desc 输入生日后，当天会在标题画面上显示信息。
 * @default 0
 * @type number
 * @min 0
 * @max 31
 *
 * @help 一个用于调整开发人员行为的辅助制作插件。
 * 此插件仅适用于本地测试游戏。
 * 此外，有用的信息（如用户代理和核心脚本版本）将输出到日志中。
 * 提供以下功能以提供舒适的开发支持。
 *
 * 1. 游戏开始时，开发者工具会自动启动。(一般用F8启动)
 *    即使关闭，发生错误时也会自动启动。
 *
 * 2. 总是将游戏画面显示在最前面。 在一边看画面一边工作时很方便。 
 *    游戏中可以从菜单栏切换。
 *
 * 3. 修改地图和事件并重新保存后，当焦点返回游戏画面时，
 *    地图和数据库会自动重新加载。
 *
 * 4. 可以跳过标题画面，加载最新的保存文件。
 *
 * 5. 可以加快地图上游戏的速度(最高16倍速)。
 *     (地图上高速、淡出、信息显示的高速跳过)相反，也可以低速化(最多1/60倍速)。
 *    请将速度倍率设定为负值。 游戏速度发生变化时，BGM的音调会发生变化。
 *
 * 6. 可以强制消灭敌人取得胜利。 也可以得到奖励。
 *    也可以强制战败、强制中断。
 *
 * 7. 可以在每一帧执行任意脚本。
 *    仅当脚本返回值发生变化时将结果输出到控制台。
 *
 * 8. 可以暂时停止游戏画面的更新，冻结画面。
 *
 * 9. 保存保存数据时，可以不进行编码，直接以json格式进行保存加载。
 *
 * 此插件没有插件命令。
 *
 * 与“屏幕捕捉管理”插件配合使用时，将显示屏幕捕捉菜单栏。
 * https://raw.githubusercontent.com/triacontane/RPGMakerMV/master/MakeScreenCapture.js
 *
 * ・高级设置
 * 如果希望在浏览器启动时也使该插件的调试功能有效，
 * 请在启动URL的选项中添加「test」或「best」。
 * 但是，来自NW.js的某些功能将失效。
 *
 * 通常，从浏览器等外部启动游戏时，
 * 无法执行战斗测试，但启用该插件后可以进行战斗测试。
 *
 * 从外部编辑器启动时，可以设置以下启动参数。
 * 此设置优先于插件参数。
 * devToolOff : 开发人员工具将不会启动。
 * onTop : 在最前面显示画面。
 *
 * 使用条款:
 *  可以向作者擅自改变、再分发，使用形态(商用、18禁使用等)
 *  也没有限制。
 *  这个插件已经是你的了。
 */

var p = null;

/**
 * Controller_NwJs
 * NW.jsのウィンドウを操作します。
 * @constructor
 */
function Controller_NwJs() {
    this.initialize.apply(this, arguments);
}

(function() {
    'use strict';
    const pluginName = 'DevToolsManage';

    //=============================================================================
    // p
    //  ログ出力をより短い関数名で実現します。(RGSS互換)
    //=============================================================================
    p = function() {
        console.log.apply(console, arguments);
        SceneManager.getNwJs().showDevTools();
    };

    //=============================================================================
    // ローカル関数
    //  プラグインパラメータやプラグインコマンドパラメータの整形やチェックをします
    //=============================================================================
    const getParamString = function(paramNames, upperFlg) {
        const value = getParamOther(paramNames);
        return value === null ? '' : upperFlg ? value.toUpperCase() : value;
    };

    const getParamNumber = function(paramNames, min, max) {
        const value = getParamOther(paramNames);
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(value, 10) || 0).clamp(min, max);
    };

    const getParamBoolean = function(paramNames) {
        const value = getParamOther(paramNames);
        return (value || '').toUpperCase() === 'ON' || (value || '').toUpperCase() === 'TRUE';
    };

    const getParamOther = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (let i = 0; i < paramNames.length; i++) {
            const name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return null;
    };

    const paramStartupDevTool     = getParamBoolean(['StartupDevTool', '開始時に起動']);
    const paramFuncKeyReload      = getParamString(['FuncKeyReload', 'リロードキー']);
    const paramFuncKeyOnTop       = getParamString(['FuncKeyOnTop', '最前面に表示キー']);
    const paramFuncKeyRapidGame   = getParamString(['FuncKeyRapidGame', '高速化切替キー']);
    const paramFuncKeyVictory     = getParamString(['FuncKeyForceVictory', '強制戦闘勝利キー']);
    const paramFuncKeyDefeat      = getParamString(['FuncKeyForceDefeat', '強制戦闘敗北キー']);
    const paramFuncKeyAbort       = getParamString(['FuncKeyForceAbort', '強制戦闘中断キー']);
    const paramFuncKeyScript      = getParamString(['FuncKeyScript', 'スクリプト実行キー']);
    const paramFuncKeyFreeze      = getParamString(['FuncKeyFreeze', 'フリーズキー']);
    const paramShowFPS            = getParamString(['ShowFPS', 'FPS表示'], true);
    const paramCutTitle           = getParamBoolean(['CutTitle', 'タイトルカット']);
    const paramRapidStart         = getParamBoolean(['RapidStart', '高速開始']);
    const paramRapidSpeed         = getParamNumber(['RapidSpeed', '高速スピード'], -60, 16);
    const paramFakeMobile         = getParamBoolean(['FakeMobile', 'モバイル偽装']);
    const paramMenuBarVisible     = getParamBoolean(['MenuBarVisible', 'メニューバー表示']);
    const paramClickMenu          = getParamNumber(['ClickMenu', 'クリックメニュー'], -1);
    const paramJsonSave           = getParamBoolean(['JsonSave', 'JSON形式セーブ']);
    const paramOutputStartupInfo  = getParamBoolean(['OutputStartupInfo', '起動時情報出力']);
    const paramStartupOnTop       = getParamBoolean(['StartupOnTop', '最前面で起動']);
    const paramUseReloadData      = getParamBoolean(['UseReloadData', 'リロード機能を使う']);
    const paramSimultaneousCtrl   = getParamBoolean(['SimultaneousCtrl', 'Ctrl同時押し']);
    const paramSimultaneousAlt    = getParamBoolean(['SimultaneousAlt', 'Alt同時押し']);
    const paramShiftRightOnBlur   = getParamNumber(['ShiftRightOnBlur', '右寄せ座標'], -1000, 1000);
    const paramGreetingHide       = getParamBoolean(['GreetingHide', '挨拶非表示']);
    const paramBirthdayMonth      = getParamNumber(['BirthdayMonth', '誕生月'], 0, 12);
    const paramBirthdayDate       = getParamNumber(['BirthdayDate', '誕生日'], 0, 31);
    const paramInvalidMessageSkip = getParamBoolean(['InvalidMessageSkip', 'メッセージスキップ無効']);

    //=============================================================================
    // Graphics
    //  FPSの表示を設定します。
    //=============================================================================
    Graphics.setFPSMeter = function(type) {
        switch (type) {
            case 'FPS':
                this.hideFps();
                this._switchFPSMeter();
                break;
            case 'MS':
                this.hideFps();
                this._switchFPSMeter();
                this._switchFPSMeter();
                break;
        }
    };

    const _Graphics__createAllElements = Graphics._createAllElements;
    Graphics._createAllElements        = function() {
        _Graphics__createAllElements.apply(this, arguments);
        if (paramOutputStartupInfo) {
            this.outputStartUpLog();
        }
    };

    Graphics.outputStartUpLog = function() {
        console.log('********************************');
        console.log('***   User Agent             ***');
        console.log('********************************');
        console.log(navigator.userAgent);
        console.log('********************************');
        console.log('***   Core Version           ***');
        console.log('********************************');
        console.log('RPG Maker Name    : ' + Utils.RPGMAKER_NAME);
        console.log('RPG Maker Version : ' + Utils.RPGMAKER_VERSION);
        console.log('RPG Maker Engine  : ' + (Utils.RPGMAKER_ENGINE || 'Official Version'));
        console.log('********************************');
        console.log('***   Audio                  ***');
        console.log('********************************');
        console.log('Can Play OGG : ' + WebAudio.canPlayOgg());
        console.log('Can Play M4A : ' + WebAudio.canPlayM4a());

        if (Utils.isNwjs()) {
            console.log('********************************');
            console.log('***   Environment            ***');
            console.log('********************************');
            console.log('Platform : ' + process.platform);
            console.log(process.env);
            console.log('*********************************');
            console.log('***   document head           ***');
            console.log('*********************************');
            console.log(document.head);
            console.log('*********************************');
            console.log('***   document body           ***');
            console.log('*********************************');
            console.log(document.body);
        }
    };

    // テストプレー時以外は以降の機能を無効
    if (!Utils.isOptionValid('test') && !DataManager.isBattleTest()) {
        console.log(pluginName + ' is valid only test play!');
        return;
    }

    //=============================================================================
    // Utils
    //  モバイルモードを偽装します。
    //=============================================================================
    const _Utils_isMobileDevice = Utils.isMobileDevice;
    Utils.isMobileDevice        = function() {
        return _Utils_isMobileDevice.apply(this, arguments) || paramFakeMobile;
    };

    Utils.isNwjsNormal = function() {
        return this.isNwjs() && navigator.userAgent.match(/Chrome\/4/);
    };

    //=============================================================================
    // Input
    //  promptを再定義します。
    //=============================================================================
    const _Input_wrapNwjsAlert = Input._wrapNwjsAlert;
    Input._wrapNwjsAlert       = function() {
        _Input_wrapNwjsAlert.apply(this, arguments);
        const _window_prompt = window.prompt;
        window.prompt        = function(value, defaultValue) {
            return SceneManager.getNwJs().prompt(value, defaultValue, _window_prompt);
        };
    };

    Input.functionReverseMapper = {
        F1 : 112,
        F2 : 113,
        F3 : 114,
        F4 : 115,
        F5 : 116,
        F6 : 117,
        F7 : 118,
        F8 : 119,
        F9 : 120,
        F10: 121,
        F11: 122,
        F12: 123
    };

    var _Input__shouldPreventDefault = Input._shouldPreventDefault;
    Input._shouldPreventDefault      = function(keyCode) {
        return _Input__shouldPreventDefault.apply(this, arguments) || keyCode === 9; // Tab
    };

    //=============================================================================
    // SceneManager
    //  状況に応じてデベロッパツールを自動制御します。
    //=============================================================================
    SceneManager.originalTitle     = null;
    SceneManager._rapidGame        = false;
    SceneManager._lastScriptString = null;
    SceneManager._lastScriptResult = null;

    const _SceneManager_initialize = SceneManager.initialize;
    SceneManager.initialize        = function() {
        _SceneManager_initialize.apply(this, arguments);
        this.initDevCommand();
        Graphics.setFPSMeter(paramShowFPS);
        if (!Utils.isNwjs()) {
            return;
        }
        this._freeze  = false;
        this._nwJsGui = new Controller_NwJs();
        if (this.isAlwaysOnTop()) {
            this._nwJsGui.toggleAlwaysOnTop();
        }
    };

    SceneManager.initDevCommand = function() {
        this.devCommands = [
            {code: 102, use: true, name: '显示在最前面', key: paramFuncKeyOnTop, type: 'checkbox'},
            {code: 103, use: true, name: '重新加载', key: paramFuncKeyReload, type: 'normal'},
            {code: 104, use: true, name: '高速模式切换', key: paramFuncKeyRapidGame, type: 'checkbox'},
            {code: 105, use: true, name: '战斗强制胜利', key: paramFuncKeyVictory, type: 'normal'},
            {code: 106, use: true, name: '常驻脚本执行', key: paramFuncKeyScript, type: 'normal'},
            {code: 107, use: true, name: '画面暂停', key: paramFuncKeyFreeze, type: 'checkbox'},
            {code: 108, use: !!SceneManager.takeCapture, name: '画面捕捉', key: true, type: 'normal'},
            {code: 109, use: true, name: '战斗强制败北', key: paramFuncKeyDefeat, type: 'normal'},
            {code: 110, use: true, name: '战斗强制中断', key: paramFuncKeyAbort, type: 'normal'},
            {code: 111, use: !!SceneManager.onKeyDownForScreenMovie, name: '画面录像', key: true, type: 'normal'},
        ];
    };

    SceneManager.getNwJs = function() {
        return this._nwJsGui;
    };

    SceneManager.isAlwaysOnTop = function() {
        return paramStartupOnTop || Utils.isOptionValid('onTop');
    };

    SceneManager.toggleFreeze = function() {
        Input.clear();
        this._freeze = !this._freeze;
        this.updateDocumentTitle();
        return this._freeze;
    };

    const _SceneManager_catchException = SceneManager.catchException;
    SceneManager.catchException        = function(e) {
        if (this._nwJsGui) this._nwJsGui.showDevTools(false);
        _SceneManager_catchException.apply(this, arguments);
    };

    const _SceneManager_onError = SceneManager.onError;
    SceneManager.onError        = function(e) {
        if (this._nwJsGui) this._nwJsGui.showDevTools(false);
        _SceneManager_onError.apply(this, arguments);
    };

    const _SceneManager_onKeyDown = SceneManager.onKeyDown;
    SceneManager.onKeyDown        = function(event) {
        _SceneManager_onKeyDown.apply(this, arguments);
        if (paramSimultaneousCtrl === event.ctrlKey && paramSimultaneousAlt === event.altKey) {
            this.onKeyDownForDevToolManage(event);
        }
    };

    SceneManager.onKeyDownForDevToolManage = function(event) {
        let commandCode = null;
        this.devCommands.some(function(commandInfo) {
            if (Input.functionReverseMapper[commandInfo.key] === event.keyCode) {
                commandCode = commandInfo.code;
                return true;
            }
            return false;
        });
        if (commandCode && this._nwJsGui) this.executeDevCommand(commandCode, event);
    };

    SceneManager.executeDevCommand = function(code, event) {
        const command = this['executeDevCommand' + code];
        return command ? command.call(SceneManager, event) : null;
    };

    SceneManager.executeDevCommand102 = function() {
        return this._nwJsGui.toggleAlwaysOnTop();
    };

    SceneManager.executeDevCommand103 = function() {
        location.reload();
    };

    SceneManager.executeDevCommand104 = function() {
        return this.toggleRapid();
    };

    SceneManager.executeDevCommand105 = function() {
        BattleManager.forceVictory();
    };

    SceneManager.executeDevCommand106 = function() {
        this.showScriptDialog();
    };

    SceneManager.executeDevCommand107 = function() {
        return this.toggleFreeze();
    };

    SceneManager.executeDevCommand108 = function() {
        return this.takeCapture();
    };

    SceneManager.executeDevCommand109 = function() {
        BattleManager.forceDefect();
    };

    SceneManager.executeDevCommand110 = function() {
        BattleManager.forceAbort();
    };

    SceneManager.executeDevCommand111 = function() {
        this._screenRecorder.toggle();
    };

    SceneManager.isRapid = function() {
        return SceneManager._rapidGame && paramRapidSpeed > 1;
    };

    SceneManager.isSlow = function() {
        return SceneManager._rapidGame && paramRapidSpeed < -1;
    };

    SceneManager.toggleRapid = function() {
        this._rapidGame = !this._rapidGame;
        const bgm       = AudioManager.saveBgm();
        if (bgm.name) {
            AudioManager.playBgm(bgm, bgm.pos);
            AudioManager._bgmBuffer.play(true, bgm.pos);
        }
        this.updateDocumentTitle();
        return this.isRapid();
    };

    SceneManager.updateDocumentTitle = function() {
        if (!this.originalTitle) {
            this.originalTitle = document.title;
        }
        document.title = this.originalTitle + this.addDocumentTitleRapidOrSlow() +
            this.addDocumentTitleAlwaysOnTop() +
            this.addDocumentTitleFreeze();
    };

    SceneManager.addDocumentTitleRapidOrSlow = function() {
        if (this.isRapid()) {
            return ' [!!!高速化!!!] * ' + paramRapidSpeed;
        } else if (this.isSlow()) {
            return ' [!!!慢动作!!!] / ' + -paramRapidSpeed;
        } else {
            return '';
        }
    };

    SceneManager.addDocumentTitleAlwaysOnTop = function() {
        return this._nwJsGui.isOnTop() ? ' [!!!总是显示在最前面!!!]' : '';
    };

    SceneManager.addDocumentTitleFreeze = function() {
        return this._freeze ? ' [!!!暂停!!!]' : '';
    };

    SceneManager.isCurrentScene = function(sceneClass) {
        return this._scene && this._scene.constructor === sceneClass;
    };

    SceneManager.showScriptDialog = function() {
        const promptValue  = '请输入想要常驻运行的脚本。';
        const scriptString = window.prompt(promptValue, this._nwJsGui.readClipboard());
        if (scriptString !== null && scriptString !== '') {
            this._nwJsGui.showDevTools();
            this._nwJsGui.writeClipboard(scriptString);
            this.executeScript(scriptString);
            this._lastScriptString = scriptString;
        }
    };

    SceneManager.executeScript = function(scriptString) {
        let result = null;
        try {
            result = eval(scriptString);
            if (!this._lastScriptString) {
                SoundManager.playOk();
                console.log('Execute Script : ' + scriptString);
                console.log('Execute Result : ');
            }
        } catch (e) {
            if (!this._lastScriptString) {
                SoundManager.playBuzzer();
                console.log('Error Script : ' + scriptString);
                console.error(e.stack);
            }
            result = e.toString();
        }
        if (!this._lastScriptString || result !== this._lastScriptResult) {
            console.log(result);
        }
        this._lastScriptResult = result;
    };

    const _SceneManager_initNwjs = SceneManager.initNwjs;
    SceneManager.initNwjs        = function() {
        _SceneManager_initNwjs.apply(this, arguments);
        if (Utils.isNwjs()) {
            this.addMenuBar();
        }
    };

    SceneManager.addMenuBar = function() {
        if (!paramMenuBarVisible) {
            this._needAdjustScreen = false;
            return;
        }
        const gui        = require('nw.gui');
        const gameWindow = gui.Window.get();
        if (!gameWindow.menu || gameWindow.menu.type !== 'menubar') {
            this._needAdjustScreen = true;
        }
        gameWindow.menu = new gui.Menu({type: 'menubar'});
    };

    const _SceneManager_run = SceneManager.run;
    SceneManager.run        = function(sceneClass) {
        _SceneManager_run.apply(this, arguments);
        this.setWindowSizeForMenuBar();
    };

    SceneManager.setWindowSizeForMenuBar = function() {
        if (!this._needAdjustScreen) {
            return;
        }
        const gui        = require('nw.gui');
        const gameWindow = gui.Window.get();
        setTimeout(function() { // Fix missing menu bar height
            var style_height = parseInt(Graphics._canvas.style.height, 10);
            var height_diff  = SceneManager._screenHeight - style_height;
            if (height_diff !== 0) {
                gameWindow.moveBy(0, -height_diff);
                gameWindow.resizeBy(0, height_diff);
            }
        }, 100);
    };

    SceneManager.getMenuBarHeight = function() {
        return Utils.isNwjsNormal() ? 20 : 25;
    };

    const _SceneManager_requestUpdate = SceneManager.requestUpdate;
    SceneManager._updateRateCount     = 0;
    SceneManager.requestUpdate        = function() {
        if (this.isSlow()) {
            this._updateRateCount++;
            if (this._updateRateCount >= -paramRapidSpeed) {
                this.updateInputData();
                _SceneManager_requestUpdate.apply(this, arguments);
                this._updateRateCount = 0;
            } else if (!this._stopped) {
                requestAnimationFrame(this.requestUpdate.bind(this));
            }
        } else {
            this._updateRateCount = 0;
            _SceneManager_requestUpdate.apply(this, arguments);
        }
    };

    const _SceneManager_updateMain = SceneManager.updateMain;
    SceneManager.updateMain        = function() {
        if (this.isSlow()) {
            this.changeScene();
            this.updateScene();
            this.renderScene();
            this.requestUpdate();
        } else {
            const newTime = this._getTimeInMsWithoutMobileSafari();
            // for break point
            if (newTime - this._currentTime > 1000) {
                Input.clear();
            }
            _SceneManager_updateMain.apply(this, arguments);
        }
    };

    const _SceneManager_updateScene = SceneManager.updateScene;
    SceneManager.updateScene        = function() {
        this.updateScript();
        if (this.isUsingReload()) {
            this.updateDataReload();
        }
        if (this._freeze || this.isReloading()) {
            return;
        }
        _SceneManager_updateScene.apply(this, arguments);
    };

    SceneManager.isUsingReload = function() {
        return paramUseReloadData && !DataManager.isBattleTest() && !DataManager.isEventTest() && Utils.isNwjs();
    };

    SceneManager.updateScript = function() {
        if (this._lastScriptString) {
            this.executeScript(this._lastScriptString);
        }
    };

    SceneManager.updateDataReload = function() {
        if (this.isOnFocusGameWindow() && !this._reloadGenerator) {
            this._reloadGenerator = this.reloadGenerator();
        }
        if (this._reloadGenerator && DataManager.isDatabaseLoaded()) {
            if (!this._reloadGenerator.next().value) {
                this._reloadGenerator = null;
                // Resolve conflict for DynamicDatabase.js
                if (typeof DynamicDatabaseManager !== 'undefined') {
                    DynamicDatabaseManager.makeDynamicDatabase();
                }
            }
        }
    };

    SceneManager.reloadGenerator = function* () {
        this._preVersionId = DataManager.reloadSystemData();
        yield true;
        if (this._preVersionId !== $dataSystem.versionId) {
            this.reloadMapData();
            DataManager.loadDatabase();
            console.log('Database Reload');
            yield true;
        }
        return false;
    };

    SceneManager.isOnFocusGameWindow = function() {
        if (this.getNwJs().isOnFocus()) {
            this.getNwJs().setOnFocus(false);
            return true;
        }
        return false;
    };

    SceneManager.reloadMapData = function() {
        if (this._scene instanceof Scene_Map && $gamePlayer.canMove()) {
            $gamePlayer.reserveTransfer(
                $gameMap.mapId(), $gamePlayer.x, $gamePlayer.y, $gamePlayer.direction(), 2);
            $gamePlayer.requestMapReload();
            console.log('Map Reload');
        }
    };

    SceneManager.isReloading = function() {
        return !!this._reloadGenerator;
    };

    //=============================================================================
    // BattleManager
    //  強制勝利を追加定義します。
    //=============================================================================
    BattleManager.forceVictory = function() {
        if (this.canExecuteBattleEndProcess()) {
            $gameTroop.members().forEach(function(enemy) {
                enemy.addNewState(enemy.deathStateId());
            });
            this.processVictory();
        }
    };

    BattleManager.forceDefect = function() {
        if (this.canExecuteBattleEndProcess()) {
            $gameParty.members().forEach(function(actor) {
                actor.addNewState(actor.deathStateId());
            });
            this.processDefeat();
        }
    };

    BattleManager.forceAbort = function() {
        if (this.canExecuteBattleEndProcess()) {
            $gameParty.performEscape();
            SoundManager.playEscape();
            this.displayEscapeSuccessMessage();
            this._escaped = true;
            this.processAbort();
        }
    };

    BattleManager.canExecuteBattleEndProcess = function() {
        return SceneManager.isCurrentScene(Scene_Battle) && this._phase !== 'battleEnd';
    };

    //=============================================================================
    // AudioManager
    //  高速化実行時にBGMのピッチを強制的に最大にします。
    //=============================================================================
    const _AudioManager_playBgm = AudioManager.playBgm;
    AudioManager.playBgm        = function(bgm, pos) {
        const originalPitch = bgm.pitch;
        if (SceneManager.isRapid()) {
            arguments[0].pitch = 150;
        }
        if (SceneManager.isSlow()) {
            arguments[0].pitch = 50;
        }
        _AudioManager_playBgm.apply(this, arguments);
        this._currentBgm.pitch = originalPitch;
    };

    //=============================================================================
    // DataManager
    //  セーブデータのエンコード・デコードを実施します。
    //=============================================================================
    DataManager.decodeSaveGame = function(savefileId) {
        if (this.isThisGameFile(savefileId)) {
            const json = StorageManager.load(savefileId);
            StorageManager.saveToLocalFileJson(savefileId, json);
        }
    };

    DataManager.encodeSaveGame = function(savefileId) {
        const json = StorageManager.loadFromLocalFileJson(savefileId);
        if (json) {
            StorageManager.save(savefileId, json);
        }
    };

    const _DataManager_saveGameWithoutRescue = DataManager.saveGameWithoutRescue;
    DataManager.saveGameWithoutRescue        = function(savefileId) {
        const result = _DataManager_saveGameWithoutRescue.apply(this, arguments);
        if (paramJsonSave) this.decodeSaveGame(savefileId);
        return result;
    };

    const _DataManager_loadGameWithoutRescue = DataManager.loadGameWithoutRescue;
    DataManager.loadGameWithoutRescue        = function(savefileId) {
        this.encodeSaveGame(savefileId);
        return _DataManager_loadGameWithoutRescue.apply(this, arguments);
    };

    const _DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase        = function() {
        if (this.isNeedSuppressBtest()) {
            this._suppressBattleTest = true;
        }
        _DataManager_loadDatabase.apply(this, arguments);
        this._suppressBattleTest = false;
    };

    const _DataManager_isBattleTest = DataManager.isBattleTest;
    DataManager.isBattleTest        = function() {
        return this._suppressBattleTest ? false : _DataManager_isBattleTest.apply(this, arguments);
    };

    DataManager.isNeedSuppressBtest = function() {
        if (!this.isBattleTest()) {
            return false;
        }
        if (Utils.isNwjs()) {
            return this._databaseFiles.some(function(databaseFile) {
                return !StorageManager.isExistTestData(databaseFile.src);
            });
        } else {
            return true;
        }
    };

    DataManager.reloadSystemData = function() {
        for (let i = 0; i < this._databaseFiles.length; i++) {
            const name = this._databaseFiles[i].name;
            if (name === '$dataSystem') {
                var preVersionId = $dataSystem.versionId;
                this.loadDataFile(name, this._databaseFiles[i].src);
                return preVersionId;
            }
        }
        return null;
    };

    //=============================================================================
    // StorageManager
    //  jsonセーブファイルの読み込みと書き込みを行います。
    //=============================================================================
    StorageManager.saveToLocalFileJson = function(savefileId, json) {
        const fs       = require('fs');
        const dirPath  = this.localFileDirectoryPath();
        const filePath = dirPath + 'file%1.json'.format(savefileId);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        fs.writeFileSync(filePath, json);
    };

    StorageManager.loadFromLocalFileJson = function(savefileId) {
        const fs       = require('fs');
        const filePath = this.localFileDirectoryPath() + 'file%1.json'.format(savefileId);
        if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, {encoding: 'utf8'});
        }
        return null;
    };

    StorageManager.isExistTestData = function(fileName) {
        const fs       = require('fs');
        const path     = require('path');
        const filePath = path.join(path.dirname(process.mainModule.filename), 'data/Test_' + fileName);
        return fs.existsSync(filePath);
    };

    //=============================================================================
    // Scene_Base
    //  マップの高速化を提供します。
    //=============================================================================
    const _Scene_Base_fadeSpeed    = Scene_Base.prototype.fadeSpeed;
    Scene_Base.prototype.fadeSpeed = function() {
        return SceneManager.isRapid() ? 1 : _Scene_Base_fadeSpeed.apply(this, arguments);
    };

    const _Scene_Base_startFadeIn    = Scene_Base.prototype.startFadeIn;
    Scene_Base.prototype.startFadeIn = function(duration, white) {
        if (SceneManager.isRapid()) arguments[0] = 1;
        _Scene_Base_startFadeIn.apply(this, arguments);
    };

    const _Scene_Base_startFadeOut    = Scene_Base.prototype.startFadeOut;
    Scene_Base.prototype.startFadeOut = function(duration, white) {
        if (SceneManager.isRapid()) arguments[0] = 1;
        _Scene_Base_startFadeOut.apply(this, arguments);
    };

    //=============================================================================
    // Scene_Boot
    //  タイトル画面をとばしてマップ画面に遷移します。
    //=============================================================================
    const _Scene_Boot_start    = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.apply(this, arguments);
        if (paramRapidStart) SceneManager.toggleRapid();
        this.cutSceneTitle();
    };

    Scene_Boot.prototype.cutSceneTitle = function() {
        if (paramCutTitle && !DataManager.isBattleTest() && !DataManager.isEventTest()) {
            if (!this.goToLatestContinue()) {
                this.goToNewGame();
            }
        }
    };

    Scene_Boot.prototype.goToNewGame = function() {
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Map);
    };

    Scene_Boot.prototype.goToLatestContinue = function() {
        if (DataManager.isAnySavefileExists()) {
            if (DataManager.loadGame(DataManager.latestSavefileId())) {
                this.reloadMapIfUpdated();
                SceneManager.goto(Scene_Map);
                $gameSystem.onAfterLoad();
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    Scene_Boot.prototype.reloadMapIfUpdated = Scene_Load.prototype.reloadMapIfUpdated;

    //=============================================================================
    // Scene_Map
    //  高速モードを実装します。
    //=============================================================================
    const _Scene_Map_isFastForward    = Scene_Map.prototype.isFastForward;
    Scene_Map.prototype.isFastForward = function() {
        return _Scene_Map_isFastForward.apply(this, arguments) || SceneManager.isRapid();
    };

    const _Scene_Map_updateMainMultiply    = Scene_Map.prototype.updateMainMultiply;
    Scene_Map.prototype.updateMainMultiply = function() {
        _Scene_Map_updateMainMultiply.apply(this, arguments);
        if (this.isFastForward() && SceneManager.isRapid()) {
            for (let i = 2; i <= paramRapidSpeed; i++) {
                this.updateMain();
            }
        }
    };

    var _Scene_Title_createForeground      = Scene_Title.prototype.createForeground;
    Scene_Title.prototype.createForeground = function() {
        _Scene_Title_createForeground.apply(this, arguments);
        if (!paramGreetingHide) {
            this.createGreetingSprite();
        }
    };

    var greetingMessage = {
        '1_1'  : '新年快乐！ 今年也请努力制作！',
        '2_14' : '今天是情人节！ 收到很棒的礼物了吗？ ？ ？',
        '4_1'  : '今天是愚人节！',
        '8_31' : '暑假今天也结束了呢……虽然和工作的人没有关系。',
        '12_24': '今天是平安夜！ 制作到这样的日子，真了不起！ ！',
        '12_31': '今天是除夕。 明年也加油制作吧！',
    };

    Scene_Title.prototype.createGreetingSprite = function() {
        var message = this.getGreetingMessage();
        if (message) {
            var fontSize         = 48;
            var bitmap           = new Bitmap(1000, fontSize);
            bitmap.fontSize      = fontSize;
            bitmap.fontFace      = '"ヒラギノ明朝 ProN W3","Hiragino Mincho ProN","ＭＳ Ｐ明朝","MS PMincho"';
            this._greetingSprite = new Sprite(bitmap);
            this._greetingSprite.bitmap.drawText(message, 0, 0, 1000, bitmap.height, 'left');
            this._greetingSprite.x = Graphics.width + 200;
            this._greetingSprite.y = Graphics.height / 2;
            this.addChild(this._greetingSprite);
        }
    };

    Scene_Title.prototype.getGreetingMessage = function() {
        var time  = new Date();
        var month = time.getMonth() + 1;
        var date  = time.getDate();
        var hour  = time.getHours();
        if (month === paramBirthdayMonth && date === paramBirthdayDate) {
            return '祝你生日快乐！ ！ ！';
        }
        if (hour > 21 && Math.randomInt(100) < 2) {
            return '制作到很晚辛苦了……！'
        }
        var key = `${month}_${date}`;
        return greetingMessage[key];
    };

    var _Scene_Title_update      = Scene_Title.prototype.update;
    Scene_Title.prototype.update = function() {
        _Scene_Title_update.apply(this, arguments);
        if (this._greetingSprite) {
            this._greetingSprite.x -= 2;
            this._greetingSprite.y = Graphics.height / 2 + Math.sin(Graphics.frameCount / 30) * 30;
            if (this._greetingSprite.x + this._greetingSprite.bitmap.width < 0) {
                this._greetingSprite.x = this._greetingSprite.bitmap.width;
            }
        }
    };

    //=============================================================================
    // Window_Base
    //  ウィンドウの高速開閉を提供します。
    //=============================================================================
    const _Window_Base_updateOpen    = Window_Base.prototype.updateOpen;
    Window_Base.prototype.updateOpen = function() {
        if (SceneManager.isRapid() && this._opening) this.openness = 255;
        _Window_Base_updateOpen.apply(this, arguments);
    };

    const _Window_Base_updateClose    = Window_Base.prototype.updateClose;
    Window_Base.prototype.updateClose = function() {
        if (SceneManager.isRapid() && this._closing) this.openness = 0;
        _Window_Base_updateClose.apply(this, arguments);
    };

    //=============================================================================
    // Window_Message
    //  メッセージの高速化を提供します。
    //=============================================================================
    if (!paramInvalidMessageSkip) {
        const _Window_Message_isTriggered    = Window_Message.prototype.isTriggered;
        Window_Message.prototype.isTriggered = function() {
            return _Window_Message_isTriggered.apply(this, arguments) || SceneManager.isRapid();
        };

        const _Window_Message_startPause    = Window_Message.prototype.startPause;
        Window_Message.prototype.startPause = function() {
            _Window_Message_startPause.apply(this, arguments);
            if (SceneManager.isRapid()) this.startWait(1);
        };
    }

    var _Game_Interpreter_command355      = Game_Interpreter.prototype.command355;
    Game_Interpreter.prototype.command355 = function() {
        try {
            return _Game_Interpreter_command355.apply(this, arguments);
        } catch (e) {
            console.warn(`Script Error!! Event ID:${this._eventId}`);
            throw e;
        }
    };

    var _Game_Interpreter_command111      = Game_Interpreter.prototype.command111;
    Game_Interpreter.prototype.command111 = function() {
        if (this._params[0] === 12) {
            try {
                return _Game_Interpreter_command111.apply(this, arguments);
            } catch (e) {
                if (this._params[0] === 12) {
                    console.warn(`Script Error!! Event ID:${this._eventId}`);
                }
                throw e;
            }
        } else {
            return _Game_Interpreter_command111.apply(this, arguments);
        }
    };

    var _Game_Character_processMoveCommand      = Game_Character.prototype.processMoveCommand;
    Game_Character.prototype.processMoveCommand = function(command) {
        try {
            _Game_Character_processMoveCommand.apply(this, arguments);
        } catch (e) {
            if (command.code === Game_Character.ROUTE_SCRIPT) {
                console.warn(`Script Error!! ${this.getInformation()}`);
            }
            throw e;
        }
    };

    Game_Character.prototype.getInformation = function() {
        return `X:${this._x} Y:${this._y}`;
    };

    Game_Event.prototype.getInformation = function() {
        return `ID:${this._eventId} Name:${this.event().name}` + Game_Character.prototype.getInformation.call(this);
    };

    Game_Player.prototype.getInformation = function() {
        return 'Player' + Game_Character.prototype.getInformation.call(this);
    };

    Game_Player.prototype.isNeedMapReload = function() {
        return this._needsMapReload;
    };

    const _Game_Map_eraseEvent    = Game_Map.prototype.eraseEvent;
    Game_Map.prototype.eraseEvent = function(eventId) {
        _Game_Map_eraseEvent.apply(this, arguments);
        this._eraseEvents.push(eventId);
    };

    const _Game_Map_setupEvents    = Game_Map.prototype.setupEvents;
    Game_Map.prototype.setupEvents = function() {
        _Game_Map_setupEvents.apply(this, arguments);
        if (this._eraseEvents && $gamePlayer.isNeedMapReload()) {
            this.restoreEventErase();
        } else {
            this._eraseEvents = [];
        }
    };

    Game_Map.prototype.restoreEventErase = function() {
        this._eraseEvents.forEach(function(eventId) {
            this._events[eventId].erase();
        }, this);  // 这里传入 this 作为 forEach 的第二个参数，以确保回调函数中的 this 指向正确的上下文
    };

    //=============================================================================
    // Controller_NwJs
    //  Nw.jsのAPI呼び出しを管理します。
    //=============================================================================
    Controller_NwJs.prototype.constructor = Controller_NwJs;
    Controller_NwJs.prototype.initialize  = function() {
        this._nwGui     = require('nw.gui');
        this._onFocus   = false;
        this._menuBar   = this.getWindow().menu;
        this._menuClick = null;
        this._onTop     = false;
        this.setOnFocus(false);
        this.initSetting();
    };

    Controller_NwJs.prototype.initSetting = function() {
        this.addEventListener();
        if (paramMenuBarVisible) {
            this.makeMenu(this._menuBar);
            this.setMenuBar(this._menuBar);
        }
        this.initClickMenu();
        if (this.isStartUpDevTool()) {
            this.showDevTools();
        }
        setTimeout(function() {
            this.addOnFocusListener();
            SceneManager.updateDocumentTitle();
        }.bind(this), 1000);
    };

    Controller_NwJs.prototype.isStartUpDevTool = function() {
        return paramStartupDevTool && !Utils.isOptionValid('devToolOff');
    };

    Controller_NwJs.prototype.initClickMenu = function() {
        this._menuClick      = new this._nwGui.Menu();
        this._clickMenuItems = {};
        this.makeMenu(this._menuClick);
    };

    Controller_NwJs.prototype.setMenuBar = function(menu) {
        this.getWindow().menu = menu;
    };

    Controller_NwJs.prototype.makeMenu = function(menuObject) {
        this.getSortedDevCommands().forEach(function(commandInfo) {
            if (commandInfo.use) this.makeMenuItem(commandInfo, menuObject);
        }, this);
    };

    Controller_NwJs.prototype.makeMenuItem = function(commandInfo, menuObject) {
        const ctrl     = paramSimultaneousCtrl ? 'Ctrl+' : '';
        const alt      = paramSimultaneousAlt ? 'Alt+' : '';
        const key      = commandInfo.key && commandInfo.key[0] === 'F' ? commandInfo.key : '';
        const menuItem = new this._nwGui.MenuItem({
            label: commandInfo.name + (key ? `(${ctrl}${alt}${key})` : ''),
            type : commandInfo.type,
        });
        if (menuObject === this._menuClick) {
            this._clickMenuItems[commandInfo.name] = menuItem;
        }
        menuItem.click = function() {
            const result = SceneManager.executeDevCommand(commandInfo.code);
            if (commandInfo.type === 'checkbox') this._clickMenuItems[commandInfo.name].checked = result;
        }.bind(this);
        menuObject.append(menuItem);
    };

    Controller_NwJs.prototype.getSortedDevCommands = function() {
        return SceneManager.devCommands
            .filter(function(command) {
                return command.key && command.key !== 'none';
            })
            .sort(function(a, b) {
                if (a.key && b.key) {
                    return Input.functionReverseMapper[a.key] - Input.functionReverseMapper[b.key];
                } else if (a.key || b.key) {
                    return a.key ? -1 : 1;
                } else {
                    return a.code - b.code;
                }
            });
    };

    Controller_NwJs.prototype.setOnFocus = function(value) {
        this._onFocus = value;
    };

    Controller_NwJs.prototype.isOnFocus = function() {
        return this._onFocus;
    };

    Controller_NwJs.prototype.addEventListener = function() {
        document.addEventListener('mousedown', function(event) {
            if (event.button === paramClickMenu) {
                this._menuClick.popup(event.pageX, event.pageY);
            }
        }.bind(this));
    };

    Controller_NwJs.prototype.addOnFocusListener = function() {
        const currentWin = this.getWindow();
        currentWin.removeAllListeners();
        currentWin.on('focus', this.onFocus.bind(this));
        currentWin.on('blur', this.onBlur.bind(this));
    };

    Controller_NwJs.prototype.onFocus = function() {
        if (this._disableScreenShift) {
            return;
        }
        this._onFocus = true;
        setTimeout(function() {
            if (this._moveOnBlur) {
                this.getWindow().moveBy(-paramShiftRightOnBlur, 0);
                this._moveOnBlur = false;
            }
        }.bind(this), 100);
    };

    Controller_NwJs.prototype.onBlur = function() {
        if (this._disableScreenShift) {
            return;
        }
        setTimeout(function() {
            if (!this._moveOnBlur && this._onTop) {
                this.getWindow().moveBy(paramShiftRightOnBlur, 0);
                this._moveOnBlur = true;
            }
        }.bind(this), 100);
    };

    Controller_NwJs.prototype.getWindow = function() {
        return this._nwGui.Window.get();
    };

    Controller_NwJs.prototype.getClipboard = function() {
        return this._nwGui.Clipboard.get();
    };

    Controller_NwJs.prototype.toggleAlwaysOnTop = function() {
        this._onTop = !this._onTop;
        this.getWindow().setAlwaysOnTop(this._onTop);
        SceneManager.updateDocumentTitle();
        return this._onTop;
    };

    Controller_NwJs.prototype.isOnTop = function() {
        return this._onTop;
    };

    Controller_NwJs.prototype.prompt = function(value, defaultValue, aliasPrompt) {
        const win    = this.getWindow();
        const result = aliasPrompt.call(window, value, defaultValue);
        win.focus();
        Input.clear();
        return result;
    };

    Controller_NwJs.prototype.showDevTools = function() {
        this._disableScreenShift = true;
        this.getWindow().showDevTools();
        setTimeout(function() {
            this.focus();
        }.bind(this), 1000);
    };

    Controller_NwJs.prototype.focus = function() {
        this._disableScreenShift = true;
        this.getWindow().focus();
        setTimeout(function() {
            this._disableScreenShift = false;
        }.bind(this), 500);
    };

    Controller_NwJs.prototype.readClipboard = function(mode) {
        if (!mode) mode = 'text';
        return this.getClipboard().get(mode);
    };

    Controller_NwJs.prototype.writeClipboard = function(copyValue, mode) {
        if (!mode) mode = 'text';
        if (mode === 'text') copyValue = copyValue.toString();
        this.getClipboard().set(copyValue, mode);
    };
})();
