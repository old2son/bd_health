const keywords = [
	'肝脏',
	'胆囊',
	'心血管',
	'刺激性',
	'刺激性食物',
	'避免刺激性食物',
	'避免刺激性',
	'辛辣',
	'抗氧化',
	'抗炎',
	'促进消化',
	'高血压',
	'头晕',
	'疲劳',
	'胃痛',
	'胃炎',
	'胃溃疡',
	'蛋白质',
	'微量元素',
	'维生素',
	'维生素C',
	'维生素B群',
	'矿物质',
	'黄疸',
	'姜茶',
	'薄荷',
	'胡椒',
	'柠檬水',
	'沙拉',
	'果汁',
	'海鲜',
	'奶酪',
	'鸡蛋',
	'酸奶',
	'麦片',
	'燕麦片',
	'适量食用',
	'早餐',
	'午餐',
	'晚餐',
	'甜点',
	'心理压力大',
	'听听音乐',
	'听音乐',
	'看书',
	'看看书',
	'跑步',
	'按摩',
	'瑜伽',
	'拉伸',
	'剧烈运动',
	'避免剧烈运动',
	'污染',
];

const banwords = ['🐢', '⭐️', '星', '@'];

const editText = (root: any[]) => {
	for (let i = 0; i < root.length; i++) {
		for (let j = 0; j < root[i].cont.length; j++) {
			const cont = root[i].cont[j];
			cont?.h3Tl && setH3(cont);
			setKey(cont);
		}
	}
}

const setKey = (cont: { [key: string]: any }) => {
	let text = cont.normalText;
	const parts = text.split(new RegExp('(' + keywords.join('|') + ')'));
	let result = '';
	parts.forEach(function(part: string, index: number) {
		const isKeyword = keywords.indexOf(part) !== -1;
		const isBanword = banwords.indexOf(part) !== -1;
		if (isKeyword && !isBanword) {
			part.split('').map(function(char, index) {
				if (index === 0) {
					result += `<i class="first">${char}</i>`
				}
				else if (index === part.length - 1) {
					result += `<i class="last">${char}</i>`
				}
				else {
					result += `<i>${char}</i>`
				}
			});
		} 
		else {
			result += part;
		}
	});

	cont.normalText = result;
}

const setH3 = (cont: { [key: string]: any }) => {
	cont.normalText = `<h3>${cont.h3Tl}</h3>${cont.normalText}`;
}

export default editText;