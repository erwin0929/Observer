<template>
  <section class="about-page">
    <icon-svg icon-class="jQuery" />
    <icon-svg icon-class="Vue" />
    <icon-svg icon-class="php" />
    <icon-svg icon-class="React" />
    <icon-svg icon-class="Sass" />
    <icon-svg icon-class="webstorm" />
    <icon-svg icon-class="Angular" />
    <icon-svg icon-class="Adobe-Photoshop" />
    <icon-svg icon-class="Microsoft-Excel" />
    <icon-svg icon-class="Windows" />
    <icon-svg icon-class="HTML5" />
    <icon-svg icon-class="CSS3" />
    <icon-svg icon-class="lemon" />
    <icon-svg icon-class="watermelon" />
    <icon-svg icon-class="glass" />
    <img class="img" src="../../assets/images/about/Vue.png" alt="">
  </section>
</template>

<script>
import mixin from '@mixin/about'
export default {
  name: 'About',
  methods: {
    async getData () {
      // const res = await this.getProductList()
			// console.log(res)
		}
	},
  created () {
		this.getData()
	},
	mixins: [mixin]
}
</script>

<style lang="less" scoped>
  .about-page{
    font-size: 80px;
    transition: all .5s;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    align-content: space-around;
    > *{
      margin: 0 20px;
    }
  }
  .img{
    width: 50px;
  }
</style>