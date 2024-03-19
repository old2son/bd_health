<script setup lang="ts">
import { ref, reactive, onMounted, nextTick, computed, provide } from 'vue';
import editText from '@/utils/editText';
import html2canvas from 'html2canvas'

const data = reactive({
    title: '尿道炎自愈？别闹，跟我学科学护理！',
    root: [
        {
			cont: [
				{
					h2Tl: '尿道炎能否自愈',
					h3Tl: '1.了解敌人：漏尿的原因',
					normalText: 
						`
							首先，我们要明确一点，<span class="key">尿道炎不能自愈</span>。如果你有<span class="key">尿频、尿急、尿痛</span>等症状，一定要<span class="key">及时就医</span>，以免病情加重。，以免病情加重。，以免病情加重。
						`
				},
				{
				h3Tl: '2.强化盆底肌',
				normalText: 
					`
						<b>Kegel练习:</b>这是最基础也是最有效的方法之一。<span>每天花几分钟</span>时间做Kegel练习，可以显著改善盆底肌肉的力量。
						<br><br>
						<b>瑜伽和普拉提:</b>这些活动也能帮助您<span>锻炼盆底肌</span>。
					`
				}
			]
        },
        {
            cont: [
				{
					h2Tl: '尿道炎日常护理小贴士',
					h3Tl: '饮食调整',
					normalText: 
						`
							<span>多喝水</span>，尤其是<span>茶水</span>，可以帮助冲洗尿道，减少细菌滋生。同时，<span>避免食用辛辣、刺激性强</span>的食物，以免刺激尿道，加重症状。
						`
				},
				{
					h3Tl: '个人卫生',
					normalText: 
						`
							注意个人卫生，尤其是性生活后，要<span>及时清洁</span>，避免细菌感染。同时，<span>避免使用公共浴室</span>，以防交叉感染。
						`
				},
			]
        },
    ]
});

/* for (let i = 0; i < data.root.length; i++) {
    // 使用 for 循环遍历 cont 数组
    for (let j = 0; j < data.root[i].cont.length; j++) {
        // 在 normalText 中插入 h3Tl
        data.root[i].cont[j].normalText = `<h3>${data.root[i].cont[j].h3Tl}</h3>${data.root[i].cont[j].normalText}`;
    }
} */

editText(data.root);

onMounted(() => {
    document.title = data.title;
    const element = document.querySelector("#dr-202403041930") as HTMLElement;
    if (element instanceof HTMLElement) {
        html2canvas(element).then(canvas => {
            document.body.appendChild(canvas);
        });
    } else {
        console.error("Unable to find the element with ID 'capture'");
    }

	nextTick(() => {
		saveImg(element);
	});
});

function saveImg(element: HTMLElement | null, setTitle = '', i = 0) {
	const realHtml = document.getElementById('html-canvas');
	const width = 1200;

	const img_type = 'jpeg';
	const height = 1600;
	const canvas = document.createElement('canvas');
	const scale = 1; //定义任意放大倍数 支持小数
	canvas.width = width * scale; //定义canvas 宽度 * 缩放
	canvas.height = height * scale; //定义canvas高度 *缩放

    const context = canvas.getContext('2d');
    if (context !== null) {
        context.scale(scale, scale);
    } 
    else {
        console.error('Unable to get 2d context from the canvas');
    }

	var opts = {
		tainttest: true,
		scale: scale, 
		useCORS: true,
		canvas: canvas, 
		logging: true, //日志开关
		width: width, //dom 原始宽度
		height: height, //dom 原始高度
        removeContainer: true,
		name: 'pic'
	};

    if (element) {
        html2canvas(element, opts).then(function (canvas) {
            const imgUri = canvas.toDataURL('image/' + img_type, 0.9);
            const saveLink = document.createElement('a');
            saveLink.href = imgUri;
            saveLink.download = setTitle + (i + 1) + '.' + (img_type === 'jpeg' ? 'jpg' : img_type);
            saveLink.click();

            const c = document.querySelector('canvas');
            c && c.remove();
        });
    }
}

</script>

<template>
     <!-- class="dr-202403041930" id="dr-202403041930" -->
    <div class="bg" id="dr-202403041930" data-id="202403041930">
        <div class="title-wrap">
            <h1 id="title">{{ data.title }}</h1>
        </div>
        <div class="content" id="content">
            <template v-for="(item, i) in data.root" :key="i">
            	<template v-for="(c, j) in item.cont" :key="j">
					<div v-if="c.h2Tl" class="h2-tl">
						<h2 class="right">{{ c.h2Tl }}</h2>
						<i class="line"></i>
					</div>
					<div v-if="c.normalText" class="text-wrap">
						<!-- <b v-if="c.h3Tl" v-html="c.h3Tl"></b> -->
						<div class="cont" v-html="c.normalText"></div>
					</div>
				</template>
            </template>
        </div>
    </div>
