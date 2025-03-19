'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faToilet,
  faWheelchair,
  faBabyCarriage,
  faPhone,
  faClock,
  faLocationDot,
  faStar,
  faMoneyBill1,
  faSprayCan,
  faHandsWash,
  faWater,
  faWind,
  faMapMarkedAlt,
  faCalendarCheck,
  faBuilding,
  faInfoCircle,
  faMapMarkerAlt,
  faSquare,
  faImage,
  faChild,
  faRestroom,
} from '@fortawesome/free-solid-svg-icons';

import Modal from './Modal';
import ReviewForm from './ReviewForm';
import ReviewsList from './ReviewsList';

export default function BathroomCard({ bathroom }) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleOpenReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
  };
  
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
            <FontAwesomeIcon icon={faToilet} className="mr-2 text-primary-500" />
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
                        <div className="flex flex-col items-center justify-center">
                          <FontAwesomeIcon icon={faRestroom} className="text-primary-500 text-lg" />
                          <div className="text-xs font-bold text-primary-500">男</div>
                        </div>
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
                        <div className="flex flex-col items-center justify-center">
                          <FontAwesomeIcon icon={faRestroom} className="text-pink-500 text-lg" />
                          <div className="text-xs font-bold text-pink-500">女</div>
                        </div>
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
                        <div className="flex items-center justify-center">
                          <div className="relative">
                            <FontAwesomeIcon icon={faRestroom} className="text-secondary-500 text-lg" />
                            <FontAwesomeIcon icon={faWheelchair} className="text-secondary-500 text-xs absolute -bottom-2 -right-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">第三卫生间</p>
                      <p className="text-xl font-bold text-primary-600">{bathroom.facilities.thirdCount} <span className="text-xs text-gray-500">位</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Basic features grid with icons */}
            <div className="mb-4">
              <div className="overflow-x-auto pb-2">
                <div className="flex gap-4 min-w-max p-1">
                  <div className="flex flex-col items-center bg-gray-50 border border-gray-100 rounded-lg p-3 shadow-sm min-w-18">
                    <div className="text-primary-500 text-2xl mb-2">
                      <FontAwesomeIcon icon={faHandsWash} />
                    </div>
                    <span className="text-sm text-center">洗手台</span>
                  </div>
                  
                  {bathroom.facilities.basicFeatures.map((feature, index) => {
                    let icon;
                    let iconColor = "text-primary-500";
                    
                    if (feature.includes("感应冲水")) {
                      icon = faWater;
                      iconColor = "text-blue-500";
                    } else if (feature.includes("冷热水")) {
                      icon = faWater;
                      iconColor = "text-blue-500";
                    } else if (feature.includes("镜子")) {
                      icon = faSquare;
                      iconColor = "text-blue-400";
                    } else if (feature.includes("烘手机")) {
                      icon = faWind;
                      iconColor = "text-gray-500";
                    } else {
                      icon = faHandsWash;
                    }
                    
                    return (
                      <div key={index} className="flex flex-col items-center bg-gray-50 border border-gray-100 rounded-lg p-3 shadow-sm min-w-18">
                        {feature.includes("镜子") ? (
                          <div className="relative text-2xl mb-2">
                            <FontAwesomeIcon icon={faSquare} className="text-primary-200" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <FontAwesomeIcon icon={faImage} className="text-white text-xs" />
                            </div>
                          </div>
                        ) : (
                          <div className={`${iconColor} text-2xl mb-2`}>
                            <FontAwesomeIcon icon={icon} />
                          </div>
                        )}
                        <span className="text-sm text-center">{feature}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">无障碍设施</h3>
            <div className="flex flex-wrap gap-2">
              {bathroom.facilities.accessibilityFeatures.map((feature, index) => (
                <div key={index} className="tag bg-secondary-50 text-secondary-700">
                  <FontAwesomeIcon icon={faWheelchair} className="text-secondary-500 mr-1 text-sm" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">特色设施</h3>
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-2 min-w-max">
                {bathroom.facilities.specialFeatures.map((feature, index) => {
                  let icon = faBabyCarriage;
                  let bgColor = "bg-accent-50";
                  let iconColor = "text-accent-500";
                  let borderColor = "border border-accent-100";
                  
                  if (feature.includes("尿布台") || feature.includes("婴儿")) {
                    icon = faBabyCarriage;
                    bgColor = "bg-accent-50";
                    iconColor = "text-accent-500";
                    borderColor = "border border-accent-100";
                  } else if (feature.includes("儿童")) {
                    icon = faChild;
                    bgColor = "bg-blue-50";
                    iconColor = "text-primary-400";
                    borderColor = "border border-blue-100";
                  } else if (feature.includes("第三卫生间") || feature.includes("无障碍")) {
                    icon = faRestroom;
                    bgColor = "bg-secondary-50";
                    iconColor = "text-secondary-500";
                    borderColor = "border border-secondary-100";
                  }
                  
                  return (
                    <div key={index} className={`flex flex-col items-center ${bgColor} ${borderColor} rounded-lg p-2 shadow-sm`}>
                      <div className="text-xl mb-1">
                        <FontAwesomeIcon icon={icon} className={iconColor} />
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