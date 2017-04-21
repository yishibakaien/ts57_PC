// 正则
// 电话
function testMobile(tel) {
    return /^1(3|4|5|7|8)[0-9]\d{8}$/.test(tel || '');
}
// 密码
function testPWD(pwd) {
    return /.{6,}/.test(pwd || '');
}
// 用户名
function testName(name) {
    return /^[\u4E00-\u9FA5]{2,4}$/.test(name);
}

// 企业名字
function testCompanyName(str) {
    return /.{3,}/.test(str || '');
}
// 短信验证码
function testSMSCode(str) {
    return /\d{4}/.test(str || '');
}

export {
  testMobile,
  testPWD,
  testName,
  testCompanyName,
  testSMSCode
};
