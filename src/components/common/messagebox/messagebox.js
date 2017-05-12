import Vue from 'vue';
import messageboxVue from './messagebox.vue';
import merge from '@/common/js/merge';
let CONFIRM_TEXT = '确定';
let CANCEL_TEXT = '取消';
var defaults = {
  title: '提示',
  message: '',
  type: '',
  showClose: true,
  modalFade: false,
  lockScroll: false,
  closeOnClickModal: true,
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonPosition: 'right',
  confirmButtonText: CONFIRM_TEXT,
  cancelButtonText: CANCEL_TEXT,
  confirmButtonClass: '',
  cancelButtonClass: ''
};
var MessageboxConstructor = Vue.extend(messageboxVue);
var currentMsg,
  instance;
var msgQueue = [];
// 处理回调 => promise
const defaultCallback = action => {
  if (currentMsg) {
    var callback = currentMsg.callback;
    // 回调
    if (typeof callback === 'function') {
      callback(action);
    }
    /**
     * 两种情况：
     * 1.alert情况：即触发confirm=> 直接resolve
     * 2.confirm情况：即触发confirm和cancel => confirm触发resolve cancel触发reject
     */
    if (currentMsg.resolve) {
      var $type = currentMsg.options.$type;
      if ($type === 'confirm') {
        if (action === 'confirm') {
          currentMsg.resolve(action);
        } else if (action === 'cancel' && currentMsg.reject) {
          currentMsg.reject(action);
        }
      } else {
        currentMsg.resolve(action);
      }
    }
  }
};
// 创建实例
var initInstance = function() {
  instance = new MessageboxConstructor({el: document.createElement('div')});
  instance.callback = defaultCallback;
};
var showNextMsg = function() {
  if (!instance) {
    initInstance();
  }
  if (!instance.value || instance.closeTimer) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift();
    }
    var options = currentMsg.options;
    for (var prop in options) {
      if (options.hasOwnProperty(prop)) {
        instance[prop] = options[prop];
      }
    }
    if (options.callback === undefined) {
      instance.callback = defaultCallback;
    }
    let pop = ['modal', 'showClose', 'closeOnClickModal', 'closeOnPressEscape'];
    pop.forEach(prop => {
      if (instance[prop] === undefined) {
        instance[prop] = true;
      }
    });
    document.body.appendChild(instance.$el);
    Vue.nextTick(() => {
      instance.value = true;
    });
  }
};
var MessageBox = function(options, callback) {
  if (typeof options === 'string') {
    options = {
      title: options
    };
    if (arguments[1]) {
      options.message = arguments[1];
    }
    if (arguments[2]) {
      options.type = arguments[2];
    }
  } else if (options.callback && !callback) {
    callback = options.callback;
  }

  if (typeof Promise !== 'undefined') {
    return new Promise(function(resolve, reject) {
      msgQueue.push({options: merge({}, defaults, MessageBox.defaults || {}, options), callback: callback, resolve: resolve, reject: reject});
      showNextMsg();
    });
  } else {
    msgQueue.push({options: merge({}, defaults, MessageBox.defaults || {}, options), callback: callback});
    showNextMsg();
  }
};

MessageBox.setDefaults = function(defaults) {
  MessageBox.defaults = defaults;
};
// alert 初始化
MessageBox.alert = function(message, title, options) {
  if (typeof title === 'object') {
    options = title;
    title = '';
  }
  return MessageBox(merge({
    title: title,
    message: message,
    $type: 'alert',
    closeOnPressEscape: false,
    closeOnClickModal: false
  }, options));
};
// confirm 初始化
MessageBox.confirm = function(message, title, options) {
  if (typeof title === 'object') {
    options = title;
    title = '';
  }
  return MessageBox(merge({
    title: title,
    message: message,
    $type: 'confirm',
    showCancelButton: true
  }, options));
};
// 关闭的时候
MessageBox.close = function() {
  if (!instance) {
    return;
  }
  instance.value = false;
  msgQueue = [];
  currentMsg = null;
};

export default MessageBox;
export {MessageBox};
