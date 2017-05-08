import tsCheckbox from './checkbox/tsCheckbox.vue';
import tsCheckboxGroup from './checkbox/tsCheckboxGroup.vue';
import tsFilter from './tsFilter.vue';
import tsImage from './tsImage.vue';
import tsRadio from './radio/tsRadio.vue';
import tsRadioGroup from './radio/tsRadioGroup.vue';
import tsSection from './tsSection.vue';
import tsMenuTable from './tsMenuTable.vue';
import tsMenuTableItem from './tsMenuTableItem.vue';
import tsDialog from './tsDialog.vue';
import tsTable from './tsTable.vue';
import tsColumn from './tsColumn.vue';
import tsInput from './tsInput.vue';
import tsSelect from './select/tsSelect.vue';
import tsButton from './tsButton.vue';
import tsForm from './tsForm.vue';
import tsFormItem from './tsFormItem.vue';
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
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};
Components.install = install;
export default Components;
