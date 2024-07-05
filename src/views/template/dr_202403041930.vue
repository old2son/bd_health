<script setup lang="ts">
import { ref, reactive, onMounted, nextTick, watch } from 'vue';
import editText from '@/utils/editText';
import eidtHtmlSetKey from '@/utils/eidtHtmlSetKey';
import html2canvas from 'html2canvas'

const data = reactive({
    title: '尿道炎自愈？别闹，跟我学科学护理！',
    root: [] as any[],
	temp: [
        {
			cont: [
				{
					h2Tl: '注意事项',
					h3Tl: '保持呼吸道通畅：',
					normalText: 
						`
							避免痰液、异物等阻塞呼吸道，影响呼吸功能。
						`
				},
				{
					h3Tl: '合理饮食',
					normalText: 
						`
							患者应以<span class="js-key">清淡、易消化、营养丰富</span>的食物为主，避免辛辣、油腻等刺激性食物。
						`
				},
				{
					h3Tl: '适当锻炼',
					normalText: 
						`
							在病情允许的情况下，患者可进行<span class="js-key">适当的锻炼</span>，以增强呼吸肌的力量，改善肺功能。
						`
				},
				{
					h3Tl: '定期复查',
					normalText: 
						`
							患者应遵医嘱定期复查，以便及时了解病情变化，调整治疗方案。
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
							多喝水，尤其是茶水，可以帮助冲洗尿道，减少细菌滋生。同时，避免食用辛辣、刺激性强的食物，以免刺激尿道，加重症状。
						`
				},
				{
					h3Tl: '个人卫生',
					normalText: 
						`
							注意个人卫生，尤其是性生活后，要及时清洁，避免细菌感染。同时，避免使用公共浴室，以防交叉感染。
						`
				},
			]
        },
    ] as any[]
});

const count = ref(0);

onMounted(async () => {   
    document.title = data.title;
    const $element = document.querySelector('#dr-202403041930') as HTMLElement;
	const $cont = document.getElementById('content') as HTMLElement;
    if ($element instanceof HTMLElement) {
        await nextTick(); // Wait for one frame to ensure element is rendered
        while (count.value <= data.temp.length) {
            data.root.length && data.root.shift();
            data.root.push(data.temp.shift());
			editText(data.root)
            await nextTick(); // Wait for the next render
			eidtHtmlSetKey();
			
			if ($cont.getBoundingClientRect().height >= 1330) {
				console.log(123)
            } 
			else {
				count.value++;
			}

            await saveImg($element, `${document.title}_${count.value}`, count.value); // Save the image
        }
    } 
	else {
        console.error('Unable to find the element with ID');
    }
});

const saveImg = async (element: HTMLElement | null, setTitle: string, i: number) => {
    if (!element) {
        console.error("Invalid element provided to saveImg function");
        return;
    }

    const canvas = await html2canvas(element);
    const imgUri = canvas.toDataURL('image/jpeg', 0.9);
    const saveLink = document.createElement('a');
    saveLink.href = imgUri;
    saveLink.download = setTitle + '.' + 'jpg';
    saveLink.click();
};

</script>

<template>
     <!-- class="dr-202403041930" id="dr-202403041930" -->
    <div class="bg" id="dr-202403041930" data-id="202403041930">
        <div class="title-wrap">
            <h1 id="title">{{ data.title }}</h1>
        </div>
        <div class="content" id="content">
            <template v-for="(item, i) in data.root" :key="i">
            	<template v-if="item.cont" v-for="(c, j) in item.cont" :key="j">
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
