<script>
export default {
  render(h) {
    const Tag = `h${this.tag}`
    return (
      <section>
        {
          this.list.map(({ title }, index) => <Tag id={`a${index}`} class="哈哈哈">{title}</Tag>)
        }
      </section>
    )
  },
  props: {
    tag: {
      type: [Number, String],
      required: true
    }
  },
  created() {
    console.log(this)
  },
  data() {
    return {
      age: '我今年12岁',
      haha: 'show',
      list: [
        {
          title: '哈哈',
          content: '大家好'
        },
        {
          title: '24214水电费',
          content: '234234324'
        },
        {
          title: '史蒂夫',
          content: '大家好'
        },
        {
          title: '驱蚊器翁让4人',
          content: '情味'
        },
        {
          title: '234',
          content: '企鹅王群二'
        }
      ]
    }
  }
}
</script>

