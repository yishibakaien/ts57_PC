<template>
    <div class="login-mask">
        <transition name="fade">
            <div v-if="isShow" class="mask" @click="hideMask">
            </div>
        </transition>
        <transition name="slide">
            <div v-if="isShow" class="login-wrapper">
                <login></login>
            </div>
        </transition>
    </div>
</template>

<script>
import login from '../login/login';
import * as types from '../../store/types';
export default {
    computed: {
        isShow() {
            return this.$store.state.showLoginMask;
        }
    },
    methods: {
        hideMask() {
            this.$store.commit(types.LOGIN_MASK, false);
        }
    },
    components: {
        login
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
    .mask
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        z-index 100
        background rgba(7,17,27, 0.5)
        &.fade-enter-active,&.fade-leave-active
            transition 0.5s
        &.fade-enter,&.fade-leave-active
            opacity 0
    .login-wrapper
        position fixed
        top 35%
        left 50%
        z-index 111
        text-align center
        transform translate3d(-50%, -50%, 0)
        background #fff
        &.slide-enter-active,&.slide-leave-active
            transition 0.5s
        &.slide-enter,&.slide-leave-active
            transform translate3d(-50%, 0, 0)
            opacity 0
</style>
