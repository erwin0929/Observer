<template>
	<header>
		<div>
			<router-link :to="{ name: 'home' }">首页</router-link>
			<router-link :to="{ name: 'about' }">关于我们</router-link>
			<router-link :to="{ name: 'product' }">产品</router-link>
			<router-link :to="{ name: 'test' }">测试页</router-link>
			<router-link :to="{ name: 'test2' }">测试页2</router-link>
		</div>
		<div v-text="title" />
	</header>
</template>

<script>
export default {
	name: 'TheHeader',
	props: {
	  title: {
	    type: String,
			required: true
		}
	}
}
</script>

<style scoped lang="less">
	header{
		a{
			margin-right: 15px;
		}
		color: #000;
		height: @headerH;
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		right: 0;
		background-color: papayawhip;
		> *{
			font-size: 20px;
			color: #000;
			margin-right: 50px;
		}
	}
</style>