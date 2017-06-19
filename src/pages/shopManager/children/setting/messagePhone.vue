<template lang="html">
  <div class="messagePhone">
      <ts-section>
        <div slot="title">
          接收短信号码<span class="pot-warning" @click="Phone.showNoticeDialog=!Phone.showNoticeDialog">?</span>
        </div>
    <div slot="menu">
      <ts-button type="primary" @click="handleNewPhoneDialog" v-if="phoneList<2">新增号码</ts-button>
      <router-link :to="{path:'/personalCenterPage',query:{'subPath':'3'}}">
        <ts-button type="primary">短信设置</ts-button>
      </router-link>
    </div>
    <!-- Form -->

    <ts-form :model="PhoneForm" ref="PhoneForm" label-width="200px" label-position="left">
      <ts-form-item v-for="(phone,index) in PhoneForm.phoneList" :label="`短信接收号码_${index+1}`">
        <ts-input
        :prop="'phoneList.' + index + '.value'"
        v-model="phone.value"
        style="width:200px"
        placeholder="请输入手机号码"></ts-input>
        <ts-button type="plain" @click="handleEditPhone(phone.value)">修改</ts-button>
        <ts-button type="plain" v-if="phoneList>1" @click="handleDELPhone(phone.value)">删除</ts-button>
      </ts-form-item>
      </ts-form>
    <div v-if="phoneList<=0">
      暂无短信接收号码
    </div>
  </ts-section>
  <!-- 短信接收设置说明对话框 -->
  <ts-dialog v-model="Phone.showNoticeDialog" title="短信接收设置说明" type="alert" alertText="我知道了" @confirm="Phone.showNoticeDialog=false">
    <article class="message-phone-dialog">
    系统在以下几种情况会发送业务短信给您
    <p>1、<i>花型询价</i>：有买家对您网店的某款花型发起询价时会发送短信；</p>
    <p>2、<i>花型索样</i>：有买家对您网店的某款花型发起寄样请求时会发送短信；</p>
    <p>3、<i>求购接单</i>：有厂家对您发布的求购接单时会发送短信；</p>
    <p>4、<i>搜花查看花型</i>：有买家快照找花查看您网店的某款花型时会发送短信；</p>
    <p class="message-phone-dialog--tip">
      您最多可以设置两个接收短信号码
    </p>
    </article>
  </ts-dialog>
  <!-- 添加接收短信号码 -->
  <ts-dialog v-model="Phone.showAddDialog" title="添加接收短信号码" @cancel="cancelAddPhone" @confirm="handleAddPhone('PhoneForm')">
    <ts-form :model="PhoneForm" :rules="rules" ref="PhoneForm" label-width="150px" label-position="left">
      <ts-form-item label="登录密码：" prop="password">
        <ts-input inputType="password" v-model="PhoneForm.password" placeholder="请输入登录密码" ></ts-input>
      </ts-form-item>
      <ts-form-item label="手机电话：" prop="mobile">
        <ts-input v-model="PhoneForm.mobile" placeholder="请输入手机电话"></ts-input>
      </ts-form-item>
    </ts-form>
  </ts-dialog>
    </div>
</template>

<script>
import {
  mapGetters
} from 'vuex';
import {
  updateCompany,
  checkPasswd
} from '@/common/api/api';
export default {
  data() {
    // 检查手机号码
    var valiMobile = async(rule, value, callback) => {
      if (!/^1[34578]\d{9}$/.test(value)) {
        return callback(new Error('请输入正确的手机号码'));
      }
      if (Object.values(this.PhoneForm.phoneList).indexOf(value) > -1) {
        return callback(new Error('不能输入已有短信接收号码'));
      }
      callback();
    };
    // 检查密码
    var valiPassword = async(rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'));
      }
      let res = await checkPasswd({
        userPasswd: this.Encrypt(value)
      });
      if (!res.data.data) {
        return callback(new Error('密码不正确！请输入正确的密码'));
      }
      callback();
    };
    return {
      // 电话
      Phone: {
        showAddDialog: false,
        showNoticeDialog: false,
        number: ''
      },
      // 新增号码表单
      PhoneForm: {
        phoneList: [{
          value: ''
        }, {
          value: ''
        }],
        mobile: '',
        password: ''
      },
      // 验证规则
      rules: {
        mobile: {
          required: true,
          validator: valiMobile,
          trigger: 'blur'
        },
        phone: {
          message: '请输入正确的手机号码',
          pattern: /^1[34578]\d{9}$/,
          trigger: 'blur'
        },
        password: {
          required: true,
          trigger: 'blur',
          validator: valiPassword
        }
      }
    };
  },
  methods: {
    handleBlur(e) {
      e.target.focus();
    },
    // 因为循环不能v-model所以单个监听 => 赋值到phone.number
    async handleEditPhone(item, index) {
      // 数组转为字符串
      await updateCompany({
        noticeList: this.PhoneForm.phoneList.map(item => item.value).toString()
      });
    },
    // 删除绑定的号码
    handleDELPhone(item, index) {
      this.$messagebox.confirm(`确认终止${item}接收平台相关业务短信？`).then(async(action) => {
        this.PhoneForm.phoneList.splice(index, 1);
        let res = await updateCompany({
          noticeList: this.PhoneForm.phoneList.map(item => item.value).toString()
        });
        !res.data.code ? await this.$store.dispatch('getCompanyInfo') : '';
      });
    },
    // 取消添加号码
    cancelAddPhone() {
      this.Phone.showAddDialog = false;
    },
    // 新增短信接收号码
    handleAddPhone(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.PhoneForm.phoneList.push({
            value: this.PhoneForm.mobile,
            key: this.PhoneForm.mobile
          });
          let res = await updateCompany({
            noticeList: this.PhoneForm.phoneList.map(item => item.value).toString()
          });
          if (!res.data.code) {
            this.Phone.showAddDialog = !this.Phone.showAddDialog;
            await this.$store.dispatch('getCompanyInfo');
          } else {
            this.$toast.error(res.data.message);
          }
        } else {
          return false;
        }
      });
    },
    // 新增号码的对话框
    async handleNewPhoneDialog() {
      this.Phone.showAddDialog = !this.Phone.showAddDialog;
    }
  },
  watch: {
    companyInfo: {
      handler(val) {
        let noticeList = !val.noticeList ? [] : val.noticeList.split(',');
        this.PhoneForm.phoneList = noticeList.map(item => {
          return {
            value: item
          };
        });
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['companyInfo']),
    // 电话列表 字符串转为数组
    phoneList() {
      return this.PhoneForm.phoneList.length;
    }
  }
};
</script>

<style lang="css" scoped>
@component-namespace message-phone{
  @component input{
    margin-right: 17px;
    width: 30%;
  }
  @component dialog{
    line-height: 200%;
    i{
      color:red;
    }
    @modifier tip{
      margin-top: 10px;
      text-align: center;
    }
  }
}
.pot-warning{
  color: #FF8400;
  position: relative;
  font-size: 14px;
  width: 21px;
  text-align: center;
  display: inline-block;
  vertical-align: 3px;
  cursor: pointer;
  margin-left:4px;
}
.pot-warning:after{
  content:' ';
  border: 1px solid;
  top:5px;
  height: 20px;
  left:0;
  right:0;
  bottom:0;
  border-radius: 50%;
  position: absolute;
  color:#FF8400;
}
</style>
