"use strict";
var rollbase = require('./rollbase.js');
var variables = {};

var gameName = function () {
	return '【趣味擲骰】 排序(至少3個選項) choice/隨機(至少2個選項) ehye-ainah 運勢 立flag .me'
}

var gameType = function () {
	return 'funny:funny:hktrpg'
}
var prefixs = function () {
	return [{
		first: /^[.]me$|排序|隨機|choice|^ehye-ainah|^yar-ainah|^throdog-ainah|立flag|運勢|鴨霸獸/i,
		second: null
	}]
}
var getHelpMessage = function () {
	return "【趣味擲骰】" + "\n\
隨機選擇： 啓動語 choice 隨機\n\
(問題)(啓動語)(問題)  (選項1) (選項2) \n\
例子 收到聖誕禮物隨機數 1 2 >3  \n\
\n\
隨機排序：啓動語 排序\n\
(問題)(啓動語)(問題) (選項1) (選項2)(選項3)\n\
例子 交換禮物排序 A君 C君 F君 G君\n\
\n\
複述功能：啓動語 .me (模擬系統說話)\n\
(啓動語) (句子)(句子)(句子)\n\
例子 .me C君殺死了NPC 村民, 受到尼什村通緝!\n\
\n\
占卜運氣功能： 字句開頭或結尾包括「運勢」兩字及四十字以內\n\
\n\
隨機死亡FLAG 字句開頭或結尾包括「立FLAG」可啓動\n"
}
var initialize = function () {
	return variables;
}

var rollDiceCommand = async function ({
	inputStr,
	mainMsg
}) {
	let rply = {
		default: 'on',
		type: 'text',
		text: ''
	}
	//let result = {};
	//		if (trigger.match(/排序/) != null && mainMsg.length >= 3) return exports.funny.SortIt(inputStr, mainMsg);
	//choice 指令開始於此
	//	if (trigger.match(/choice|隨機|選項|選1/) != null && mainMsg.length >= 3) return exports.funny.choice(inputStr, mainMsg);
	//tarot 指令
	/*
	if (trigger.match(/tarot|塔羅牌|塔羅/) != null) {
		if (trigger.match(/^單張|^每日|^daily/) != null) return exports.funny.NomalDrawTarot(mainMsg[1], mainMsg[2]); //預設抽 79 張
		if (trigger.match(/^時間|^time/) != null) return exports.funny.MultiDrawTarot(mainMsg[1], mainMsg[2], 1);
		if (trigger.match(/^大十字|^cross/) != null) return exports.funny.MultiDrawTarot(mainMsg[1], mainMsg[2], 2);
	}
	*/

	//FLAG指令開始於此
	//		if (trigger.match(/立flag|死亡flag/) != null) return exports.funny.BStyleFlagSCRIPTS();

	//鴨霸獸指令開始於此
	//		if (trigger.match(/鴨霸獸/) != null) return exports.funny.randomReply();
	//		if (trigger.match(/運勢/) != null) return exports.funny.randomLuck(mainMsg); //占卜運氣		
	/*猜拳指令
	if (trigger.match(/猜拳/) != null) {
	return RockPaperScissors(inputStr, mainMsg[1]);
	}
*/

	switch (true) {
		case /^排序|排序$/i.test(mainMsg[0]) && (mainMsg.length >= 4):
			rply.text = await SortIt(inputStr, mainMsg);
			return rply;
		case /^隨機|^choice|隨機$|choice$/i.test(mainMsg[0]) && (mainMsg.length >= 3):
			rply.text = await choice(inputStr, mainMsg);
			return rply;
		case /ainah/i.test(mainMsg[0]):
			if (mainMsg[0].match(/^ehye-ainah/) != null)
				rply.text = await NomalDrawTarot(mainMsg[1], mainMsg[2]); //預設抽 79 張
			if (mainMsg[0].match(/^yar-ainah/) != null)
				rply.text = await MultiDrawTarot(mainMsg[1], mainMsg[2], 1);
			if (mainMsg[0].match(/^throdog-ainah/) != null)
				rply.text = await MultiDrawTarot(mainMsg[1], mainMsg[2], 2);
			return rply;
		case (/立flag$|^立flag/i.test(mainMsg[0]) && mainMsg[0].toString().match(/[\s\S]{1,25}/g).length <= 1):
			rply.text = await BStyleFlagSCRIPTS();
			return rply;
		case /^鴨霸獸$/i.test(mainMsg[0]):
			rply.text = await randomReply();
			return rply;
		case (/運勢$|^運勢/i.test(mainMsg[0]) && mainMsg[0].toString().match(/[\s\S]{1,40}/g).length <= 1):
			rply.text = await randomLuck(mainMsg);
			return rply;
		case /^[.]me$/i.test(mainMsg[0]):
			rply.text = me(inputStr);
			return rply;
		default:
			break;
	}
}

