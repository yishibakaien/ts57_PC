const DICT = {
  // 注册资金
  RegisteredMoney: [
    {
      label: '0-1000万',
      dicValue: 1
    }, {
      label: '1001-5000万',
      dicValue: 2
    }, {
      label: '5001-15000万',
      dicValue: 3
    }, {
      label: '15001万以上',
      dicValue: 4
    }
  ],
  // 人数
  Nop: [
    {
      label: '0-20',
      dicValue: 1
    }, {
      label: '21-50',
      dicValue: 2
    }, {
      label: '51-100',
      dicValue: 3
    }, {
      label: '101以上',
      dicValue: 4
    }
  ],
  // 营业额
  Turnover: [
    {
      label: '0-1000万',
      dicValue: 1
    }, {
      label: '1001-5000万',
      dicValue: 2
    }, {
      label: '5001-15000万',
      dicValue: 3
    }, {
      label: '15001万以上',
      dicValue: 4
    }
  ],
  // 企业类型
  CompanyType: [
    {
      label: '蕾丝生产企业',
      dicValue: 1
    }, {
      label: '贸易企业',
      dicValue: 2
    }, {
      label: '服装生产企业',
      dicValue: 3
    }, {
      label: '其他企业',
      dicValue: 4
    }
  ],
  // 花型分类SupplyType
  SupplyType: [
    {
      label: '面料',
      dicValue: 100010
    }, {
      label: '大边',
      dicValue: 100011
    }, {
      label: '小边',
      dicValue: 100012
    }, {
      label: '睫毛',
      dicValue: 100013
    }
  ],
  // 是否有库存
  isStock: [
    {
      label: '需要开机',
      label2: '无库存',
      dicValue: 0
    }, {
      label: '有库存',
      label2: '有库存',
      dicValue: 1
    }
  ],
  // 单位
  PriceUnits: [
    {
      label: '公斤',
      dicValue: 400011
    }, {
      label: '码',
      dicValue: 400010
    }, {
      label: '条',
      dicValue: 400012
    }
  ],
  // 库存单位
  StockUnits: [
    {
      label: '公斤',
      dicValue: 400011
    }, {
      label: '码',
      dicValue: 400010
    }, {
      label: '条',
      dicValue: 400012
    }
  ],
  // 大货类型
  SupplyShapes: [
    {
      label: '胚布',
      dicValue: 200010
    }, {
      label: '成品',
      dicValue: 200011
    }
  ],
  // 上架至
  PublishStatus: [
    {
      label: '平台',
      label2: '上架平台',
      dicValue: 2
    }, {
      label: '店铺',
      label2: '上架店铺',
      dicValue: 1
    }, {
      label: '本地仓库',
      label2: '本地仓库',
      dicValue: 0
    }
  ],
  // 注册资本
  InititalMoney: [
    {
      label: '0-1000万',
      dicValue: 1
    }, {
      label: '1000-3000万',
      dicValue: 2
    }, {
      label: '3001-5000万',
      dicValue: 3
    }, {
      label: '5001万',
      dicValue: 4
    }
  ],
  // 企业类型
  FirmType: [
    {
      label: '服装生产企业',
      dicValue: 1
    }, {
      label: '蕾丝生产企业',
      dicValue: 2
    }, {
      label: '贸易企业',
      dicValue: 3
    }, {
      label: '其他企业',
      dicValue: 4
    }
  ],
  // 员工数量
  FirmPersonArr: [
    {
      label: '0-20',
      dicValue: 1
    }, {
      label: '21-50',
      dicValue: 2
    }, {
      label: '51-100',
      dicValue: 3
    }, {
      label: '101以上',
      dicValue: 4
    }
  ],
  // 年营业额
  TotalMoney: [
    {
      label: '0-1000万',
      dicValue: 1
    }, {
      label: '1001-5000万',
      dicValue: 2
    }, {
      label: '5001-15000万',
      dicValue: 3
    }, {
      label: '150001万以上',
      dicValue: 4
    }
  ],
  SupplyStatus: [
    {
      label: '供应中',
      dicValue: 1
    }, {
      label: '已关闭',
      dicValue: 2
    }
  ],
  // 设备数量
  MachineNum: [
    {
      label: '0-10台',
      dicValue: 1
    }, {
      label: '11-20台',
      dicValue: 2
    }, {
      label: '21-50台',
      dicValue: 3
    }, {
      label: '51台以上',
      dicValue: 4
    }
  ]
};
export default DICT;
