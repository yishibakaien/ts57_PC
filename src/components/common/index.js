import tsCheckbox from './checkbox/tsCheckbox.vue';
import tsCheckboxGroup from './checkbox/tsCheckboxGroup.vue';
import tsFilter from './tsFilter.vue';
import tsImage from './tsImage.vue';
import tsRadio from './radio/tsRadio.vue';
import tsRadioGroup from './radio/tsRadioGroup.vue';
import tsSection from './tsSection.vue';
import tsMenuTable from './menutable/tsMenuTable.vue';
import tsMenuTableItem from './menutable/tsMenuTableItem.vue';
import tsDialog from './tsDialog.vue';
import tsTable from './tables/tsTable.vue';
import tsMessageBox from './messagebox/messagebox';
import tsColumn from './tables/tsColumn.vue';
import tsInput from './tsInput.vue';
import tsSelect from './select/tsSelect.vue';
import tsButton from './tsButton.vue';
import tsForm from './forms/tsForm.vue';
import tsFormItem from './forms/tsFormItem.vue';
import tsPagination from '../pageBar/pageBar.vue';
const Components = {
  tsSection,
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
  tsForm,
  tsFormItem
};
const install = function(Vue) {
  for (let i in Components) {
    Vue.component(i, Components[i]);
  };
  Vue.$messagebox = Vue.prototype.$messagebox = tsMessageBox;
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};
Components.install = install;
export default Components;
