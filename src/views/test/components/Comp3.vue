<template>
	<section>
		<p v-text="receive" />
		<p v-text="msg" />
	</section>
</template>

<script>
export default {
	name: 'Com3',
	inject: ['receive'],
	props: {
	  msg: {
	    type: String,
			require: false,
			default: '请输入'
		}
	}
}
</script>

<style scoped lang="less">

</style>