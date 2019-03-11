<script>
export default {
  name: 'HelloWorld',
  props: ['level', 'title'],
  render (h) {
    return h(
      `h${this.level}`,
      [
        h(
          'a',
          {
            domProps: {
              href: `#${this.title}`
            }
          },
          this.$slots.default
        )
      ]
    )
  }
}
</script>

