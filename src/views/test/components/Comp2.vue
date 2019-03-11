<template>
	<section>
		<p v-text="msg"></p>
		<comp3 v-bind="$attrs" />
	</section>
</template>

<script>
import Comp3 from './Comp3'
export default {
	name: 'Comp2',
	components: {
    Comp3
	},
	data () {
		return {
		  msg: '我还没有数据'
		}
	},
	created () {
	  this.$on('onye', msg => Object.assign(this, { msg }))
	}
}
</script>
