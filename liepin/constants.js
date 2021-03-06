let industries = [
    {id: 1, name: "互联网/电商", code: '040', type: '互联网/游戏/软件'},
    {id: 2, name: "网络游戏", code: '420', type: '互联网/游戏/软件'},
    {id: 3, name: "计算机软件", code: '010', type: '互联网/游戏/软件'},
    {id: 4, name: "IT服务", code: '030', type: '互联网/游戏/软件'},
    
    {id: 5, name: "电子", code: "050", type: '电子/通信/硬件'},
    {id: 6, name: "通信工程", code: "060", type: '电子/通信/硬件'},
    {id: 7, name: "计算机硬件", code: "020", type: '电子/通信/硬件'},
    
    {id: 8, name: "建筑工程", code: "080", type: '房地产/建筑/物业'},
    {id: 9, name: "规划设计", code: "100", type: '房地产/建筑/物业'},
    {id: 10, name: "房地产服务", code: "090", type: '房地产/建筑/物业'},
    
    {id: 11, name: "银行", code: "130", type: '金融'},
    {id: 12, name: "保险", code: "140", type: '金融'},
    {id: 13, name: "投资", code: "150", type: '金融'},
    {id: 14, name: "会计/审计", code: "430", type: '金融'},
    {id: 15, name: "信托/担保/拍卖/典当", code: "500", type: '金融'},
    
    {id: 16, name: "快消品", code: "190", type: '消费品'},
    {id: 17, name: "批发零售", code: "240", type: '消费品'},
    {id: 18, name: "服装服饰", code: "200", type: '消费品'},
    {id: 19, name: "家电业", code: "210", type: '消费品'},
    {id: 20, name: "办公设备", code: "220", type: '消费品'},
    {id: 21, name: "奢侈品收藏品", code: "460", type: '消费品'},
    {id: 22, name: "工艺品珠宝玩具", code: "470", type: '消费品'},
    
    {id: 23, name: "汽车/摩托车", code: "350", type: '汽车/机械/制造'},
    {id: 24, name: "机械制造", code: "360", type: '汽车/机械/制造'},
    {id: 25, name: "印刷/包装/造纸", code: "180", type: '汽车/机械/制造'},
    {id: 26, name: "原材料加工", code: "370", type: '汽车/机械/制造'},
    {id: 27, name: "工业自动化", code: "340", type: '汽车/机械/制造'},
    
    {id: 28, name: "生物制药工程", code: "270", type: '制药/医疗'},
    {id: 29, name: "医疗保健/美容", code: "280", type: '制药/医疗'},
    {id: 30, name: "医疗器械", code: "290", type: '制药/医疗'},
    
    {id: 31, name: "能源/水利", code: "330", type: '能源/化工/环保'},
    {id: 32, name: "化工", code: "310", type: '能源/化工/环保'},
    {id: 33, name: "采掘/冶炼", code: "320", type: '能源/化工/环保'},
    {id: 34, name: "环境保护", code: "300", type: '能源/化工/环保'},
    {id: 35, name: "新能源", code: "490", type: '能源/化工/环保'},
    
    {id: 36, name: "专业咨询", code: "120", type: '服务/外包/中介'},
    {id: 37, name: "中介服务", code: "110", type: '服务/外包/中介'},
    {id: 38, name: "外包服务", code: "440", type: '服务/外包/中介'},
    {id: 39, name: "检测认证", code: "450", type: '服务/外包/中介'},
    {id: 40, name: "旅游/酒店/餐饮", code: "230", type: '服务/外包/中介'},
    {id: 41, name: "娱乐休闲", code: "260", type: '服务/外包/中介'},
    {id: 42, name: "租赁服务", code: "510", type: '服务/外包/中介'},
    
    {id: 43, name: "广告会展", code: "070", type: '广告/传媒/教育/文化'},
    {id: 44, name: "影师文化", code: "170", type: '广告/传媒/教育/文化'},
    {id: 45, name: "教育培训", code: "380", type: '广告/传媒/教育/文化'},
    
    {id: 46, name: "运输物流", code: "250", type: '交通/贸易/物流'},
    {id: 47, name: "进出口贸易", code: "160", type: '交通/贸易/物流'},
    {id: 48, name: "航空航天", code: "480", type: '交通/贸易/物流'},
    
    {id: 49, name: "政府机构", code: "390", type: '政府/农林牧渔'},
    {id: 50, name: "农林牧渔", code: "410", type: '政府/农林牧渔'},
    {id: 51, name: "其他行业", code: "400", type: '政府/农林牧渔'},
];

