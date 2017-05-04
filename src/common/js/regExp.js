// 正则
// 电话
function testMobile(tel) {
    return /^1(3|4|5|7|8)[0-9]\d{8}$/.test(tel || '');
}
// 密码
function testPWD(pwd) {
    return /.{6,16}/.test(pwd || '');
}
// 用户名
function testName(name) {
    return /^[\u4E00-\u9FA5]{2,8}$/.test(name);
}

// 企业名字
function testCompanyName(str) {
    return /.{4,15}/.test(str || '');
}
// 短信验证码
function testSMSCode(str) {
    return /\d{4}/.test(str || '');
}
// email
function testEmail(str) {
	return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str || '');
}
// qq
function testQQ(str) {
	return /^[1-9][0-9]{4,9}/.test(str || '');
}

export {
  testMobile,
  testPWD,
  testName,
  testCompanyName,
  testSMSCode,
  testEmail,
  testQQ
};