/**
 * .ME
 */
function me(inputStr) {
	return inputStr.replace(/^[.]me/i, '');
}

/**
 * 占卜&其他
 */

async function BStyleFlagSCRIPTS() {
	const rplyArr = ['\
「打完這仗我就回老家結婚（この戦いが終わったら、故郷に帰って結婚するんだ）」', '\
「打完這一仗後我請你喝酒」', '\
「你、你要錢嗎！要什麼我都能給你！/我可以給你更多的錢！」', '\
「做完這次任務，我就要結婚了。」', '\
「幹完這一票我就金盆洗手了。」', '\
「好想再XXX啊……」', '\
「已經沒什麼好害怕的了（もう何も恐くない）」', '\
「我一定會回來的（必ず帰る！）」', '\
「差不多該走了」', '\
「我只是希望你永遠不要忘記我。」', '\
「我只是希望能永遠和你在一起。」', '\
「啊啊…為什麼會在這種時候、想起了那些無聊的事呢？」', '\
「能遇見你真是太好了。」', '\
「我終於…為你們報仇了！」', '\
「等到一切結束後，我有些話想跟妳說！」', '\
「這段時間我過的很開心啊。」', '\
把自己的寶物借給其他人，然後說「待一切結束後記得還給我。」', '\
「真希望這份幸福可以永遠持續下去。」', '\
「這工作結束後我們兩人一起生活吧！」（この仕事が終わったら2人で暮らそう）', '\
「我們三個人要永永遠遠在一起！」', '\
「這是我女兒的照片，很可愛吧？」', '\
「請告訴他/她，我永遠愛他/她」', '\
「聽好，在我回來之前絕不要亂走動哦（いいか、俺が帰ってくるまでここを動くんじゃないぞ）」', '\
「要像一個乖孩子一樣等著我回來」', '\
「我去去就來（先に行って、すぐ戻るから）」', '\
「快逃！(逃げろう！/早く逃げろう！)」', '\
「對方只有一個人，大家一起上啊」', '\
「我就不信，這麼多人還殺不了他一個！」', '\
「幹，幹掉了嗎？（やったのか？）」', '\
「身體好輕」', '\
「可惡！你給我看著！（逃跑）」', '\
「躲在這裡就應該不會被發現了吧。」', '\
「我不會讓任何人死的。」', '\
「可惡！原來是這麼回事！」', '\
「嘛 反正以後還有很多機會問的。」', '\
「你的生命已經如風中殘燭。」', '\
「沒有手牌場上也沒卡，你還想要贏嗎？」', '\
「跑這麼遠應該就行了。」', '\
「我已經甚麼都不怕了（もう何も恐くない）」', '\
「這XXX是什麼，怎麼之前沒見過（なんだこのXXX、見たことないな）」', '\
「什麽聲音……？就去看一下吧（:「何の音だ？ちょっと見てくる」', '\
「是我的錯覺嗎？可能是我看錯了」', '\
「成功了嗎！？」', '\
「二十年後又是一條好漢！」', '\
「大人/將軍武運昌隆」', '\
「這次工作的報酬是以前無法比較的（「今度の仕事でまとまったカネが入るんだ」）', '\
「我才不要和罪犯呆在一起，我回自己的房間去了！（この中に殺人者がいるかもしれないのに、一緒に居られるか!俺は自分の部屋に戻るぞ!）」', '\
「其實我知道事情的真相…（各種廢話）…犯人就是……」', '\
「我已經天下無敵了~~」', '\
「大人！這邊就交給小的吧，請快離開這邊吧」', '\
「這就是我們流派的最終奧義。這一招我只會演示一次，你看好了！」', '\
「誰敢殺我？」', '\
「從來沒有人能越過我的劍圍。」', '\
「就算殺死也沒問題吧？」', '\
「看我塔下強殺！」', '\
「騙人的吧，我們不是朋友嗎？」', '\
「不需要大人出手，就交給在下吧」', '\
「原來只有這種水平嗎」', '\
「操縱一切的黑手其實是.....」', '\
「沒看過你呢，你是誰？」', '\
「外面怎麼這麼吵」', '\
「我老爸是....你有種就....」', '\
「我可以好好利用這件事」'];

	//	rply.text = rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
	return rplyArr[await rollbase.Dice(rplyArr.length) - 1]
}

