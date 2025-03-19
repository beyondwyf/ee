import { NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb';
import Review from '../../models/Review';

// 内存中的模拟数据存储
let mockReviews = [
  {
    _id: '1',
    bathroomId: 'bathroom-1',
    date: '2023-12-15',
    content: '设施非常干净，很满意！洗手台和厕位都保持得很好。',
    rating: 5,
    tags: ['环境整洁', '服务到位'],
    createdAt: new Date('2023-12-15').toISOString(),
    updatedAt: new Date('2023-12-15').toISOString()
  },
  {
    _id: '2',
    bathroomId: 'bathroom-1',
    date: '2024-01-20',
    content: '位置很好找，有明显的标志。但是厕所有点异味。',
    rating: 4,
    tags: ['位置好找'],
    createdAt: new Date('2024-01-20').toISOString(),
    updatedAt: new Date('2024-01-20').toISOString()
  }
];

// 判断是否使用模拟数据模式
const useMockDb = process.env.USE_MOCK_DB === 'true';

// 获取所有点评
export async function GET(request) {
  try {
    // 获取查询参数
    const { searchParams } = new URL(request.url);
    const bathroomId = searchParams.get('bathroomId');
    
    // 如果使用模拟数据模式
    if (useMockDb) {
      console.log('使用模拟数据模式获取点评');
      // 筛选指定卫生间的点评
      const filteredReviews = bathroomId 
        ? mockReviews.filter(review => review.bathroomId === bathroomId)
        : mockReviews;
      
      return NextResponse.json({ reviews: filteredReviews });
    }
    
    // 否则使用MongoDB
    try {
      // 连接数据库
      await dbConnect();
      
      // 构建查询条件
      const query = bathroomId ? { bathroomId } : {};
      
      // 查询数据库
      const reviews = await Review.find(query)
        .sort({ createdAt: -1 }) // 按创建时间降序排列
        .limit(100); // 限制返回数量
      
      return NextResponse.json({ reviews });
    } catch (dbError) {
      console.error('MongoDB连接失败，回退到模拟数据:', dbError);
      
      // 连接失败时回退到模拟数据
      const filteredReviews = bathroomId 
        ? mockReviews.filter(review => review.bathroomId === bathroomId)
        : mockReviews;
      
      return NextResponse.json({ reviews: filteredReviews });
    }
  } catch (error) {
    console.error('获取点评失败:', error);
    return NextResponse.json(
      { error: '获取点评失败' },
      { status: 500 }
    );
  }
}

// 添加新点评
export async function POST(request) {
  try {
    const body = await request.json();
    
    // 基本验证
    if (!body.content || !body.rating) {
      return NextResponse.json(
        { error: '缺少必要字段' },
        { status: 400 }
      );
    }
    
    // 如果使用模拟数据模式
    if (useMockDb) {
      console.log('使用模拟数据模式添加点评');
      // 创建新点评对象
      const newReview = {
        _id: Date.now().toString(),
        bathroomId: body.bathroomId || 'default',
        date: new Date().toISOString().split('T')[0],
        content: body.content,
        rating: body.rating,
        tags: body.tags || [],
        photos: body.photos || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // 添加到模拟数据数组
      mockReviews.unshift(newReview);
      
      return NextResponse.json({ review: newReview }, { status: 201 });
    }
    
    // 否则使用MongoDB
    try {
      // 连接数据库
      await dbConnect();
      
      // 创建新点评
      const newReview = await Review.create({
        bathroomId: body.bathroomId || 'default',
        content: body.content,
        rating: body.rating,
        photos: body.photos || [],
        tags: body.tags || []
      });
      
      return NextResponse.json({ review: newReview }, { status: 201 });
    } catch (dbError) {
      console.error('MongoDB连接失败，回退到模拟数据:', dbError);
      
      // 连接失败时回退到模拟数据
      const newReview = {
        _id: Date.now().toString(),
        bathroomId: body.bathroomId || 'default',
        date: new Date().toISOString().split('T')[0],
        content: body.content,
        rating: body.rating,
        tags: body.tags || [],
        photos: body.photos || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // 添加到模拟数据数组
      mockReviews.unshift(newReview);
      
      return NextResponse.json({ review: newReview }, { status: 201 });
    }
  } catch (error) {
    console.error('创建点评失败:', error);
    return NextResponse.json(
      { error: '处理请求时出错: ' + error.message },
      { status: 500 }
    );
  }
}