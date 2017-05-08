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
  ],
  // 注册资本
  InititalMoney: [
    {
      label: '0-1000万',
      value: '1'
    }, {
      label: '1000-3000万',
      value: '2'
    }, {
      label: '3001-5000万',
      value: '3'
    }, {
      label: '5001万',
      value: '4'
    }
  ],
  // 企业类型
  FirmType: [
    {
      label: '服装生产企业',
      value: '1'
    }, {
      label: '蕾丝生产企业',
      value: '2'
    }, {
      label: '贸易企业',
      value: '3'
    }, {
      label: '其他企业',
      value: '4'
    }
  ],
  // 员工数量
  FirmPersonArr: [
    {
      label: '0-20',
      value: '1'
    }, {
      label: '21-50',
      value: '2'
    }, {
      label: '51-100',
      value: '3'
    }, {
      label: '101以上',
      value: '4'
    }
  ],
  // 年营业额
  TotalMoney: [
    {
      label: '0-1000万',
      value: '1'
    }, {
      label: '1001-5000万',
      value: '2'
    }, {
      label: '5001-15000万',
      value: '3'
    }, {
      label: '150001万以上',
      value: '4'
    }
  ],
  // 设备数量
  MachineNum: [
    {
      label: '0-10台',
      value: '1'
    }, {
      label: '11-20台',
      value: '2'
    }, {
      label: '21-50台',
      value: '3'
    }, {
      label: '51台以上',
      value: '4'
    }
  ]
};
export default DICT;