async function randomReply() {
	const rplyArr = ['\
你們死定了呃呃呃不要糾結這些……所以是在糾結哪些？', '\
在澳洲，每過一分鐘就有一隻鴨嘴獸被拔嘴。 \n我到底在共三小。', '\
嗚噁噁噁噁噁噁，不要隨便叫我。', '\
幹，你這學不會的豬！', '\
嘎嘎嘎。', '\
wwwwwwwwwwwwwwwww', '\
為什麼你們每天都可以一直玩；玩就算了還玩我。', '\
好棒，整點了！咦？不是嗎？', '\
不要打擾我挖坑！', '好棒，誤點了！', '\
在南半球，一隻鴨嘴獸拍打他的鰭，他的嘴就會掉下來。 \n我到底在共三小。', '\
什麼東西你共三小。', '\
哈哈哈哈哈哈哈哈！', '\
一直叫，你4不4想拔嘴人家？', '\
一直叫，你想被淨灘嗎？', '\
幫主你也敢嘴？', '\
拔嘴的話，我的嘴巴會長出觸手，然後開花成四個花瓣哦 (´×`)', '\
看看我！！我體內的怪物已經這麼大了！！', '\
傳說中，凡是拔嘴過鴨嘴獸的人，有高機率在100年內死去。 \n我到底在共三小。', '\
人類每花60秒拔嘴，就減少一分鐘的壽命。 \n我到底在共三小。', '\
嘴被拔，就會掉。', '\
你在大聲什麼啦！！！！', '\
公道價，八萬一（伸手）。', '\
你的嘴裡有異音（指）', '\
幫主說，有人打你的左臉，你就要用肉食性猛擊咬斷他的小腿。'];
	//	rply.text = rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
	return rplyArr[await rollbase.Dice(rplyArr.length) - 1];
}

async function randomLuck(TEXT) {
	const rplyArr = ['超吉', '超級上吉', '大吉', '吉', '中吉', '小吉', '吉', '小吉', '吉', '吉', '中吉', '吉', '中吉', '吉', '中吉', '小吉', '末吉', '吉', '中吉', '小吉', '末吉', '中吉', '小吉', '小吉', '吉', '小吉', '末吉', '中吉', '小吉', '凶', '小凶', '沒凶', '大凶', '很凶', '你不要知道比較好呢', '命運在手中,何必問我'];
	//	rply.text = TEXT[0] + ' ： ' + rplyArr[Math.floor((Math.random() * (rplyArr.length)) + 0)];
	return TEXT[0] + ' ： ' + rplyArr[await rollbase.Dice(rplyArr.length) - 1];
}

/**
 * Tarot塔羅牌
 */
