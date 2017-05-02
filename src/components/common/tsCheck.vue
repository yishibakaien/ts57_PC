<template lang="html">
  <div class="ts-checkbox">
    <label class="ts-checkbox-label">
      <input type="checkbox" class="ts-checkbox-checkbox">
      <span class="ts-checkbox-core"></span>
      <span class="ts-checkbox--inner">
        <slot></slot>
      </span>
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="css" scoped>
@import '../../common/css/var.css';
  @component-namespace ts{
    @component checkbox{
      @descendent label{
      }
      @modifier inner{
        vertical-align: middle;
      }
      @descendent checkbox{
          display: none;
          &:checked {
            + .ts-checkbox-core{
              background-color: var(--checkedBg);
            &::after{
              border-color:var(--checkboxColor);
              transform: rotate(45deg) scale(1)
            }
          }
        }
        &[disabled] + .ts-checkbox-core {
          background-color: var(--checkboxDisabled);
        }
      }
      @descendent core{
        display: inline-block;
        background: var(--checkboxBg);
        border-radius: 50%;
        position: relative;
        size:20px;
        vertical-align: middle;
        &:after{
          border:2px solid var(--checkboxColor);
          border-left: 0;
          border-top: 0;
          content:" ";
          position: absolute 3px * * 6px;
          size:4px 10px;
          transform: rotate(45deg) scale(1);
          transition: transform .2s;
        }
      }
    }
  }
</style>
