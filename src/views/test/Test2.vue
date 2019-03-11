<template>
	<section>
		<div>
			<p 
				class="info" 
				v-for="(item, index) in completeUserInfo" 
				:key="index">
				{{`${index}: &nbsp;&nbsp;&nbsp;${item}`}}
			</p>
		</div>
		
		<input class="abc" v-model="form.username" type="text" placeholder="修改姓名">
		<input class="abc" v-model="form.gender" :data-src="0 ? true : 0" type="text" placeholder="修改性别">
		<a :target="0 ? true : false" :adsadqwe="Boolean({})">asdsa</a>
		<Button type="error" size="large" @click.native="updateInfo">GO!</Button>
	</section>
</template>

<script>
import testMixin from '@mixin/test'
export default {
	data() {
		return {
			form: {
				username: '',
				gender: ''
			}
		}
	},
	methods: {
		async updateInfo () {
			const res = await this.updateUserInfo(this.form)
			res && (this.form.username = '')
		}
	},
	mixins: [testMixin]
}
</script>

<style lang="less" scoped>
	.info{
		font-size: 25px;
	}
	.abc{
		border: 2px solid;
		font-size: 22px;
		margin: 20px 0;
		padding: 0 10px;
	}
</style>