async function MultiDrawTarot(text, text2, type) {
	let returnStr = '';
	let cards = []
	switch (type) {
		case 1:
			returnStr = 'yar-ainah';
			(text) ? returnStr += "；" + text + " " + text2: '';
			cards = await rollbase.shuffleTarget(TarotList2);
			returnStr += 'mgephaiagl: ' + cards[0] + '\n'
			returnStr += 'hai: ' + cards[1] + '\n'
			returnStr += 'ephaiagl: ' + cards[2] + '\n'
			break;
		case 2:
			returnStr = 'throdog-ainah';
			(text) ? returnStr += "；" + text + " " + text2: '';
			cards = await rollbase.shuffleTarget(TarotList2);
			returnStr += 'hai: ' + cards[0] + '\n'
			returnStr += 'ahh‵mglagln: ' + cards[1] + '\n'
			returnStr += 'mgr‵luh: ' + cards[2] + '\n'
			returnStr += 'eplw‵shuggor: ' + cards[3] + '\n'
			returnStr += 'mgephaiagl: ' + cards[4] + '\n'
			returnStr += 'ephaiagl: ' + cards[5] + '\n'
			returnStr += 'y‵ah: ' + cards[6] + '\n'
			returnStr += 'wgah‵nagl: ' + cards[7] + '\n'
			returnStr += 'lloigshogg: ' + cards[8] + '\n'
			returnStr += 'zhro: ' + cards[9] + '\n'
			break;
		default:
			break;

	}
	return returnStr;
}

async function NomalDrawTarot(text, text2) {
	let returnStr = '';
	returnStr = 'ehye-ainah'
	if (text)
		returnStr += "；" + text + " " + text2
	let ans = await rollbase.shuffleTarget(TarotList)
	returnStr += '\n' + ans[0]
	return returnStr;
}


