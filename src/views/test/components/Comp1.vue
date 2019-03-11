<template>
	<section>
		<p @click="$emit('fromFirst', '来自1组件的数据')">1组件</p>
		<p v-text="receive" />
	</section>
</template>

<script>
export default {
	name: 'Comp1',
	inject: ['receive']
}
</script>

<style lang="less" scoped>
	section{
		border: 2px solid;
		line-height: 55px;
	}
</style>