let keywords = [
    "Java", "Php", "Python", "Ruby", "Node.JS", ".NET", "ASP", "C#", "C++", "C", "Delphi", "Go", "Docker", "Hadoop", "Spark", "HBase", "Openstack",
    "数据挖掘", "自然语言处理", "推荐系统", "搜索引擎", "全栈工程师", "iOS", "Android", "U3D", "COCOS2D-X", "HTML5", "Web前端", "Javascript",
    "测试工程师", "自动化测试", "功能测试", "性能测试", "测试开发", "硬件测试", "运维工程师", "系统工程师", "网络工程师", "运维开发", "DBA", "技术经理", "架构师",
    "技术总监", "CTO", "技术合伙人", "运维总监", "安全专家", "项目总监", "产品经理", "网页产品经理", "移动产品经理", "产品助理", "数据产品经理", "游戏策划",
    "电商产品经理", "网页产品设计师", "移动产品设计师", "产品总监", "游戏制作人", "产品部经理", "UI设计师", "视觉设计师", "网页设计师", "APP设计师", "平面设计师",
    "flash设计师", "美术设计师", "广告设计师", "多媒体设计师", "原画师", "游戏特效", "游戏界面设计师", "游戏场景", "游戏角色", "游戏动作", "交互设计师", "网页交互设计师",
    "无线交互设计师", "硬件交互设计师", "数据分析师", "用户研究员", "游戏数值策划", "设计经理", "设计总监", "交互设计经理", "交互设计总监", "用户研究经理", "用户研究总监",
    "运营经理", "运营专员", "内容运营", "产品运营", "用户运营", "活动运营", "数据运营", "新媒体运营", "商家运营", "品类运营", "游戏运营", "网络推广", "海外运营", "网站运营",
    "副主编", "内容编辑", "文案策划", "记者", "客服经理", "运营总监", "主编", "COO", "客服总监", "成本经理", "成本主管",
    "招投标工程师", "投资总监", "投资经理", "融资总监", "融资经理", "前期经理", "前期主管", "建筑工程师", "机电工程师", "技术工程师", "预算工程师", "土建工程师", "水电工程师",
    "质检工程师", "安全工程师", "测绘", "工程监理", "安全管理", "项目经理", "项目主管", "项目专员", "项目助理", "项目工程师", "项目总经理", "建筑设计师",
    "结构设计师", "结构工程师", "总图工程师", "室内设计", "经营人员", "CAD绘图员", "城市规划", "规划设计师",
    "市政设计", "工程经理", "客服主管", "安全经理", "销售总监", "销售经理", "销售主管", "置业顾问", "策划经理", "策划主管", "市场部经理", "招商经理", "招商总监",
    "客户经理", "支行行长", "综合柜员", "理财经理", "公司业务客户经理", "销售代表", "零售客户经理", "支行副行长", "公司客户经理", "高级客户经理", "风险经理", "财务管理岗",
    "对公客户经理", "业务代表", "财富管理客户经理", "个人银行业务部", "副行长", "银行柜员", "零售业务客户经理", "Teller", "风险管理岗", "投资银行项目经理", "投资银行高级项目经理",
    "固定收益", "资产管理", "风险控制", "合规法律", "运营", "系统开发", "运行维护", "委托资产", "金融市场业岗", "产品研发", "保险经纪", "理财规划师", "经理助理", "理财顾问", "培训讲师",
    "业务员", "储备主管", "综合内勤", "业务经理", "讲师", "银行保险客户经理", "业务主管", "银保客户经理",
    "投资银行执行岗", "投资银行项目负责人", "并购项目经理", "并购总监", "债券发行执行岗", "资本市场部经理", "资产证券化项目经理", "资产证券化产品经理", "首席分析师", "宏观分析师",
    "策略分析师", "金融工程分析师", "证券分析师", "上市公司分析师", "信用交易", "合规", "清算", "投资顾问", "区域经理", "证券经纪人", "营销总监", "营销经理", "渠道经理", "证券客户经理", "投资顾问助理",
    "团队经理", "高级投资顾问", "资深客户经理", "营销主管", "证券投资顾问", "营销团队长", "固定收益投资经理", "基金会计", "基金经理", "行业研究员",
    "交易员", "基金投资顾问", "基金营销经理", "渠道销售经理", "信托部门负责人", "信托经理", "高级信托经理", "信托财富中心理财经理", "高级理财经理", "渠道销售", "个人销售", "风控经理", "风控总监",
    "期货经纪人", "市场开发人员", "市场开发", "期货分析师", "研究员", "营业部副总经理", "客户人员", "市场总监", "营业部总经理", "分析师", "研发人员", "市场营销人员",
    "产品主管", "渠道专员", "品牌策划", "业务推动主管", "业务推动专员", "企划经理", "高级企划经理", "高级业务经理", "大区经理", "营业部经理", "数据分析岗", "渠道拓展经理", "股权投资经理", "风险管理", "市场业务岗",
    "资金募集岗", "定增业务", "风险质控经理", "投后管理经理", "首席财务官CFO", "财务总监", "财务分析", "财务顾问", "会计经理", "成本管理", "审计经理", "税务经理",
    "统计员", "研发总监", "研发经理", "研发专员", "数据分析员", "注册总监", "注册经理", "注册专员", "工厂经理", "工厂厂长", "生产经理", "运作经理", "产品开发", "总工程师", "副总工程师",
    "工艺设计经理", "包装工程师", "产品工程师", "产品专员", "市场经理", "市场主管", "市场专员", "市场营销助理", "品牌总监", "品牌经理", "品牌助理", "活动策划", "促销主管", "采购总监", "采购经理",
    "供应链总监", "供应链经理", "供应链主管", "供应链专员", "物流总监", "物流经理", "物流专员", "仓库经理", "仓储调度", "质检", "QA经理", "测试主管", "质量检测员", "认证工程师", "审核员",
    "体系工程师", "可靠度工程师", "化验员", "销售专员", "客户总监", "客户专员", "渠道总监", "分销经理", "大区总监", "城市经理", "大客户销售经理", "开发经理", "生产总监", "市场营销经理", "货运代理",
    "质量管理", "大客户总监", "大客户经理", "分销总监", "店长", "督导", "品牌设计师", "空间设计师", "汽车动力系统工程师", "底盘工程师", "总装工程师", "汽车电子工程师",
    "汽车装配工艺工程师", "汽车零部件设计师", "安全性能工程师", "机械设计师", "材料工程师", "汽车项目管理", "装配工艺工程师", "发动机工程师", "试制工程师汽车造型设计师", "检验师",
    "汽车销售", "模具工程师", "机械设计工程师", "生产工艺工程师", "技术员", "自动化工程师",
    "电器工程师", "嵌入式软件开发", "机械工程师", "电气工程师",
    "测试经理", "模拟电路设计", "FAE现场应用工程师", "工艺工程师", "电子元器件工程师", "IC设计工程师", "视频工程师", "制造工程师", "生产设备管理",
    "外贸经理", "市场专员/助理", "市场营销专员/助理", "分销/渠道经理", "商务经理", "业务跟单", "贸易主管", "渠道/分销总监", "研发专员/助理", "化验/检验", "采购专员/助理", "物流专员/助理", "仓库经理/主管",
    "研发工程师", "合成工程师", "环保工程师"
];

//for test
// keywords = ["Java", "Php", "Python", "Ruby"];
// industries = [
//     {id: 1, name: "互联网/电商", code: '040', type: '互联网/游戏/软件'},
//     {id: 2, name: "网络游戏", code: '420', type: '互联网/游戏/软件'},
//     {id: 3, name: "计算机软件", code: '010', type: '互联网/游戏/软件'}
// ];


module.exports = {
    industries,
    keywords
};