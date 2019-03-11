<!-- 测试页 -->
<template>
	<section class="row" v-text="index" />
</template>

<script>
import GrandSon from '@components/test/GrandSon'
export default {
	name: 'BaseTest',
	props: {
    index: {
	    type: [String, Number],
			required: false,
			default: '请输入值'
		}
	},
	components: {
    GrandSon
	}
}
</script>

<style scoped lang="less">
	.row{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 55px;
		font-size: 16px;
		&:nth-child(odd){
			background-color: #eee;
		}
		&::before{
			content: '我是第';
		}
		&::after{
			content: '个';
		}
	}
	.base-test{
		font-size: 20px;
	}
	.span{
		display: flex;
		border: 1px solid red;
		height: 90px;
	}
	.msg{
		border: 1px solid pink;
		height: 55px;
	}
</style>
