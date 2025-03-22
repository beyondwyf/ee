'use client';

import { useState } from 'react';
import RatingButtons from './RatingButtons';
import SuccessModal from './SuccessModal';
import { CleanIcon, ServiceIcon, NoSmellIcon, HygieneIcon, LocationIcon, ImageIcon, CloseIcon } from '../icons';

export default function ReviewForm({ onReviewAdded, bathroom }) {
  const [formData, setFormData] = useState({
    content: '',
    rating: 3,
    tags: [],
    bathroomId: bathroom?.id || ''
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const availableTags = [
    { text: '环境整洁', icon: CleanIcon },
    { text: '服务到位', icon: ServiceIcon },
    { text: '没有异味', icon: NoSmellIcon },
    { text: '卫生干净', icon: HygieneIcon },
    { text: '位置好找', icon: LocationIcon }
  ];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '提交点评失败');
      }

      setShowSuccessModal(true);
      setFormData({
        content: '',
        rating: 3,
        tags: [],
        bathroomId: bathroom?.id || ''
      });
      
      if (onReviewAdded && data.review) {
        onReviewAdded(data.review);
      }
    } catch (err) {
      setError(err.message || '提交点评时出错');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagClick = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="bg-white h-full flex flex-col rounded-lg shadow-sm p-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">评分</h3>
        <div className="flex items-center mb-4">
          <RatingButtons
            rating={formData.rating}
            onRatingChange={(rating) => setFormData(prev => ({ ...prev, rating }))}
          />
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">选择标签</h3>
        <div className="flex flex-wrap gap-2">
          {availableTags.map(({ text, icon: Icon }) => (
            <button
              key={text}
              type="button"
              onClick={() => handleTagClick(text)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors flex items-center gap-1 ${
                formData.tags.includes(text) 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {text}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="p-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
        
          <SuccessModal
            isOpen={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
          />
        
          <div className="flex-1 mb-3 min-h-[200px]">
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="写下您的感受，分享给更多的人。若有设施损坏情况，您也可以在此说明，感谢您的分享"
              className="w-full h-[180px] border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary text-base"
              required
            />
          </div>

          <div className="mb-3">
            <div className="flex items-center gap-3">
              <label className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <ImageIcon className="text-gray-400 w-6 h-6" />
              </label>
              {selectedImage && (
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
                  >
                    <CloseIcon className="text-gray-500 w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-primary rounded border-gray-300"
                checked={formData.needsRepair}
                onChange={(e) => setFormData(prev => ({ ...prev, needsRepair: e.target.checked }))}
              />
              <span className="ml-2">是否有损坏需要报修</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg text-white font-medium transition-colors ${
              isSubmitting ? 'bg-primary-300' : 'bg-primary hover:bg-primary-600'
            }`}
          >
            {isSubmitting ? '提交中...' : '提交评论'}
          </button>
        </div>
      </form>
    </div>
  );
}