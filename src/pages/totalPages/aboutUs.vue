<template>
	<div class="wrap">
		<v-header>
			<search></search>
		</v-header>
		<v-nav></v-nav>
		<div class="content-wrap">
			<div class="nav">
				<router-link to="homePage">首页</router-link> > 关于我们
			</div>
			<h4>福建坐视布管网络科技有限公司</h4>
			<p>福建坐视布管网络科技有限公司成立于2014年1月，是一家致力于响应供给侧改革，助力传统蕾丝行业互联网+转型的纺织布料B2B产业互联网平台企业，旨在推动长乐区域化纺织蕾丝花边布料企业实现信息化建设，让整个传统纺织链条化产业在互联网平台上提升互联网电商意识。目前长乐地区的蕾丝布料生产量已经占据了全国70%，全球的50%以上，这数百亿级的产值随着近年服装潮流对美和时尚的追求市场需求不断扩大，加之银行金融政策的支持，促使设备的更替提速和企业的没有数据参考的盲目扩产造成了产能过剩，使得以往的卖方市场向买方市场倾斜，造成企业偷工减料，低价促销赊账的纺织上下游恶性竞争循环。</p>
			<img src="../../../static/images/guanyuwomen.png"/>
			<p>坐视布管旗下c统搜57（童叟无欺）智能图像识别通过纹理比对检索帮采购商需求者针对性找到蕾丝产品花型的库存企业，解决了信息不对称造成二次开发的资源浪费，颠覆了以往预生产模式，解决去产能问题。旗下的蕾丝控在线交易平台打通服装厂和设计师，将已有蕾丝布料打版设计成成衣送往各大服装批发市场，让真实的服装订单需求来引导蕾丝企业生产，解决企业的销售渠道和资金回笼问题，让他们有更多的精力投入生产，发挥工匠精神提高产量和质量实现品牌提升，建立核心竞争力。</p>
			<p>坐视布管在广州中大布匹市场的蕾丝产业线下020展厅和线上蕾丝控平台让所有产品花型设计灵感可以承载在我们平台，我们通过设备数据匹配对应具备最优开发成本的企业及时响应订单，配套保证产品质量的快递确认服务，实现在线撮合担保交易。从根本上解决企业账款回收周期的稳定性问题！</p>
			<p>坐视布管目前已拥有全国生产企业2200多家，全球贸易采购商5000多家，服装厂用户数千家，占全球蕾丝布料专业产销市场的70%份额！</p>
			<p>接下来我们还将提供供应链金融，企业saas，专业化众创空间，蕾丝智能织造产业园等服务，从根本上解决企业信息化建设，蕾丝布料品牌文化提升，蕾丝研发创新提升产品应用面等。</p>
			<p>我们希望先带我们企业用互联网武装自己走出去，然后再把全球采购商通过线下展会等互联网渠道引进来，让长乐蕾丝不再是冰冷冷的过剩工业品，而是富有海丝文化的性感工艺品，我们觉得产业互联网是个信号，类似wifi，信号就在那里，等着传统行业来链接，我们坐视布管愿为行业发声！</p>
		</div>
		<div class="content-info">
			<h4>联系我们</h4>
			<p style="margin: 20px 0;">地址：福建长乐市数字福建产业园东湖路33号（8号研发楼）&nbsp;&nbsp;&nbsp;&nbsp;联系电话：17750250757&nbsp;&nbsp;&nbsp;&nbsp; 网址：www.ts57.cn&nbsp;&nbsp;&nbsp;&nbsp;www57lace.com</p>
			<div style="text-align: center;">
				<img src="../../../static/images/WechatIMG59.png" alt="二维码"/>
			</div>
			<p style="padding-bottom: 100px;">扫一扫关注坐视布管统搜57微信公众号</p>
		</div>
	</div>
</template>

<script>
	import { header, nav, search } from '@/components';
	export default {
		components: {
			'vHeader': header,
			'vNav': nav,
			search
		}
	};
</script>

<style lang="scss" scoped>
.wrap {
	min-height: 1100px;
	background: #fff;
	.content-wrap {
		margin: 0 auto;
		width: 1200px;
		.nav {
			margin: 20px 0;
			color: #999999;
			font-size: 15px;
			a {
				color: #999999;
				font-size: 15px;
				&:hover {
					color: #4C93FD;
				}
			}
		}
		h4 {
			margin-bottom: 30px;
			text-align: center;
			color: #333333;
			font-size: 18px;
		}
		p {
			text-indent: 2em;
			font-size: 16px;
			color: #666666;
			line-height: 26px;
		}
		img {
			width: 100%;
			padding: 20px 0;
		}
	}
	.content-info {
		margin: 40px auto 0;
		width: 1200px;
		h4 {
			text-align: center;
			color: #333333;
			font-size: 18px;
		}
		p {
			font-size: 16px;
			color: #666666;
			text-align: center;
			line-height: 26px;
		}
	}
}
</style>
