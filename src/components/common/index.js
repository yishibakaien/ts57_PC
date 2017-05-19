import tsCheckbox from './checkbox/tsCheckbox.vue';
import tsCheckboxGroup from './checkbox/tsCheckboxGroup.vue';
import tsFilter from './tsFilter.vue';
import tsImage from './tsImage.vue';
import tsRadio from './radio/tsRadio.vue';
import tsRadioGroup from './radio/tsRadioGroup.vue';
import tsSection from './tsSection.vue';
import tsMenuTable from './menutable/tsMenuTable.vue';
import tsMenu from './menutable/tsMenu.vue';
import tsAliupload from '../aliUpload/aliUpload.vue';
import tsMenuTableItem from './menutable/tsMenuTableItem.vue';
import tsDialog from './tsDialog.vue';
import tsTable from './tables/tsTable.vue';
import tsMessageBox from './messagebox/messagebox';
import tsToast from './toast/toast';
import tsColumn from './tables/tsColumn.vue';
import tsInput from './tsInput.vue';
import tsSelect from './select/tsSelect.vue';
import tsButton from './tsButton.vue';
import tsTag from './tsTag.vue';
import tsForm from './forms/tsForm.vue';
import tsFormItem from './forms/tsFormItem.vue';
import tsPagination from './tsPagation.vue';
import tsGrid from './card/tsGrid.vue';
import tsGridItem from './card/tsGridItem.vue';
const Components = {
  tsGrid,
  tsTag,
  tsGridItem,
  tsSection,
  tsToast,
  tsRadioGroup,
  tsRadio,
  tsImage,
  tsFilter,
  tsButton,
  tsCheckboxGroup,
  tsCheckbox,
  tsMenuTable,
  tsMenuTableItem,
  tsDialog,
  tsTable,
  tsColumn,
  tsPagination,
  tsInput,
  tsSelect,
  tsMenu,
  tsForm,
  tsAliupload,
  tsFormItem
};
const install = function(Vue) {
  for (let i in Components) {
    Vue.component(i, Components[i]);
  };
  Vue.$messagebox = Vue.prototype.$messagebox = tsMessageBox;
  Vue.$toast = Vue.prototype.$toast = tsToast;
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};
Components.install = install;
export default Components;
