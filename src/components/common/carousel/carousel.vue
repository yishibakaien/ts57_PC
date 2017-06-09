<template>
<div class="ts-carousel">
  <button class="ts-carousel-arrow left" :class="['is-'+arrow]" @click="arrowEvent(-1)">
    <span><</span>
  </button>
  <div class="ts-carousel-list">
    <div class="ts-carousel-track" :style="trackStyles">
      <slot></slot>
    </div>
  </div>
  <button class="ts-carousel-arrow right" :class="['is-'+arrow]" @click="arrowEvent(1)">
     <span>></span>
  </button>
  <ul :class="['is-'+dots]" class="ts-carousel-dots">
    <template v-for="n in slides.length">
       <li :class="[n - 1 === currentIndex ? 'active' : '']"
           @click="dotsEvent('click', n - 1)"
           @mouseover="dotsEvent('hover', n - 1)">
           <button></button>
       </li>
    </template>
  </ul>
</div>
</template>

<script>
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
    updatePos() {
      this.findChild((child) => {
        child.width = this.listWidth;
        child.height = typeof this.height === 'number' ? `${this.height}px` : this.height;
      });
      this.trackWidth = (this.slides.length || 0) * this.listWidth;
    },
    // use when slot changed
    slotChange() {
      this.$nextTick(() => {
        this.slides = [];
        this.slideInstances = [];
        this.updateSlides(true, true);
        this.updatePos();
        this.updateOffset();
      });
    },
    handleResize() {
      this.listWidth = parseInt(this.$el.style.width);
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
    arrowEvent(offset) {
      this.setAutoplay();
      this.add(offset);
    },
    dotsEvent(event, n) {
      if (event === this.trigger && this.currentIndex !== n) {
        this.currentIndex = n;
        this.$emit('input', n);
        this.setAutoplay();
      }
    },
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
      this.$emit('on-change', oldVal, val);
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
        transition: `transform 500ms ${this.easing}`
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
    &:hover &-arrow-hover {
        opacity: 1;
    }
    @descendent list {
        position: relative;
        display: block;
        overflow: hidden;
        margin: 0;
        padding: 0;
    }
    @descendent dots{
      z-index: 10;
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
        margin: 0 2px;
        padding: 7px 0;
        cursor: pointer;
        &:hover > button {
                opacity: 0.7;
        }
        &.active > button {
                opacity: 1;
                width: 24px;
        }
        button {
         border: 0;
         cursor: pointer;
         background: #8391a5;
         opacity: 0.3;
         display: block;
         width: 16px;
         height: 3px;
         border-radius: 1px;
         outline: none;
         font-size: 0;
         color: transparent;
         transition: all .5s;
        }
      }
      @when inside{
        display: block;
        position: absolute;
        bottom:3px;
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
        color: #fff;
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
}
</style>
