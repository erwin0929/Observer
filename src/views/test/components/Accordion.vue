<!-- 手风琴组件 -->
<template>
	<section>
		<slot />
	</section>
</template>

<script>
export default {
	name: 'Accordion',
	props: {
	  repeat: {
	    type: null,
			required: false,
			default: '请输入'
		}
	},
	methods: {
	  open (uid) {
	    this.$children.map(item => {
        if (item._uid != uid) item.close = false
			})
		}
	}
}
</script>
