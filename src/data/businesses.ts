export interface Business {
  id: string;
  name: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  district: string;
}

export const businesses: Business[] = [
  {
    id: '1',
    name: '客隆超市(文化东路店)',
    category: '超市',
    address: '文化东路80号',
    lng: 119.142158,
    lat: 34.843665,
    district: '赣榆区'
  },
  {
    id: '2',
    name: '客隆超市(华中新村店)',
    category: '超市',
    address: '华中新村南门东50米',
    lng: 119.126225,
    lat: 34.848875,
    district: '赣榆区'
  },
  {
    id: '3',
    name: '家得福超市(书香店)',
    category: '超市',
    address: '华中北路141号',
    lng: 119.127075,
    lat: 34.844025,
    district: '赣榆区'
  },
  {
    id: '4',
    name: '客隆超市(红旗路店)',
    category: '超市',
    address: '新世纪花园小区北门北90米',
    lng: 119.139787,
    lat: 34.845627,
    district: '赣榆区'
  },
  {
    id: '5',
    name: '福特多生鲜超市(富山店)',
    category: '超市',
    address: '时代东路富山东城海岸',
    lng: 119.182157,
    lat: 34.835585,
    district: '赣榆区'
  },
  {
    id: '6',
    name: '康济大药房(文化路店)',
    category: '药店',
    address: '新建路26-4号附近',
    lng: 119.123853,
    lat: 34.844692,
    district: '赣榆区'
  },
  {
    id: '7',
    name: '欧尚惠民超市',
    category: '超市',
    address: '怀仁路与文祥路交叉口北80米',
    lng: 119.092972,
    lat: 34.885024,
    district: '赣榆区'
  },
  {
    id: '8',
    name: '夜宵豆腐脑良太厨大排档早餐',
    category: '餐饮',
    address: '海港路2197号',
    lng: 119.174649,
    lat: 34.931047,
    district: '赣榆区'
  },
  {
    id: '9',
    name: '永联优选生活超市(中基尚海花园店)',
    category: '超市',
    address: '怀仁路111号',
    lng: 119.147613,
    lat: 34.817705,
    district: '赣榆区'
  }
];

export const categories = [
  { value: 'all', label: '全部' },
  { value: '超市', label: '超市' },
  { value: '药店', label: '药店' },
  { value: '餐饮', label: '餐饮' },
  { value: '加油站', label: '加油站' },
  { value: '酒店', label: '酒店' },
];

export const districts = [
  { value: 'all', label: '全部区域' },
  { value: '赣榆区', label: '赣榆区' },
  { value: '海州区', label: '海州区' },
  { value: '东海县', label: '东海县' },
];