const TarotList = ["Amprodias＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/00.jpg",
	"Baratchial＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/01.jpg",
	"Gargophias＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/02.jpg",
	"Dagdagiel＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/03.jpg",
	"Hemethterith＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/04.jpg",
	"Uriens＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/05.jpg",
	"Zamradiel＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/06.jpg",
	"Characith＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/07.jpg",
	"Temphioth＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/08.jpg",
	"Yamatu＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/09.jpg",
	"Kurgasiax＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/10.jpg",
	"Lafcursiax＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/11.jpg",
	"Malkunofat＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/12.jpg",
	"Niantiel＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/13.jpg",
	"Saksaksalim＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/14.jpg",
	"A‵ano‵nin＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/15.jpg",
	"Parfaxitas＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/16.jpg",
	"Tzuflifu＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/17.jpg",
	"Qulielfi＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/18.jpg",
	"Raflifu＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/19.jpg",
	"Shalicu＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/20.jpg",
	"Thantifaxath＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/21.jpg",
	"Amprodias－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/00-Re.jpg",
	"Baratchial－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/01-Re.jpg",
	"Gargophias－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/02-Re.jpg",
	"Dagdagiel－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/03-Re.jpg",
	"Hemethterith－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/04-Re.jpg",
	"Uriens－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/05-Re.jpg",
	"Zamradiel－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/06-Re.jpg",
	"Characith－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/07-Re.jpg",
	"Temphioth－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/08-Re.jpg",
	"Yamatu－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/09-Re.jpg",
	"Kurgasiax－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/10-Re.jpg",
	"Lafcursiax－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/11-Re.jpg",
	"Malkunofat－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/12-Re.jpg",
	"Niantiel－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/13-Re.jpg",
	"Saksaksalim－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/14-Re.jpg",
	"A‵ano‵nin－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/15-Re.jpg",
	"Parfaxitas－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/16-Re.jpg",
	"Tzuflifu－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/17-Re.jpg",
	"Qulielfi－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/18-Re.jpg",
	"Raflifu－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/19-Re.jpg",
	"Shalicu－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/20-Re.jpg",
	"Thantifaxath－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/21-Re.jpg",
	"Mi-Ha‵ash-Bacikal＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_01.jpg",
	"Mi-Ha‵ash-Iweleth＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_02.jpg",
	"Mi-Ha‵ash-Sheriruth＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_03.jpg",
	"Mi-Ha‵ash-Adyeshach＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_04.jpg",
	"Mi-Ha‵ash-Akzeriyyuth＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_05.jpg",
	"Mi-Ha‵ash-Kaitul＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_06.jpg",
	"Mi-Ha‵ash-Shakah＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_07.jpg",
	"Mi-Ha‵ash-Chemdah＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_08.jpg",
	"Mi-Ha‵ash-Aiyatsbus＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_09.jpg",
	"Mi-Ha‵ash-Qimranut＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_10.jpg",
	"Mi-Ha‵ash-Chiah＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_KING.jpg",
	"Mi-Ha‵ash-Ruach＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_KNIGHT.jpg",
	"Mi-Ha‵ash-Nephesh＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_PAGE.jpg",
	"Mi-Ha‵ash-Neschamah＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_QUEEN.jpg",
	"Marmeh-Im-Bacikal＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_01.jpg",
	"Marmeh-Im-Iweleth＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_02.jpg",
	"Marmeh-Im-Sheriruth＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_03.jpg",
	"Marmeh-Im-Adyeshach＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_04.jpg",
	"Marmeh-Im-Akzeriyyuth＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_05.jpg",
	"Marmeh-Im-Kaitul＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_06.jpg",
	"Marmeh-Im-Shakah＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_07.jpg",
	"Marmeh-Im-Chemdah＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_08.jpg",
	"Marmeh-Im-Aiyatsbus＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_09.jpg",
	"Marmeh-Im-Qimranut＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_10.jpg",
	"Marmeh-Im-Chiah＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_KING.jpg",
	"Marmeh-Im-Ruach＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_KNIGHT.jpg",
	"Marmeh-Im-Nephesh＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_PAGE.jpg",
	"Marmeh-Im-Neschamah＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_QUEEN.jpg",
	"Mi-Auquinos-Bacikal＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_01.jpg",
	"Mi-Auquinos-Iweleth＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_02.jpg",
	"Mi-Auquinos-Sheriruth＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_03.jpg",
	"Mi-Auquinos-Adyeshach＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_04.jpg",
	"Mi-Auquinos-Akzeriyyuth＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_05.jpg",
	"Mi-Auquinos-Kaitul＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_06.jpg",
	"Mi-Auquinos-Shakah＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_07.jpg",
	"Mi-Auquinos-Chemdah＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_08.jpg",
	"Mi-Auquinos-Aiyatsbus＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_09.jpg",
	"Mi-Auquinos-Qimranut＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_10.jpg",
	"Mi-Auquinos-Chiah＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_KING.jpg",
	"Mi-Auquinos-Ruach＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_KNIGHT.jpg",
	"Mi-Auquinos-Nephesh＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_PAGE.jpg",
	"Mi-Auquinos-Neschamah＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_QUEEN.jpg",
	"Mi-Habekiyeh-Bacikal＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_01.jpg",
	"Mi-Habekiyeh-Iweleth＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_02.jpg",
	"Mi-Habekiyeh-Sheriruth＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_03.jpg",
	"Mi-Habekiyeh-Adyeshach＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_04.jpg",
	"Mi-Habekiyeh-Akzeriyyuth＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_05.jpg",
	"Mi-Habekiyeh-Kaitul＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_06.jpg",
	"Mi-Habekiyeh-Shakah＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_07.jpg",
	"Mi-Habekiyeh-Chemdah＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_08.jpg",
	"Mi-Habekiyeh-Aiyatsbus＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_09.jpg",
	"Mi-Habekiyeh-Qimranut＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_10.jpg",
	"Mi-Habekiyeh-Chiah＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_KING.jpg",
	"Mi-Habekiyeh-Ruach＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_KNIGHT.jpg",
	"Mi-Habekiyeh-Nephesh＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_PAGE.jpg",
	"Mi-Habekiyeh-Neschamah＋\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_QUEEN.jpg",
	"Mi-Ha‵ash-Bacikal－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_01-Re.jpg",
	"Mi-Ha‵ash-Iweleth－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_02-Re.jpg",
	"Mi-Ha‵ash-Sheriruth－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_03-Re.jpg",
	"Mi-Ha‵ash-Adyeshach－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_04-Re.jpg",
	"Mi-Ha‵ash-Akzeriyyuth－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_05-Re.jpg",
	"Mi-Ha‵ash-Kaitul－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_06-Re.jpg",
	"Mi-Ha‵ash-Shakah－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_07-Re.jpg",
	"Mi-Ha‵ash-Chemdah－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_08-Re.jpg",
	"Mi-Ha‵ash-Aiyatsbus－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_09-Re.jpg",
	"Mi-Ha‵ash-Qimranut－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_10-Re.jpg",
	"Mi-Ha‵ash-Chiah－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_KING-Re.jpg",
	"Mi-Ha‵ash-Ruach－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_KNIGHT-Re.jpg",
	"Mi-Ha‵ash-Nephesh－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_PAGE-Re.jpg",
	"Mi-Ha‵ash-Neschamah－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/CUPS_QUEEN-Re.jpg",
	"Marmeh-Im-Bacikal－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_01-Re.jpg",
	"Marmeh-Im-Iweleth－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_02-Re.jpg",
	"Marmeh-Im-Sheriruth－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_03-Re.jpg",
	"Marmeh-Im-Adyeshach－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_04-Re.jpg",
	"Marmeh-Im-Akzeriyyuth－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_05-Re.jpg",
	"Marmeh-Im-Kaitul－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_06-Re.jpg",
	"Marmeh-Im-Shakah－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_07-Re.jpg",
	"Marmeh-Im-Chemdah－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_08-Re.jpg",
	"Marmeh-Im-Aiyatsbus－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_09-Re.jpg",
	"Marmeh-Im-Qimranut－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_10-Re.jpg",
	"Marmeh-Im-Chiah－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_KING-Re.jpg",
	"Marmeh-Im-Ruach－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_KNIGHT-Re.jpg",
	"Marmeh-Im-Nephesh－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_PAGE-Re.jpg",
	"Marmeh-Im-Neschamah－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/PANTA_QUEEN-Re.jpg",
	"Mi-Auquinos-Bacikal－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_01-Re.jpg",
	"Mi-Auquinos-Iweleth－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_02-Re.jpg",
	"Mi-Auquinos-Sheriruth－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_03-Re.jpg",
	"Mi-Auquinos-Adyeshach－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_04-Re.jpg",
	"Mi-Auquinos-Akzeriyyuth－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_05-Re.jpg",
	"Mi-Auquinos-Kaitul－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_06-Re.jpg",
	"Mi-Auquinos-Shakah－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_07-Re.jpg",
	"Mi-Auquinos-Chemdah－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_08-Re.jpg",
	"Mi-Auquinos-Aiyatsbus－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_09-Re.jpg",
	"Mi-Auquinos-Qimranut－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_10-Re.jpg",
	"Mi-Auquinos-Chiah－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_KING-Re.jpg",
	"Mi-Auquinos-Ruach－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_KNIGHT-Re.jpg",
	"Mi-Auquinos-Nephesh－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_PAGE-Re.jpg",
	"Mi-Auquinos-Neschamah－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/SWORDS_QUEEN-Re.jpg",
	"Mi-Habekiyeh-Bacikal－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_01-Re.jpg",
	"Mi-Habekiyeh-Iweleth－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_02-Re.jpg",
	"Mi-Habekiyeh-Sheriruth－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_03-Re.jpg",
	"Mi-Habekiyeh-Adyeshach－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_04-Re.jpg",
	"Mi-Habekiyeh-Akzeriyyuth－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_05-Re.jpg",
	"Mi-Habekiyeh-Kaitul－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_06-Re.jpg",
	"Mi-Habekiyeh-Shakah－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_07-Re.jpg",
	"Mi-Habekiyeh-Chemdah－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_08-Re.jpg",
	"Mi-Habekiyeh-Aiyatsbus－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_09-Re.jpg",
	"Mi-Habekiyeh-Qimranut－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_10-Re.jpg",
	"Mi-Habekiyeh-Chiah－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_KING-Re.jpg",
	"Mi-Habekiyeh-Ruach－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_KNIGHT-Re.jpg",
	"Mi-Habekiyeh-Nephesh－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_PAGE-Re.jpg",
	"Mi-Habekiyeh-Neschamah－\nhttps://raw.githubusercontent.com/hktrpg/TG.line.Discord.Roll.Bot/master/assets/tarot/WANDS_QUEEN-Re.jpg",
	"空白"
]

