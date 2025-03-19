import BathroomCard from './components/BathroomCard';
// import ReviewsList from './components/ReviewsList';

// Sample data based on the markdown content
const bathroomData = {
  id: "bathroom-1",
  name: "庄桥公厕",
  grade: "一类",
  location: "和平街民主街5-15号小区",
  code: "",
  openingHours: "5:30-22:00",
  facilities: {
    maleCount: 7,
    femaleCount: 7,
    thirdCount: 1,
    basicFeatures: [
      "感应冲水", 
      "冷热水", 
      "镜子", 
      "烘手机"
    ],
    accessibilityFeatures: [
      "坡道", 
      "扶手", 
      "紧急呼叫按钮", 
      "高低位洗手台"
    ],
    specialFeatures: [
      "尿布台", 
      "儿童专用设施", 
      "一次性儿童坐垫", 
      "助行器", 
      "语音播报提醒"
    ]
  },
  services: {
    fee: "免费开放",
    amenities: [
      "卫生纸", 
      "洗手液", 
      "便民箱"
    ],
    signage: "周边500米内导向牌、夜间反光标识清晰"
  },
  management: {
    unit: "上海嘉定城发环境服务有限公司五分公司",
    cleaningSchedule: "以跟踪式保洁为主、消毒时间（早、晚两次）",
    complaintPhone: "59121330"
  },
  otherInfo: {
    openDate: "1990年3月",
    lastRenovation: "2020年9月",
    awards: "美丽公厕",
    surroundings: "国潮第一镇的南翔古镇：古漪园、南翔老街（双塔、檀园)、留云禅寺等"
  },
  userReviews: []
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BathroomCard bathroom={bathroomData} />
      
     {/*  <div className="mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-primary-600 border-b pb-2">用户点评</h2>
          <ReviewsList bathroomId={bathroomData.id} />
        </div>
      </div> */}
    </div>
  );
} 