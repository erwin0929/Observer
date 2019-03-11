<template>
	<section id="abc">
		我靠
		<div e-text="list" class="zzz" id="show">
			<span>
				<a href="#">我透</a>
			</span>
		</div>
		<p>{ojbk}</p>
		<span class="qwe">啊哈哈哈</span>
		<div e-html="html"></div>
		<div e-on:click="hahaha">点击我吧</div>
		<div e-class="what">Asd </div>
		<div>{abc}</div>
		<div class="aasd" :style="{transform: `rotateZ(${angle}deg)`}">阿萨德</div>
	</section>
</template>

<style scoped lang="less">
	#abc{
		font-size: 20px;
		*{
			font-size: 20px;
			border: 2px solid rebeccapurple;
		}
	}
	.aasd{
		background-color: #000;
		position: absolute;
		top: 50%;
		left: 50%;
		transition: 20s transform;
	}
</style>

<script>
import BaseTest from '@components/test/BaseTest'
export default {
	components: {
		BaseTest
	},
	data () {
	  return {
	  	test: '2323asda',
			angle: 50
		}
	},
	created () {
		new Promise(resolve => {
		  setTimeout(() => {
		    resolve({angle: 240})
			}, 1500)
		}).then(res => {
		  const {angle} = res
			this.angle = angle * 30
		})
	},
	mounted () {

    class Watcher {
			constructor(vm, exp, cb) {
			  Object.assign(this, {vm, exp, cb})
        // 此处为了触发属性的getter，从而在dep添加自己，结合Observer更易理解
				this.value = this.get()
			}

      get (key) {
        Dep.target = this
        // 触发getter，添加自己到属性订阅器中
				let value = this.vm[this.exp]
        Dep.target = null
				return value
      }

      update () {
				// 属性值变化时收到通知
			  this.run()
			}

			run () {
			  let value = this.get()
				let oldVal = this.value
				if (value !== oldVal) {
				  this.value = value
					this.cb.call(this.vm, value, oldVal)
				}
			}
    }


    const classUtil = 'class'
    const text = 'text'
    const html = 'html'
		const vfor = 'for'

    const updater = {
      // node: 节点
			// value: 实例下的值
      [text + 'Updater'] (node, value) {
        node.textContent = typeof value === 'undefined' ? '' : value
      },
			[html + 'Updater'] (node, value) {
        node.innerHTML = typeof value === 'undefined' ? '' : value
			},
			[vfor + 'Updater'] (node, value, exp, vm) {
        const arr = exp.split(' ')
				let of = arr[arr.length - 1]
				if (vm[of] instanceof Array) {
          vm[of].map(item => {

					})
				}
			},
			modelUpdater (node, value) {
        node.value = typeof value === 'undefined' ? '' : value
			},
			[classUtil + 'Updater'] (node, value, oldValue) {
        let {className} = node
				className = className.replace(oldValue, '').replace(/\s$/, '')
				let space = className && String(value) ? ' ' : ''
				node.className = className + space + value
			}
    }

	  // node: 节点
		// vm: vue实例
		// exp: 属性值
		// dir: 指令名称,不包含前缀
	  const compileUtil = {
	    [text] (node, vm, exp) {
	      this.bind(node, vm, exp, text)
			},
			[html] (node, vm, exp) {
	      this.bind(node, vm, exp, html)
			},
			[classUtil] (node, vm, exp) {
	      this.bind(node, vm, exp, classUtil)
			},
			[vfor](node, vm, exp) {
	      this.bind(node, vm, exp, vfor)
			},
			bind (node, vm, exp, dir) {
	      let updaterFn = updater[dir + 'Updater']

				// 如果存在该指令, 属性值exp和vm实例下的键名保持一致,则形成绑定
				// 这边就是初始化数据了
				updaterFn && updaterFn(node, vm[exp], exp, vm)

				// 而这边是实例化Watcher,订阅数据变化,绑定更新函数
				new Watcher(vm, exp, function (value, oldValue) {
				  updaterFn && updaterFn(node, value, oldValue)
				})
			},
			eventHandler (node, vm, exp, dir) {
				// 事件名
	      let eventType = dir.split(':')[1],
					fn = vm.$options.methods && vm.$options.methods[exp]
				if (eventType && fn) {
				  node.addEventListener(eventType, fn.bind(vm), false)
				}
			}
		}

		class Dep {
			// 订阅者列表
			subs = []

			// 添加订阅者
			addSub (sub) {
			  this.subs.push(sub)
			}

			// 通知所有订阅者进行更新
			notify () {
			  this.subs.map(sub => sub.update())
			}
		}

		class Compile {
		  constructor (el, vm) {
				this.$vm = vm
		    // 如果是元素节点,复制到$el
				// 如果是字符串那么,使用选择器方法试图将他转为HTMLELEMENT(元素)
		    this.$el = this.isElementNode(el) ? el : document.querySelector(el)
				// 如果为真
				if (this.$el) {
				  // 转换为文档碎片,以提升性能(文档碎片是所有'#abc'下的子节点)
				  this.$fragment = this.node2Fragment(this.$el)
					// 初始化
					this.init()
					this.$el.appendChild(this.$fragment)
				}
			}

			init () {
		    this.compileElement(this.$fragment)
			}

			node2Fragment (el) {
		    // 创建文档碎片对象
		    let fragment = document.createDocumentFragment(), child
				// 获取第一个子节点,且循环插入到新生成的文档对象中
				while(child = el.firstChild) {
		      fragment.appendChild(child)
				}
				// 最后返回该文档对象
				return fragment
			}

			// el 文档碎片
			compileElement (el) {
		    let childNodes = el.childNodes;
				[...childNodes].map(node => {
				  // 获取元素的所有子节点包括后代元素的文本内容
				  let text = node.textContent
					let reg = /\{(.*)\}/

					// 如果是元素节点
					if (this.isElementNode(node)) {
					  this.compile(node)
					}

					// 如果是文本节点
					if (this.isTextNode(node) && reg.test(text)) {
					  this.compileText(node, RegExp.$1)
					}

					// 空的伪数组也为真,所以用length来判断是否还有子节点
					// 如果有则递归遍历,没有的话则跳出该方法
					if (node.childNodes && node.childNodes.length) {
					  this.compileElement(node)
					}
				})
			}

			// 是否是元素节点
      isElementNode (node) {
		    return node.nodeType === 1
			}

      isTextNode (node) {
		    return node.nodeType === 3
			}

			// 是否是内置指令
			isDirective (attr) {
		    return attr.includes('e-')
			}

			// 是否是绑定事件的指令
			isEventDirective (dir) {
		    return dir.includes('on')
			}

      compileText (node, exp) {
		    compileUtil.text(node, this.$vm, exp)
			}

			// 过滤完毕,可以为该元素进行监听和绑定
			compile (node) {
		    // 属性列表
		    let nodeAttrs = node.attributes;
				[...nodeAttrs].map(attr => {
				  // 获取属性名
				  let attrName = attr.name
					if (this.isDirective(attrName)) {
					  // 获取属性值
					  let exp = attr.value
						// 是一个内置指令,删除前缀, v-show => show, v-if => if
						let dir = attrName.substring(2)

						// 是事件指令
						if (this.isEventDirective(dir)) {
						  compileUtil.eventHandler(node, this.$vm, exp, dir)
						} else {
						  // 是常规指令
						  compileUtil[dir] && compileUtil[dir](node, this.$vm, exp)
						}

					}
				})
			}

		}


		const observe = data => {
	    if (!data || typeof data !== 'object') return

			Object.keys(data).map(key => {
			  defineReactive(data, key, data[key])
			})
		}

		const defineReactive = (data, key, val) => {
			const dep = new Dep()
      observe(val)

			Object.defineProperty(data, key, {
			  enumerable: true,
				get () {
			    Dep.target && dep.addSub(Dep.target)
			    return val
				},
				set (newVal) {
			    if (Object.is(val, newVal)) return
			    val = newVal
					// 通知所有订阅者
					dep.notify()
				}
			})
		}


		class Mvvm {
      constructor(options) {
        this.$options = options
				let data = this._data = this.$options.data

				Object.keys(data).map(key => this._proxy(key))

				observe(data, this)
				this.$compile = new Compile(options.el || document.body, this)
			}

			_proxy(key) {
        Object.defineProperty(this, key, {
          enumerable: true,
					get: () => this._data[key],
					set: newVal => this._data[key] = newVal
				})
			}

		}


		let vm = new Mvvm({
			el: '#abc',
			data: {
			  list: '欧克',
				ojbk: 'qwwq阿萨德',
				html: `
					<div class="我靠">雷猴啊</div>
				`,
				what: 'what啊 qwe',
				abc: [123, 4],
				lists: [
					{
					  txt: '哈哈'
					},
					{
					  txt: '我靠'
					},
					{
					  txt: '我黑'
					}
				]
			},
			methods: {
        hahaha () {
					this.list = '我被改变了哦'
				}
			}
		})


		class Element {
      constructor(tagName, props, children = []) {
        Object.assign(this, {tagName, props, children})
			}

			render() {
        let el = document.createElement(this.tagName)
				let {props, children} = this

				Object.keys(props).map(attr => {
					el.setAttribute(attr, props[attr])
				})

				// 遍历子节点,如果是当前实例则调用render渲染(递归),结束条件为:子节点是一个文本节点而非实例
				children.map(child => {
					let childEl = (child instanceof this.constructor) ?
            child.render() :
						document.createTextNode(child)

					el.appendChild(childEl)
				})

				return el
			}

		}

		const el = (tagName, props, children) => {
      return new Element(tagName, props, children)
		}

		let ul = el('ul', {id: 'list', class: 'hasagei', 'data-abc': '好看啊你'}, [
		  el('li', {class: 'item'}, [
		    el('span', {class: '我透'}, ['哈哈哈我狗啊'])
			]),
		  el('li', {class: 'item'}, ['item2']),
		  el('li', {class: 'item'}, ['item3']),
		])

		let ul2 = el('ul', {id: 'ul2', class: 'hasagei', 'data-abc': '我靠'}, [
		  el('li', {class: 'item'}, [
		    el('span', {class: '我透'}, ['哈哈哈我狗啊'])
			]),
		  el('li', {class: 'item'}, ['hahah 黑']),
		  el('li', {class: 'item'}, ['我是神哦']),
		])

		let haha = ul.render()
		let haha2 = ul2.render()

		document.querySelector('#abc').appendChild(haha)
		document.querySelector('#abc').appendChild(haha2)



	},
	watch: {
	  test() {
	    console.log(this.test)
		}
	}
}

</script>






