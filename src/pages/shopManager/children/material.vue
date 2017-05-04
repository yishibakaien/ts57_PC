<template lang="html">
  <ts-section>
    <div slot="menu">
      <button class="button" :class="Edit.status?'':'button-blue'" @click="Edit.status=!Edit.status">{{Edit.text}}</button>
    </div>
      <ts-image :src="item.url" width="160" height="160" bottomText="入仓" bottomIcon="menu" @handleImg="chooseImg(item.id)" :key="item.id" v-for="item in imgList" :needChoose="Edit.status" needMenu class="material-img"></ts-image>
      <ts-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="125px" label-position="left">
        <ts-form-item label="活动名称" prop="name">
          <ts-input v-model="ruleForm.name"></ts-input>
        </ts-form-item>
        <ts-form-item label="活动">
          <ts-input v-model="ruleForm.name"></ts-input>
        </ts-form-item>
        <ts-form-item label="提交">
          <ts-input v-model="ruleForm.age"></ts-input>
        </ts-form-item>
        <ts-button @click="submitForm('ruleForm')">你好</ts-button>
      </ts-form>
    <div slot="footer">
      <button class="button button-blue" :disabled="true">删除</button>
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
      chosedImg: [],
      // 编辑状态
      Edit: {
        text: '编辑',
        status: false
      },
      // 是否编辑状态
      imgList: [{
        id: 12,
        url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1749831145,2853971587&fm=23&gp=0.jpg'
      }, {
        id: 1211,
        url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1749831145,2853971587&fm=23&gp=0.jpg'
      }]
    };
  },
  watch: {
    Edit: {
      handler(val) {
        val.text = val.status ? '取消' : '编辑';
      },
      deep: true
    }
  },
  methods: {
    chooseImg(id) {},
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace material{
  @component img{
    margin: 0 18px 18px 0;
  }
}
</style>
