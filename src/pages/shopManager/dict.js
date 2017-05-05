const DICT = {
  // 花型分类
  PatternClassfication: [
    {
      label: '面料',
      value: '100010'
    }, {
      label: '大边',
      value: '100011'
    }, {
      label: '小边',
      value: '100012'
    }, {
      label: '睫毛',
      value: '100013'
    }
  ],
  // 是否有库存
  isStock: [
    {
      label: '需要开机',
      value: '0'
    }, {
      label: '有库存',
      value: '1'
    }
  ],
  // 单位
  Units: [
    {
      label: '公斤',
      value: '400011'
    }, {
      label: '码',
      value: '400010'
    }, {
      label: '条',
      value: '400012'
    }, {
      label: '吨',
      value: '400013'
    }
  ],
  // 大货类型
  BulkType: [
    {
      label: '胚布',
      value: '200010'
    }, {
      label: '成品',
      value: '200011'
    }
  ],
  // 上架至
  PublishStatus: [
    {
      label: '平台',
      value: '2'
    }, {
      label: '店铺',
      value: '1'
    }, {
      label: '本地仓库',
      value: '0'
    }
  ]
};
export default DICT;
