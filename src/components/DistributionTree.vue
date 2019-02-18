<template>
  <div>
    <svg
      :height='settings.height'
      :width='settings.width'
    >
      <g class="svg-content">

        <transition-group
          tag="g"
          name="line"
        >
          <path
            v-for="link in links"
            class="link"
            :key="link.id"
            :d="link.d"
            :style="link.style"
          ></path>
        </transition-group>

        <transition-group
          tag="g"
          name="list"
        >
          <g
            class="node"
            @click="select(index, node)"
            v-for="(node, index) in nodes"
            :key="node.id"
            :style="node.style"
            :class="[node.className, {'highlight': node.highlight}]"
          >
            <circle
              :r="node.r"
              :style="{'fill': index == selected ? '#ff0000' : '#fff'}"
            ></circle>
            <text
              :dx="node.textpos.x"
              :dy="node.textpos.y"
              :style="node.textStyle"
            >{{ node.text }}</text>
            <title>{{ node.date }}</title>
          </g>
        </transition-group>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'DistributionTree',
  props: ['personData'],
  data() {
    return {
      search: '',
      selected: null,
      settings: {
        strokeColor: '#ccc',
        width: 300,
        height: 300,
        padding: 16
      }
    }
  },
  created() {
    window.addEventListener('resize', this.setSize)
  },
  destroyed() {
    window.removeEventListener('resize', this.setSize)
  },
  mounted() {
    setTimeout(this.setSize, 0)
  },
  methods: {
    setSize() {
      const elm = this.$parent.$slots.default[0].elm
      if (elm === undefined) return

      const margin = this.settings.padding * 2
      this.settings.width = elm.clientWidth - margin
      this.settings.height = elm.clientHeight - margin
    },
    select(index, node) {
      this.selected = index
      console.log('Selected node', node)
    }
  },
  computed: {
    root() {
      return this.personData ? this.tree(d3.hierarchy(this.personData)) : null
    },
    tree() {
      return d3.tree().size([this.settings.height, this.settings.width - 200])
    },
    nodes() {
      if (this.root) {
        return this.root.descendants().map(descendant => ({
          id: descendant.data.id,
          date: descendant.data.date.toString(),
          r: 5.5,
          className:
            'node' + (descendant.children ? ' node--internal' : ' node--leaf'),
          text: descendant.data.name,
          highlight:
            descendant.data.name
              .toLowerCase()
              .indexOf(this.search.toLowerCase()) != -1 && this.search != '',
          style: {
            transform:
              'translate(' + descendant.y + 'px,' + descendant.x + 'px)'
          },
          textpos: {
            x: descendant.children ? -8 : 8,
            y: 4
          },
          textStyle: {
            textAnchor: descendant.children ? 'end' : 'start'
          }
        }))
      }
      return null
    },
    links() {
      if (this.root) {
        return this.root
          .descendants()
          .slice(1)
          .map(descendant => {
            return {
              id: descendant.data.id,
              d:
                'M' +
                descendant.y +
                ',' +
                descendant.x +
                'C' +
                (descendant.parent.y + 100) +
                ',' +
                descendant.x +
                ' ' +
                (descendant.parent.y + 100) +
                ',' +
                descendant.parent.x +
                ' ' +
                descendant.parent.y +
                ',' +
                descendant.parent.x,
              style: {
                stroke: this.settings.strokeColor
              }
            }
          })
      }
      return null
    }
  }
}
</script>

<style>
.svg-content {
  transform: translate(100px, 20px);
}
.node {
  opacity: 1;
  margin: 4px 0;
}

.node circle {
  fill: #fff;
  stroke: steelblue;
  stroke-width: 1.5px;
  cursor: pointer;
}

.node text {
  font: 14px 'Helvetica Neue';
  cursor: pointer;
}

.node--internal circle {
  /* fill: #555; */
}

.node--internal text {
  /* text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff; */
}

.link {
  fill: none;
  stroke-width: 1.5px;
  stroke-dasharray: 1000;
  stroke: #ccc;
}

.node:hover {
  pointer-events: all;
  stroke: #ff0000;
}

.node.highlight {
  fill: red;
}

.controls {
  position: fixed;
  top: 16px;
  left: 16px;
  background: #f8f8f8;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
}

.controls > * + * {
  margin-top: 1rem;
}

label {
  display: block;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.line-enter-active,
.line-leave-active {
  transition: all 2s;
  stroke-dashoffset: 0;
}
.line-enter, .line-leave-to /* .list-leave-active for <2.1.8 */ {
  stroke-dashoffset: 1000;
}
</style>