const TarotList2 = ["Amprodias＋",
	"Baratchial＋",
	"Gargophias＋",
	"Dagdagiel＋",
	"Hemethterith＋",
	"Uriens＋",
	"Zamradiel＋",
	"Characith＋",
	"Temphioth＋",
	"Yamatu＋",
	"Kurgasiax＋",
	"Lafcursiax＋",
	"Malkunofat＋",
	"Niantiel＋",
	"Saksaksalim＋",
	"A‵ano‵nin＋",
	"Parfaxitas＋",
	"Tzuflifu＋",
	"Qulielfi＋",
	"Raflifu＋",
	"Shalicu＋",
	"Thantifaxath＋",
	"Mi-Ha‵ash-Bacikal＋",
	"Mi-Ha‵ash-Iweleth＋",
	"Mi-Ha‵ash-Sheriruth＋",
	"Mi-Ha‵ash-Adyeshach＋",
	"Mi-Ha‵ash-Akzeriyyuth＋",
	"Mi-Ha‵ash-Kaitul＋",
	"Mi-Ha‵ash-Shakah＋",
	"Mi-Ha‵ash-Chemdah＋",
	"Mi-Ha‵ash-Aiyatsbus＋",
	"Mi-Ha‵ash-Qimranut＋",
	"Mi-Ha‵ash-Chiah＋",
	"Mi-Ha‵ash-Ruach＋",
	"Mi-Ha‵ash-Nephesh＋",
	"Mi-Ha‵ash-Neschamah＋",
	"Marmeh-Im-Bacikal＋",
	"Marmeh-Im-Iweleth＋",
	"Marmeh-Im-Sheriruth＋",
	"Marmeh-Im-Adyeshach＋",
	"Marmeh-Im-Akzeriyyuth＋",
	"Marmeh-Im-Kaitul＋",
	"Marmeh-Im-Shakah＋",
	"Marmeh-Im-Chemdah＋",
	"Marmeh-Im-Aiyatsbus＋",
	"Marmeh-Im-Qimranut＋",
	"Marmeh-Im-Chiah＋",
	"Marmeh-Im-Ruach＋",
	"Marmeh-Im-Nephesh＋",
	"Marmeh-Im-Neschamah＋",
	"Mi-Auquinos-Bacikal＋",
	"Mi-Auquinos-Iweleth＋",
	"Mi-Auquinos-Sheriruth＋",
	"Mi-Auquinos-Adyeshach＋",
	"Mi-Auquinos-Akzeriyyuth＋",
	"Mi-Auquinos-Kaitul＋",
	"Mi-Auquinos-Shakah＋",
	"Mi-Auquinos-Chemdah＋",
	"Mi-Auquinos-Aiyatsbus＋",
	"Mi-Auquinos-Qimranut＋",
	"Mi-Auquinos-Chiah＋",
	"Mi-Auquinos-Ruach＋",
	"Mi-Auquinos-Nephesh＋",
	"Mi-Auquinos-Neschamah＋",
	"Mi-Habekiyeh-Bacikal＋",
	"Mi-Habekiyeh-Iweleth＋",
	"Mi-Habekiyeh-Sheriruth＋",
	"Mi-Habekiyeh-Adyeshach＋",
	"Mi-Habekiyeh-Akzeriyyuth＋",
	"Mi-Habekiyeh-Kaitul＋",
	"Mi-Habekiyeh-Shakah＋",
	"Mi-Habekiyeh-Chemdah＋",
	"Mi-Habekiyeh-Aiyatsbus＋",
	"Mi-Habekiyeh-Qimranut＋",
	"Mi-Habekiyeh-Chiah＋",
	"Mi-Habekiyeh-Ruach＋",
	"Mi-Habekiyeh-Nephesh＋",
	"Mi-Habekiyeh-Neschamah＋",
	"Amprodias－",
	"Baratchial－",
	"Gargophias－",
	"Dagdagiel－",
	"Hemethterith－",
	"Uriens－",
	"Zamradiel－",
	"Characith－",
	"Temphioth－",
	"Yamatu－",
	"Kurgasiax－",
	"Lafcursiax－",
	"Malkunofat－",
	"Niantiel－",
	"Saksaksalim－",
	"A‵ano‵nin－",
	"Parfaxitas－",
	"Tzuflifu－",
	"Qulielfi－",
	"Raflifu－",
	"Shalicu－",
	"Thantifaxath－",
	"Mi-Ha‵ash-Bacikal－",
	"Mi-Ha‵ash-Iweleth－",
	"Mi-Ha‵ash-Sheriruth－",
	"Mi-Ha‵ash-Adyeshach－",
	"Mi-Ha‵ash-Akzeriyyuth－",
	"Mi-Ha‵ash-Kaitul－",
	"Mi-Ha‵ash-Shakah－",
	"Mi-Ha‵ash-Chemdah－",
	"Mi-Ha‵ash-Aiyatsbus－",
	"Mi-Ha‵ash-Qimranut－",
	"Mi-Ha‵ash-Chiah－",
	"Mi-Ha‵ash-Ruach－",
	"Mi-Ha‵ash-Nephesh－",
	"Mi-Ha‵ash-Neschamah－",
	"Marmeh-Im-Bacikal－",
	"Marmeh-Im-Iweleth－",
	"Marmeh-Im-Sheriruth－",
	"Marmeh-Im-Adyeshach－",
	"Marmeh-Im-Akzeriyyuth－",
	"Marmeh-Im-Kaitul－",
	"Marmeh-Im-Shakah－",
	"Marmeh-Im-Chemdah－",
	"Marmeh-Im-Aiyatsbus－",
	"Marmeh-Im-Qimranut－",
	"Marmeh-Im-Chiah－",
	"Marmeh-Im-Ruach－",
	"Marmeh-Im-Nephesh－",
	"Marmeh-Im-Neschamah－",
	"Mi-Auquinos-Bacikal－",
	"Mi-Auquinos-Iweleth－",
	"Mi-Auquinos-Sheriruth－",
	"Mi-Auquinos-Adyeshach－",
	"Mi-Auquinos-Akzeriyyuth－",
	"Mi-Auquinos-Kaitul－",
	"Mi-Auquinos-Shakah－",
	"Mi-Auquinos-Chemdah－",
	"Mi-Auquinos-Aiyatsbus－",
	"Mi-Auquinos-Qimranut－",
	"Mi-Auquinos-Chiah－",
	"Mi-Auquinos-Ruach－",
	"Mi-Auquinos-Nephesh－",
	"Mi-Auquinos-Neschamah－",
	"Mi-Habekiyeh-Bacikal－",
	"Mi-Habekiyeh-Iweleth－",
	"Mi-Habekiyeh-Sheriruth－",
	"Mi-Habekiyeh-Adyeshach－",
	"Mi-Habekiyeh-Akzeriyyuth－",
	"Mi-Habekiyeh-Kaitul－",
	"Mi-Habekiyeh-Shakah－",
	"Mi-Habekiyeh-Chemdah－",
	"Mi-Habekiyeh-Aiyatsbus－",
	"Mi-Habekiyeh-Qimranut－",
	"Mi-Habekiyeh-Chiah－",
	"Mi-Habekiyeh-Ruach－",
	"Mi-Habekiyeh-Nephesh－",
	"Mi-Habekiyeh-Neschamah－",
	"Chasek"
]

/**
 *  choice 及SORT
 */
async function choice(input, str) {
	let a = input.replace(str[0], '').match(/\S+/ig);
	return str[0] + ' [' + a + '] \n→ ' + a[await rollbase.Dice(a.length) - 1];

}

async function SortIt(input, mainMsg) {
	let a = input.replace(mainMsg[0], '').match(/\S+/ig);
	for (var i = a.length - 1; i >= 0; i--) {
		//var randomIndex = Math.floor(Math.random() * (i + 1));  
		//3 -> 210 , 10, 0
		var randomIndex = await rollbase.Dice(i + 1) - 1
		//3 ->
		//console.log('randomIndex: ', randomIndex)
		var itemAtIndex = a[randomIndex];
		a[randomIndex] = a[i];
		a[i] = itemAtIndex;
	}
	return mainMsg[0] + ' \n→ [ ' + a + ' ]';
}

module.exports = {
	rollDiceCommand: rollDiceCommand,
	initialize: initialize,
	getHelpMessage: getHelpMessage,
	prefixs: prefixs,
	gameType: gameType,
	gameName: gameName
};