</template>

<style >
#dr-202403041930 {
	--main-bdr-color: #000;
	--title-color: #b0d796;
	--title-stroke-color: #3e2308;
	--h2-tl-color: #3c6421;
	--h2-tl-bg-color: #fffde6;
	--text-color: #362e2b;
	--summary-color: #3c6421;
	--key-color: #eb6100;
	--key-bg-color: #000;
	--list-key-color: #3c6421;
	--list-circle-bdr-color: #000;
	--list-circle-bg-color: #f9ff58;
}


.bg {
	width: 1200px;
	height: 1600px;
	margin: auto;
	overflow: hidden;
    background: url(@/assets/images/bg/bg_202403041930.jpg) center top no-repeat;
}

.content {
	width: 1000px;
	margin: 0px auto;
}

.title-wrap {
	padding-top: 110px;
	text-align: center;

	h1 {
		display: inline-block;
		position: relative;
		height: 80px;
		line-height: 80px;
		padding: 0;
		margin: 0;
		-webkit-text-stroke-width: 1.5px;
		-webkit-text-stroke-color: var(--title-stroke-color);
		text-shadow: #000 0 4px 0px;
		text-align: center;
		color: var(--title-color);
		font-size: 60px;
		font-family: SourceHanSansCN-Heavy;

		&::before {
			position: absolute;
			top: 50%;
			left: -30px;
			content: '';
			/* width: 142px; */
			/* height: 222px; */
			width: 50px;
			height: 100px;
			transform: translateY(-50%);
			background: url(@/assets/images/item/title_star_001.png) center center no-repeat;
			background-size: auto 100%;
		}

		&::after {
			position: absolute;
			top: 50%;
			right: -30px;
			content: '';
			/* width: 110px; */
			/* height: 213px; */
			width: 50px;
			height: 100px;
			transform: translateY(-50%);
			background: url(@/assets/images/item/title_star_002.png) center center no-repeat;
			background-size: auto 100%;
		}
		
	}
}

.h2-tl {
	display: table;
	position: relative;
	width: auto;
	height: 100px;
	line-height: 100px;
	margin: 20px 0 0;
	color: var(--h2-tl-color);

	h2 {
		position: relative;
		z-index: 2;
		float: left;
		color: var(--h2-tl-color);
		font-size: 54px;
		font-family: SourceHanSansCN-Bold;
	}

	.line {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 15px;
		z-index: 1;
		content: '';
		height: 25px;
		border-radius: 10px;
		background-color: rgba(163, 231, 117, 0.3);
	}
}

.text-wrap {
	.cont {
		line-height: 64px;
		padding: 0px 30px 20px;
		margin-top: 0px;
		text-align: left;
		color: var(--text-color);
		font-size: 42px;
		font-family: SourceHanSansCN-Regular;

		i {
			color: var(--key-color);
		}

		h3 {
			display: inline;
			color: var(--text-color);
			font-weight: 700;
			font-size: 42px;
			font-family: SourceHanSansCN-Regular;
		}
	}
}

.summary {
	position: relative;
	line-height: 72px;
	padding: 30px 100px;
	margin-top: 50px;
	border: 4px dashed var(--summary-color);
	border-radius: 20px;
	text-align: center;
	color: var(--summary-color);
	font-size: 46px;
	font-family: SourceHanSansCN-Regular;

	&::before {
		position: absolute;
		left: 50px;
		top: 80px;
		content: '';
		width: 46px;
		height: 46px;
		background: url(@/assets/images/item/icon_start_001.png) center no-repeat;
		background-size: 100%;
	}

	&::after {
		position: absolute;
		right: 50px;
		bottom: 70px;
		content: '';
		width: 46px;
		height: 46px;
		background: url(@/assets/images/item/icon_start_001.png) center no-repeat;
		background-size: 100%;
	}

	i {
		position: relative;
		z-index: 1;
		color: var(--list-key-color);
		font-weight: 700;

		&::after {
			position: absolute;
			left: 0;
			right: 0;
			bottom: -10px;
			content: '';
			z-index: -1;
			content: '';
			height: 25px;
			background-color: rgba(163, 231, 117, 0.3);
		}
	}

	i.first {
		&::after {
			border-radius: 8px 0 0 8px;
		}
	}

	i.last {
		&::after {
			border-radius: 0 8px 8px 0;
		}
	}
}

.pic-wrap {
	position: relative;
	padding-right: 300px;
	overflow: hidden;

	img {
		display: block;
		position: absolute;
		right: 0;
		top: 50%;
		margin: 50px auto;
		object-fit: cover;
		transform: translateY(-50%);
	}
}
</style>
