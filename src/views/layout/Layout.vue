<template>
	<section class="app">
		<!-- 头部 -->
		<!--<the-header v-bind="banner" />-->
		<!-- 路由出口,页面都在此处渲染 -->
		<main>
			<slider-transition name="fade">
				<keep-alive :include="keepAlive">
					<router-view class="router-view" :key="$route.fullPath" />
				</keep-alive>
			</slider-transition>
		</main>
	</section>
</template>

<script>
import app from '@mixin/app'
import TheHeader from '@components/TheHeader'
export default {
	name: 'Layout',
	data () {
	  return {
      keepAlive: [
        'Product'
			],
			banner: {}
		}
	},
	watch: {
	  // 根据路由来调用不同接口,得到的数据传递给头部组件
	  '$route': {
	    handler ({ name }) {
	      this.banner = this.obj[name]
			},
			immediate: true
		}
	},
	components: {
    TheHeader
	},
	mixins: [app]
}
</script>

<style lang="less" scoped>
	@import "~@/assets/less/animation";
	.app{
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
	}
	.router-view{
		color: #fff;
		height: 100%;
	}
	main{
		width: 100%;
		position: absolute;
		left: 0;
		right: 0;
		top: @headerH;
		bottom: @asideH + @footerH;
		overflow: hidden;
	}
	aside{
		font-size: 23px;
		color: #fff;
		width: 100%;
		height: @asideH;
		position: absolute;
		right: 0;
		left: 0;
		bottom: @footerH;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: mediumpurple;
	}
	footer{
		font-size: 20px;
		width: 100%;
		height: @footerH;
		position: absolute;
		right: 0;
		left: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: powderblue;
	}
</style>
