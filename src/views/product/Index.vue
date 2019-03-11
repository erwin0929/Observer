<template>
	<scroller
			class="product-page"
			:on-refresh="refresh"
			refreshText="下拉加载更多"
			refresh-layer-color="red">
		<div v-for="(item, index) in items" class="row">
			{{ item }}
		</div>
	</scroller>
</template>

<script>
export default {
	name: 'Product',
  data () {
    return {
      items: []
    }
  },
  created () {
    for (let i = 1; i <= 10; i++) {
      this.items.push(i)
    }

    this.top = 1
    this.bottom = 20
  },

  methods: {
    refresh(done) {
      setTimeout(() => {
        let start = this.top - 1

        for (let i = start; i > start - 10; i--) {
          this.items.splice(0, 0, i + ' keep walking, be 2 with you.')
        }

        this.top = this.top - 10;

        done()
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
	.product-page{
		font-size: 22px;
	}
	.row{
		color: #000;
		height: 55px;
		display: flex;
		align-items: center;
		justify-content: center;
		&:nth-child(odd){
			background-color: #eee;
		}
		&::before{
			/*content: '这是第';*/
		}
		&::after{
			/*content: '条';*/
		}
	}
</style>