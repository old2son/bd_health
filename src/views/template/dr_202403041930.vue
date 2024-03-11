<script setup lang="ts">
import { ref, reactive, onMounted, nextTick, computed, provide } from 'vue';
import html2canvas from 'html2canvas'

const data = reactive({
    
})

onMounted(() => {
    const element = document.querySelector("#test") as HTMLElement;
    if (element instanceof HTMLElement) {
        html2canvas(element).then(canvas => {
            document.body.appendChild(canvas);
        });
    } else {
        console.error("Unable to find the element with ID 'capture'");
    }

    saveImg(element)
});

function saveImg(element: HTMLElement | null, setTitle = '', j = 0) {
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
            saveLink.download = setTitle + (j + 1) + '.' + (img_type === 'jpeg' ? 'jpg' : img_type);
            saveLink.click();

            const c = document.querySelector('canvas');
            c && canvas.remove();
        });
    }
}

const id = `202403041930`
</script>

<template>
     <!-- class="dr-202403041930" id="dr-202403041930" -->
    <div class="bg" id="html-canvas" data-id="202403041930">
        <div class="title-wrap">
            <h1 id="title"></h1>
        </div>
        <div class="content" id="content"></div>
    </div>
</template>

<style scoped lang="css">
:root {
	--main-bdr-color: #000;
	--title-color: #b0d796;
	--title-stroke-color: #3e2308;
	--subtitle-color: #3c6421;
	--subtitle-bg-color: #fffde6;
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
	background: v-bind('`url(img/bg/bg_${id}.jpg) center top no-repeat;`');
}

.content {
	width: 1000px;
	margin: 0px auto;
}

.title-wrap {
	padding-top: 65px;
	text-align: center;

	h1 {
		display: inline-block;
		position: relative;
		height: 80px;
		line-height: 80px;
		-webkit-text-stroke-width: 1.5px;
		-webkit-text-stroke-color: var(--title-stroke-color);
		text-shadow: #000 0 4px 0px;
		text-align: center;
		color: var(--title-color);
		font-size: 60px;
		font-family: SourceHanSansCN-Bold;

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
			background: url(img/item/title_star_001.png) center center no-repeat;
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
			background: url(img/item/title_star_002.png) center center no-repeat;
			background-size: auto 100%;
		}
		
	}
}

.subtitle {
	display: table;
	position: relative;
	width: auto;
	height: 100px;
	line-height: 100px;
	margin: 20px 0 0;
	color: var(--subtitle-color);

	.right {
		position: relative;
		z-index: 2;
		float: left;
		color: var(--subtitle-color);
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

.text {
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
}

.summary {
	position: relative;
	line-height: 72px;
	padding: 30px 100px;
	margin-top: 50px;
	border: 4px dashed var(--summary-color);
	border-radius: 20px;
	/* text-align: left; */
	text-align: center;
	color: var(--summary-color);
	font-size: 46px;
	font-family: SourceHanSansCN-Regular;
	/* background: url(img/item/border_001.png) center top no-repeat;
	background-size: 100% 100%; */

	&::before {
		position: absolute;
		left: 50px;
		top: 80px;
		content: '';
		width: 46px;
		height: 46px;
		background: url(img/item/icon_start_001.png) center no-repeat;
		background-size: 100%;
	}

	&::after {
		position: absolute;
		right: 50px;
		bottom: 70px;
		content: '';
		width: 46px;
		height: 46px;
		background: url(img/item/icon_start_001.png) center no-repeat;
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
