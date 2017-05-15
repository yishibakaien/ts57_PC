import Vue from 'vue';
import PopupManager from '../../../common/js/utils/popup/popup-manager';
let ToastConstructor = Vue.extend(require('./toast.vue'));
let instance;
let instances = [];
let seed = 1;
var Toast = function(options) {
  if (Vue.prototype.$isServer) {
    return;
  }
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }
  let userOnClose = options.onClose;
  let id = 'message_' + seed++;

  options.onClose = function() {
    Toast.close(id, userOnClose);
  };

  instance = new ToastConstructor({data: options});
  instance.id = id;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
  instance.dom = instance.vm.$el;
  instance.dom.style.zIndex = PopupManager.nextZIndex();
  instances.push(instance);
  return instance.vm;
};
['success', 'warning', 'info', 'error'].forEach(type => {
  Toast[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      };
    }
    options.type = type;
    return Toast(options);
  };
});
Toast.close = function(id, userOnClose) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
};

Toast.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};

export default Toast;
