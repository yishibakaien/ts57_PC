<template>
<transition name="ts-toast-fade">
  <div class="ts-toast" :class="customClass" v-show="visible" @mouseenter="clearTimer" @mouseleave="startTimer">
    <img src="ts-toast--img" :src="typeImg" v-if="!iconClass">
    <div class="ts-toast--group" :class="{'is-with-icon':iconClass}">
      <p>
        <i class="ts-toast--icon" :class="iconClass" v-if="iconClass"></i> {{message}}
      </p>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      message: '',
      duration: 3000,
      type: 'success',
      iconClass: '',
      onClose: null,
      customClass: '',
      closed: false,
      timer: null
    };
  },
  mounted() {
    this.startTimer();
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
      }
    }
  },
  methods: {
    destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    close() {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose(this);
      }
    },
    clearTimer() {
      clearTimeout(this.timer);
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    }
  },
  computed: {
    typeImg() {
      return require(`../../../../static/images/assets/icon/${this.type}.svg`);
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace ts {
  @component toast {
    min-width:300px;
    box-sizing: border-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    position: fixed;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    background-color: #fff;
    transition: opacity 0.3s, transform .4s;
    overflow: hidden;
    display: flex;
    align-items: center;
    @modifier group {
      margin-left: 38px;
      position: relative;
      height: 20px;
      line-height: 20px;
      display: flex;
      align-items: center;
      @when with-icon {
        margin-left: 0;
      }

      & p {
        font-size: 14px;
        margin: 0 34px 0 0;
        white-space: nowrap;
        color: #666666;
        text-align: justify;
      }
    }

    @modifier img {
      size: 40px;
      position: absolute;
      left: 0;
      top: 0;
    }

    @modifier icon {
      vertical-align: middle;
      margin-right: 8px;
    }


    & .el-icon-circle-check {
      color: #4C93FD;
    }

    & .el-icon-circle-cross {
      color: #ff4949;
    }
    & .el-icon-warning {
      color: #f7ba2a;
    }
  }

  .ts-toast-fade-enter,
  .ts-toast-fade-leave-active {
    opacity: 0;
    transform: translate(-50%, -100%);
  }
}

</style>
