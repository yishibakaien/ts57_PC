import tsCheck from './tsCheck.vue';
import tsFilter from './tsFilter.vue';
import tsImage from './tsImage.vue';
import tsRadio from './tsRadio.vue';
import tsRadioGroup from './tsRadioGroup.vue';
import tsSection from './tsSection.vue';
import tsMenuTable from './tsMenuTable.vue';
import tsMenuTableBox from './tsMenuTableBox.vue';
import tsDialog from './tsDialog.vue';
import tsTable from './tsTable.vue';
import tsColumn from './tsColumn.vue';
import tsInput from './tsInput.vue';
const Components = {
  tsSection,
  tsRadioGroup,
  tsRadio,
  tsImage,
  tsFilter,
  tsCheck,
  tsMenuTable,
  tsMenuTableBox,
  tsDialog,
  tsTable,
  tsColumn,
  tsInput
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
