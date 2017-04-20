// create by cloud_cb on 2017/04/20.
'use strict';

// 上传图片，传入input[type=file] 的onchange 事件
// 返回一个 Promise 对象
function uploadPictrue(e) {
  let files = e.target.files;
  if (!files.length) {
    return;
  }
  return _getBase64Image(files[0]);
}

function _getBase64Image(file) {
  let reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (evt) => {
      resolve(evt.target.result);
    };
    reader.onerror = (evt) => {
      reject(evt);
    };
    reader.readAsDataURL(file);
  });
}

export default uploadPictrue;
