import mongoose from 'mongoose';

// 判断是否使用模拟数据模式
const useMockDb = process.env.USE_MOCK_DB === 'true';

// 只在非模拟模式下检查MongoDB URI
if (!useMockDb) {
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    throw new Error(
      '请在.env.local文件中定义MONGODB_URI环境变量'
    );
  }
}

/**
 * 全局变量mongoose连接
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // 如果是模拟数据模式，直接返回一个空对象
  if (useMockDb) {
    console.log('使用模拟数据模式，跳过MongoDB连接');
    return { db: null, connection: null };
  }
  
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    const MONGODB_URI = process.env.MONGODB_URI;
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error('MongoDB连接失败:', error);
    throw error;
  }
}

export default dbConnect; 