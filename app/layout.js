import './styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

// Prevent Font Awesome from adding its CSS since we did it manually above
config.autoAddCss = false;

export const metadata = {
  title: '厕所信息卡片',
  description: '用于展示和管理厕所信息的Web应用程序',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="bg-gray-100 min-h-screen">
          <main className="container py-4 sm:py-8">
            {children}
          </main>
          <footer className="bg-white py-3 text-center text-gray-500 text-xs border-t border-gray-200">
            <div className="container">
              © {new Date().getFullYear()} 厕所信息卡片系统
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 