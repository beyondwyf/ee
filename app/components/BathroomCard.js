'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faClock,
  faLocationDot,
  faStar,
  faMoneyBill1,
  faSprayCan,
  faHandsWash,
  faMapMarkedAlt,
  faCalendarCheck,
  faBuilding,
  faInfoCircle,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';

import {
  ToiletIcon,
  FemaleToiletIcon,
  ThirdToiletIcon,
  DiapersTableIcon,
  BabyChairIcon,
  HandDryerIcon,
  MirrorIcon,
  WaterTapIcon,
  AutoFlushIcon,
  VoicePromptIcon,
  EmergencyCallIcon,
  HandrailIcon,
  WalkerIcon,
  RampIcon,
  TrashBinIcon,
} from '../icons';

import Modal from './Modal';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';

export default function BathroomCard({ bathroom }) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewStats, setReviewStats] = useState({ avgRating: 0, count: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // 获取评价数据
  useEffect(() => {
    const fetchReviewStats = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/reviews');
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        
        // 计算平均评分
        if (data.reviews && data.reviews.length > 0) {
          const totalRating = data.reviews.reduce((sum, review) => sum + review.rating, 0);
          const avgRating = (totalRating / data.reviews.length).toFixed(1);
          setReviewStats({
            avgRating,
            count: data.reviews.length
          });
        }
      } catch (error) {
        console.error('Error fetching review stats:', error);
        // 使用默认值
        setReviewStats({ avgRating: 4.5, count: 32 });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviewStats();
  }, []);

  const handleOpenReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
  };
  
  // 添加调试信息
  console.log('特色设施数组:', bathroom.facilities.specialFeatures);
  
  return (
    <div className="animate-fade-in relative">
      <div className="space-y-4">
        <header className="bg-primary-600 text-white p-4 sm:p-6 rounded-t-lg">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-xl sm:text-2xl font-bold leading-tight">{bathroom.name}</h1>
            <div className="px-3 py-1 bg-accent-400 rounded-full text-xs sm:text-sm font-medium">
              {bathroom.grade}
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm sm:text-base">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="h-4 w-4" />
            <p>{bathroom.location}</p>
          </div>
        </header>

        {/* 公厕图片展示 */}
        <section className="card shadow-card overflow-hidden">
          <div className="w-full h-56 sm:h-64 md:h-72 lg:h-80 relative">
            <img 
              src="/images/bathroom.jpg" 
              alt={bathroom.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/1200x800?text=公厕图片";
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
                {isLoading ? (
                  <span className="text-white font-medium">加载中...</span>
                ) : (
                  <>
                    <span className="text-white font-medium">{reviewStats.avgRating} 分</span>
                    <span className="text-white/80 text-sm ml-2">({reviewStats.count} 条评价)</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Basic Information */}
        <section className="card shadow-card">
          <h2 className="section-title flex items-center">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-primary-500" />
            基础信息
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="info-label">公厕编号</p>
              <p className="info-value font-medium">{bathroom.code || '无'}</p>
            </div>
            <div>
              <p className="info-label">开放时间</p>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faClock} className="text-primary-400" />
                <p className="info-value font-medium">{bathroom.openingHours}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section className="card shadow-card">
          <h2 className="section-title flex items-center">
            <ToiletIcon className="mr-2 text-primary-500 w-6 h-6" />
            设施设备
          </h2>
          
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3 text-sm sm:text-base">基础配置</h3>
            
            {/* Toilet counts - featured prominently */}
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-4">
              <div className="overflow-x-auto pb-2">
                <div className="flex gap-1 min-w-max">
                  <div className="bg-white rounded-lg shadow-card p-3 flex items-center min-w-18">
                    <div className="relative mr-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-full">
                        <ToiletIcon className="w-8 h-8" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">男厕位</p>
                      <p className="text-xl font-bold text-primary-600">{bathroom.facilities.maleCount} <span className="text-xs text-gray-500">位</span></p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-card p-3 flex items-center min-w-18">
                    <div className="relative mr-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-pink-50 rounded-full">
                        <FemaleToiletIcon className="w-8 h-8" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">女厕位</p>
                      <p className="text-xl font-bold text-primary-600">{bathroom.facilities.femaleCount} <span className="text-xs text-gray-500">位</span></p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-card p-3 flex items-center min-w-18">
                    <div className="relative mr-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-green-50 rounded-full">
                        <ThirdToiletIcon className="w-8 h-8" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">第三卫生间</p>
                      <p className="text-xl font-bold text-primary-600">{bathroom.facilities.thirdCount} <span className="text-xs text-gray-500">间</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Basic features grid with icons */}
            <div className="mb-4">
              <div className="overflow-x-auto pb-2">
                <div className="flex gap-4 min-w-max p-1">
                  {bathroom.facilities.basicFeatures.map((feature, index) => {
                    let imageSrc = '';
                    
                    if (feature === "感应冲水") {
                      imageSrc = '/icons/感应冲水.png';
                    } else if (feature === "冷热水" || feature === "洗手台") {
                      imageSrc = '/icons/冷热水.png';
                    } else if (feature === "镜子") {
                      imageSrc = '/icons/镜子.png';
                    } else if (feature === "烘手机") {
                      imageSrc = '/icons/烘手机.png';
                    } else {
                      console.log('未匹配的基础设施:', feature);
                      imageSrc = '/icons/洗手台.png';
                    }
                    
                    return (
                      <div key={index} className="flex flex-col items-center bg-gray-50 border border-gray-100 rounded-lg p-3 shadow-sm min-w-18">
                        <div className="text-primary-500 text-2xl mb-2">
                          <img src={imageSrc} alt={feature} className="w-8 h-8 object-contain" />
                        </div>
                        <span className="text-sm text-center">{feature}</span>
                      </div>
                    );
                  })}

                  {/* 添加垃圾桶 */}
                  <div className="flex flex-col items-center bg-gray-50 border border-gray-100 rounded-lg p-3 shadow-sm min-w-18">
                    <div className="text-primary-500 text-2xl mb-2">
                      <img 
                        src="/icons/垃圾桶.png" 
                        alt="垃圾桶" 
                        className="w-8 h-8 object-contain" 
                      />
                    </div>
                    <span className="text-sm text-center">垃圾桶</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">无障碍设施</h3>
            <div className="flex flex-wrap gap-2">
              {bathroom.facilities.accessibilityFeatures.map((feature, index) => {
                let icon;
                if (feature === "无障碍坡道" || feature === "坡道") {
                  icon = <RampIcon className="w-4 h-4 mr-1" />;
                } else if (feature === "安全扶手" || feature === "扶手") {
                  icon = <HandrailIcon className="w-4 h-4 mr-1" />;
                } else if (feature === "紧急呼叫按钮" || feature === "紧急呼叫") {
                  icon = <EmergencyCallIcon className="w-4 h-4 mr-1" />;
                } else if (feature === "助行器") {
                  icon = <WalkerIcon className="w-4 h-4 mr-1" />;
                } else if (feature === "高低位洗手台") {
                  icon = <img src="/icons/高低位洗手台.png" alt="高低位洗手台" className="w-4 h-4 mr-1 object-contain" />;
                } else {
                  console.log('未匹配的无障碍设施:', feature);
                  icon = <HandrailIcon className="w-4 h-4 mr-1" />;
                }
                
                return (
                  <div key={index} className="tag bg-secondary-50 text-secondary-700">
                    {icon}
                    <span className="text-sm">{feature}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">特色设施</h3>
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-2 min-w-max">
                <div className="flex flex-col items-center bg-blue-50 border border-blue-100 rounded-lg p-2 shadow-sm min-w-[100px]">
                  <div className="mb-1 w-8 h-8 flex items-center justify-center">
                    <img src="/icons/儿童专用设施.png" alt="儿童专用设施" className="w-8 h-8 object-contain" />
                  </div>
                  <span className="text-xs text-center">儿童专用设施</span>
                </div>
                
                <div className="flex flex-col items-center bg-accent-50 border border-accent-100 rounded-lg p-2 shadow-sm min-w-[100px]">
                  <div className="mb-1 w-8 h-8 flex items-center justify-center">
                    <img src="/icons/尿布台.png" alt="尿布台" className="w-8 h-8 object-contain" />
                  </div>
                  <span className="text-xs text-center">尿布台</span>
                </div>
                
                {bathroom.facilities.specialFeatures.map((feature, index) => {
                  let imageSrc = '';
                  let bgColor = "bg-accent-50";
                  let borderColor = "border border-accent-100";
                  
                  // 一次性儿童坐垫
                  if (feature === "一次性儿童坐垫") {
                    imageSrc = '/icons/一次性儿童坐垫.png';
                    bgColor = "bg-blue-50";
                    borderColor = "border border-blue-100";
                  }
                  // 助行器
                  else if (feature === "助行器") {
                    imageSrc = '/icons/助行器.png';
                    bgColor = "bg-green-50";
                    borderColor = "border border-green-100";
                  }
                  // 语音播报提醒
                  else if (feature === "语音播报提醒") {
                    imageSrc = '/icons/语音播报提醒.png';
                    bgColor = "bg-purple-50";
                    borderColor = "border border-purple-100";
                  }
                  // 可折叠成人坐凳
                  else if (feature === "可折叠成人坐凳") {
                    imageSrc = '/icons/可折叠成人坐凳.png';
                    bgColor = "bg-orange-50";
                    borderColor = "border border-orange-100";
                  }
                  // 婴儿座椅
                  else if (feature.includes("婴儿")) {
                    imageSrc = '/icons/婴儿座椅1.png';
                    bgColor = "bg-accent-50";
                    borderColor = "border border-accent-100";
                  }
                  // 默认图标
                  else {
                    console.log('未匹配的设施:', feature); // 添加调试信息
                    imageSrc = '/icons/洗手台.png';
                    bgColor = "bg-gray-50";
                    borderColor = "border border-gray-100";
                  }
                  
                  return (
                    <div key={index} className={`flex flex-col items-center ${bgColor} ${borderColor} rounded-lg p-2 shadow-sm min-w-[100px]`}>
                      <div className="mb-1 w-8 h-8 flex items-center justify-center">
                        {imageSrc ? (
                          <img src={imageSrc} alt={feature} className="w-8 h-8 object-contain" />
                        ) : (
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">?</div>
                        )}
                      </div>
                      <span className="text-xs text-center">{feature}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Service Information */}
        <section className="card shadow-card">
          <h2 className="section-title flex items-center">
            <FontAwesomeIcon icon={faHandsWash} className="mr-2 text-primary-500" />
            服务信息
          </h2>
          
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">收费标准</h3>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faMoneyBill1} className="text-accent-500" />
              <p className="text-sm">{bathroom.services.fee}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">便民服务</h3>
            <div className="flex flex-wrap gap-2">
              {bathroom.services.amenities.map((amenity, index) => (
                <div key={index} className="tag bg-primary-50 text-primary-700">
                  {amenity}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">导向标识</h3>
            <p className="text-sm">{bathroom.services.signage}</p>
          </div>
        </section>

        {/* Management & Maintenance */}
        <section className="card shadow-card">
          <h2 className="section-title flex items-center">
            <FontAwesomeIcon icon={faBuilding} className="mr-2 text-primary-500" />
            管理维护
          </h2>
          
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">管理单位</h3>
            <p className="text-sm">{bathroom.management.unit}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">清洁记录</h3>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faSprayCan} className="text-secondary-500" />
              <p className="text-sm">{bathroom.management.cleaningSchedule}</p>
            </div>
          </div>
        </section>

        {/* Other Information */}
        <section className="card shadow-card">
          <h2 className="section-title flex items-center">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-primary-500" />
            其他信息
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">开放日期</h3>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faCalendarCheck} className="text-primary-400" />
                <p className="text-sm">{bathroom.otherInfo.openDate}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">最近翻新</h3>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faBuilding} className="text-secondary-500" />
                <p className="text-sm">{bathroom.otherInfo.lastRenovation}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">获奖情况</h3>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faStar} className="text-accent-500" />
              <p className="text-sm">{bathroom.otherInfo.awards}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">周边环境</h3>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faMapMarkedAlt} className="text-primary-500" />
              <p className="text-sm">{bathroom.otherInfo.surroundings}</p>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="card shadow-card">
          <div className="flex justify-between items-center">
            <h2 className="section-title flex items-center">
              <FontAwesomeIcon icon={faStar} className="mr-2 text-primary-500" />
              用户点评
            </h2>
            <button
              onClick={handleOpenReviewModal}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              查看点评
            </button>
          </div>
        </section>

        <Modal isOpen={isReviewModalOpen} onClose={handleCloseReviewModal}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">用户点评</h2>
            <ReviewsList />
          </div>
        </Modal>
      </div>
    </div>
  );
}