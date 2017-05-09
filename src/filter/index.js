/* 针对字典的过滤
规定字典格式：
  是否有库存
  isStock: [
    {
      label: '需要开机',
      value: '0'
    }, {
      label: '有库存',
      value: '1'
    }
  ], */
export const filterDict = (val, $arr, label = 'label') => {
  try {
    if (!val && val.length === 0) {
      return val;
    }
    let filter = $arr.filter(item => item.value.toString() === val.toString());
    return filter[0][label];
  } catch (e) {
    console.log(e);
  }
};
