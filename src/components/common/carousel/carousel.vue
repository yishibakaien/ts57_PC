<template>
<div class="ts-carousel" @mouseover="listEvent" @mouseout="listEvent">
  <!-- 箭头 - 左 -->
  <button class="ts-carousel-arrow left" :class="['is-'+arrow]" @click="arrowEvent(-1)">
    <span class="ts-arrow left"></span>
  </button>
  <!-- 内容区域 -->
  <div class="ts-carousel-list">
    <div class="ts-carousel-track" :style="trackStyles">
      <slot></slot>
    </div>
  </div>
  <!-- 箭头 - 右 -->
  <button class="ts-carousel-arrow right" :class="['is-'+arrow]" @click="arrowEvent(1)">
     <span class="ts-arrow right"></span>
  </button>
  <ul :class="['is-'+dots]" class="ts-carousel-dots">
    <template v-for="n in slides.length">
       <li :class="[n - 1 === currentIndex ? 'active' : '']"
           @click="dotsEvent('click', n - 1,$event)"
           @mouseover="dotsEvent('hover', n - 1,$event)">
           <button></button>
       </li>
    </template>
  </ul>
</div>
</template>

<script>
import {
  getStyle
} from '@/common/js/dom';
export default {
  data() {
    return {
      listWidth: 0,
      trackWidth: 0,
      trackOffset: 0,
      slides: [],
      slideInstances: [],
      timer: null,
      ready: false,
      currentIndex: this.value
    };
  },
  methods: {
    // 找子组件 => 为了数数
    findChild(cb) {
      const find = function(child) {
        const name = child.$options.componentName;
        if (name) {
          cb(child);
        } else if (child.$children.length) {
          child.$children.forEach((innerChild) => {
            find(innerChild, cb);
          });
        }
      };
      if (this.slideInstances.length || !this.$children) {
        this.slideInstances.forEach((child) => {
          find(child);
        });
      } else {
        this.$children.forEach((child) => {
          find(child);
        });
      }
    },
    updateSlides(init) {
      let slides = [];
      let index = 1;
      this.findChild((child) => {
        slides.push({
          $el: child.$el
        });
        child.index = index++;
        if (init) {
          this.slideInstances.push(child);
        }
      });
      this.slides = slides;
      this.updatePos();
    },
    // 更新位置
    updatePos() {
      this.findChild((child) => {
        child.width = this.listWidth;
        child.height = typeof this.height === 'number' ? `${this.height}px` : this.height;
      });
      this.trackWidth = (this.slides.length || 0) * this.listWidth;
    },
    slotChange() {
      this.$nextTick(() => {
        this.slides = [];
        this.slideInstances = [];
        this.updateSlides(true, true);
        this.updatePos();
        this.handleResize();
        this.updateOffset();
      });
    },
    handleResize() {
      this.listWidth = parseInt(getStyle(this.$el, 'width'));
      this.updatePos();
      this.updateOffset();
    },
    add(offset) {
      let index = this.currentIndex;
      index += offset;
      while (index < 0) index += this.slides.length;
      index = index % this.slides.length;
      this.currentIndex = index;
      this.$emit('input', index);
    },
    // 两边箭头的函数
    arrowEvent(offset) {
      this.setAutoplay();
      this.add(offset);
    },
    // 小点点的函数
    dotsEvent(event, n, e) {
      this.currentIndex = n;
      this.$emit('input', n);
      if (event === 'click' && this.currentIndex !== n) {
        this.setAutoplay();
      } else {
        this.listEvent(e);
      }
    },
    // 内容区的事件
    listEvent(e) {
      // mouseover时候停止=>滚动
      if (['mouseover', 'click'].indexOf(e.type) >= 0) {
        window.clearInterval(this.timer);
      } else {
        this.setAutoplay();
      }
    },
    // 自动轮播设置
    setAutoplay() {
      window.clearInterval(this.timer);
      if (this.autoplay) {
        this.timer = window.setInterval(() => {
          this.add(1);
        }, this.autoplaySpeed);
      }
    },
    updateOffset() {
      this.$nextTick(() => {
        this.trackOffset = this.currentIndex * this.listWidth;
      });
    }
  },
  watch: {
    autoplay() {
      this.setAutoplay();
    },
    autoplaySpeed() {
      this.setAutoplay();
    },
    currentIndex(val, oldVal) {
      this.$emit('change', oldVal, val);
      this.updateOffset();
    },
    height() {
      this.updatePos();
    },
    value(val) {
      this.currentIndex = val;
    }
  },
  mounted() {
    this.updateSlides(true);
    this.handleResize();
    this.setAutoplay();
    window.addEventListener('resize', this.handleResize, false);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize, false);
  },
  props: {
    autoplay: {
      type: Boolean,
      default: false
    },
    autoplaySpeed: {
      type: Number,
      default: 2000
    },
    value: {
      type: Number,
      default: 0
    },
    height: {
      type: [String, Number],
      default: 'auto',
      validator(value) {
        return value === 'auto' || Object.prototype.toString.call(value) === '[object Number]';
      }
    },
    arrow: {
      type: String,
      default: 'hover',
      validator(value) {
        return [
          'hover',
          'always',
          'never'
        ].indexOf(value) > -1;
      }
    },
    dots: {
      type: String,
      default: 'inside',
      validator(value) {
        return [
          'inside',
          'outside',
          'none'
        ].indexOf(value) > -1;
      }
    },
    trigger: {
      type: String,
      default: 'click',
      validator(value) {
        return [
          'click',
          'hover'
        ].indexOf(value) > -1;
      }
    },
    easing: {
      type: String,
      default: 'ease'
    }
  },
  computed: {
    trackStyles() {
      return {
        width: `${this.trackWidth}px`,
        transform: `translate3d(-${this.trackOffset}px, 0px, 0px)`,
        transition: `transform .8s ${this.easing}`
      };
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace ts{
  @component carousel{
    position: relative;
    display: block;
    box-sizing: border-box;
    user-select: none;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
    &-track, &-list {
        transform: translate3d(0, 0, 0);
    }
    &:hover{
      .is-hover{
        opacity: 1;
      }
    }
    @descendent list {
        position: relative;
        display: block;
        overflow: hidden;
        margin: 0;
        padding: 0;
    }
    @descendent dots{
      z-index: 1;
      display: none;
      position: relative;
      list-style: none;
      text-align: center;
      padding: 0;
      width: 100%;
      height: 17px;
      li{
        position: relative;
        display: inline-block;
        vertical-align: top;
        text-align: center;
        margin:0 10px;
        padding: 7px 0;
        cursor: pointer;
        &:hover > button {
                opacity: 0.7;
        }
        &.active > button {
                opacity: 1;
                box-shadow: 0 0 0 4px rgba(76, 147, 253, 0.5);
                background: rgba(76, 147, 253, 1);
                border-radius: 50%;
                border: none;
        }
        button {
         border: 0;
         padding: 0;
         font-size: 0;
         cursor: pointer;
         background: #fff;
         opacity:  0.8;
         transition: box-shadow .5s;
         display: block;
         width: 8px;
         height: 8px;
         border-radius: 50%;
         outline: none;
         color: transparent;
        }
      }
      @when inside{
        display: block;
        position: absolute;
        bottom:10px;
      }
      @when outside{
        display: block;
        margin-top: 7px;
      }
    }
    @descendent arrow{
        border: none;
        outline: none;
        padding: 0;
        margin: 0;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        position: absolute;
        top: 50%;
        z-index: 10;
        transition: .2s;
        text-align: center;
        font-size: 1em;
        transform: translateY(-50%);
        background-color: rgba(31, 45, 61, .11);
        color: #fff;&-always {
            display: inherit;
        }
        @when hover {
            display: inherit;
            opacity: 0;
        }
        @when always {
            display: inherit;
        }

        &-hover {
            display: inherit;

            opacity: 0;
        }
        & > * {
            vertical-align: baseline;
        }
        &:hover {
           background-color: rgba(31, 45, 61, 0.5);
         }
         &.left {
            left: 16px;
          }
        &.right {
            right: 16px;
        }
    }
    @descendent track {
        position: relative;
        top: 0;
        left: 0;
        display: block;
        overflow: hidden;
        z-index: 1;
    }
  }
  @component arrow{
    &.left,&.right{
      &:after{
      content: " ";
      display: inline-block;
      height: 6px;
      width: 6px;
      border-width: 2px 2px 0 0;
      border-color: #fff;
      border-style: solid;
      position: relative;
      top: -2px;
      position: absolute;
      top: 50%;
      right:40%;
      margin-top: -4px;
      }
    }
    &.right:after{
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    }
    &.left:after{
      transform:matrix(-0.71, -0.71, 0.71, -0.71, 0, 0);
    }
  }
}
</style>
