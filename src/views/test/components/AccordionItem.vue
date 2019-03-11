<!-- 手风琴list -->
<template>
	<section class="accordion-list">
		<p @click="handleClick" v-text="title" />
		<div v-show="close">
			<slot />
		</div>
	</section>
</template>

<script>
export default {
	name: 'AccordionItem',
	props: {
	  title: {
	    type: String,
			require: false,
			default: '请输入'
		}
	},
	data () {
	  return {
	    close: false
		}
	},
	created () {
	  if (this.$parent.repeat) this.close = true
	},
	methods: {
	  handleClick () {
	    this.$parent.open(this._uid)
		}
	}
}
</script>

<style scoped lang="less">
	.accordion-list{
		font-size: 20px;
		border: 2px solid deeppink;
		margin-bottom: 20px;
	}
</style>