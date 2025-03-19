import mongoose from 'mongoose';

// 检查mongoose模型是否已存在
const ReviewSchema = new mongoose.Schema({
  bathroomId: {
    type: String,
    required: [true, '请提供卫生间ID'],
    index: true
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  },
  content: {
    type: String,
    required: [true, '请提供评论内容'],
    maxlength: [1000, '评论不能超过1000个字符']
  },
  rating: {
    type: Number,
    required: [true, '请提供评分'],
    min: 1,
    max: 5
  },
  photos: {
    type: [String],
    default: []
  },
  tags: {
    type: [String],
    default: []
  }
}, {
  timestamps: true // 自动添加createdAt和updatedAt字段
});

// NextJS hot-reloading时防止重复编译模型
export default mongoose.models.Review || mongoose.model('Review', ReviewSchema); 