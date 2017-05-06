<template lang="html">
  <ts-section>
    <div slot="menu">
      <ts-button :type="Edit.status?'cancel':'primary'" :class="Edit.status?'':'button-blue'" @click="Edit.status=!Edit.status">{{Edit.text}}</ts-button>
    </div>
    <!-- checkbox-group控制 -->
    <ts-checkbox-group v-model="Image.list">
      <div class="material-img" v-for="item in imgList">
        <ts-checkbox v-show="Edit.status" :label="item.id" class="material-img-checkbox">{{item.text}}</ts-checkbox>
        <ts-image :src="item.url" width="160" height="160" :key="item.id"></ts-image>
        <span class="material-img-tip" v-show="!Edit.status">
            入仓
        </span>
      </div>
    </ts-checkbox-group>
    <div slot="footer">
      <ts-button type="primary" :disabled="Image.status" v-if="Edit.status">删除</ts-button>
    </div>
  </ts-section>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        age: ''
      },
      rules: {
        name: [{
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ]
      },
      // 图片的操作
      Image: {
        list: [], // 选中的图片
        status: false // 能否删除的状态
      },
      // 编辑状态
      Edit: {
        text: '编辑',
        status: false
      },
      // 是否编辑状态
      imgList: [{
        id: 12,
        text: '',
        url: 'static/images/modles/modle1_all.png'
      }, {
        id: 1211,
        text: '',
        url: 'static/images/modles/modle1_back.png'
      }]
    };
  },
  watch: {
    Edit: {
      handler(val) {
        val.text = val.status ? '取消' : '编辑';
      },
      deep: true
    },
    Image: {
      handler(val) {
        val.status = val.list.length <= 0;
      },
      deep: true
    }
  },
  methods: {
  }
};
</script>

<style lang="css" scoped>
:root{
  --material-img-tip-height: 28px;
  --material-img-tip-height: 28px;
  --material-img-tip-bg: rgba(0,0,0,0.4);
  --material-img-tip-text-color: #fff;
  --material-img-checkbox-position: 10px;
}
@component-namespace material{
  @component img{
    margin: 0 18px 18px 0;
    display: inline-block;
    position: relative;
    @descendent checkbox{
      position: absolute var(--material-img-checkbox-position) * * var(--material-img-checkbox-position);
    }
    @descendent tip{
      position: absolute * 0 0 0;
      display: inline-block;
      height: var(--material-img-tip-height);
      line-height: var(--material-img-tip-height);
      background: var(--material-img-tip-bg);
      color: var(--material-img-tip-text-color);
      display: none;
      cursor: pointer;
      text-align: center;
    }
    &:hover{
      .material-img-tip{
        display:block;
      }
    }
  }
}
</style>
