<template>
	<section>
		<div v-text="dataHahah" />
		<div v-text="abc" />
	</section>
</template>

<script>
export default {
	name: 'GrandSon',
	props: {
	  dataHahah: {
	    type: null,
			required: false,
			default: '请输入值'
		},
		abc: {
	    type: null,
			required: false,
			default: '请输入'
		}
	},
	created () {
	  console.log(this)
	}
}
</script>

<style lang="less" scoped>
	section{
		border: 4px solid red;
	}
</style>