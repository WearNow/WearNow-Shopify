import { FC, ReactNode, createContext, useContext, useState } from 'react';

interface Notification {
  message: string;
  duration?: number;
  clear: () => void;
}

const NotificationContext = createContext<{ showNotification: (message: string, duration?: number) => void } | null>(null);

const alertCircle = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="alert-circle" clip-path="url(#clip0_1441_18948)">
      <path
        id="Icon"
        d="M10 6.66602V9.99935M10 13.3327H10.0084M18.3334 9.99935C18.3334 14.6017 14.6024 18.3327 10 18.3327C5.39765 18.3327 1.66669 14.6017 1.66669 9.99935C1.66669 5.39698 5.39765 1.66602 10 1.66602C14.6024 1.66602 18.3334 5.39698 18.3334 9.99935Z"
        stroke="#D92D20"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1441_18948">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const NotificationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  // 清除通知的函数
  const clearNotification = () => {
    setNotification(null);
  };

  // 显示通知的函数
  const showNotification = (message: string, duration: number = 5000) => {
    setNotification({ message, duration, clear: clearNotification });

    // 使用setTimeout来自动关闭通知
    const timer = setTimeout(() => {
      clearNotification();
    }, duration);

    // 当组件卸载时，清除定时器
    return () => {
      clearTimeout(timer);
    };
  };

  

  // 渲染通知
  const renderNotification = () => {
    if (!notification) return null;

    return (
      <div className="notification" onClick={notification.clear}>
        <div className="fixed bottom-10 right-10 w-96 h-12 p-4 bg-white rounded-xl shadow border border-gray-300">
          <div className="grow shrink basis-0 h-5 justify-start items-start gap-4 flex">
            <div className="w-5 h-5 relative rounded-2xl">
              <div className="w-7 h-7 left-[-5px] top-[-5px] absolute opacity-30 rounded-3xl border-2 border-red-600" />
              <div className="w-9 h-9 left-[-9px] top-[-9px] absolute opacity-10 rounded-3xl border-2 border-red-600" />
              <div className="w-5 h-5 left-[-1px] top-[-1px] absolute">{alertCircle}</div>
            </div>
            <div className="grow shrink basis-0 pr-1 flex-col justify-start items-start gap-3 inline-flex">
              <div className="self-stretch h-4 flex-col justify-start items-start gap-1 flex">
                <div className="self-stretch text-gray-900 text-sm font-medium font-['SF Pro Display'] leading-none">{notification.message}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {renderNotification()}
    </NotificationContext.Provider>
  );
};

const useNotification = () => useContext(NotificationContext);

// 如果需要单独的Notification组件
const NotificationComponent: FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
  <div style={{ zIndex: 9999, position: 'fixed' }} className="fixed bottom-0 right-0 w-96 h-12 p-4 bg-white rounded-xl shadow border border-gray-300">
     <div className="fixed bottom-10 right-10 w-96 h-12 p-4 bg-white rounded-xl shadow border border-gray-300">
          <div className="grow shrink basis-0 h-5 justify-start items-start gap-4 flex">
            <div className="w-5 h-5 relative rounded-2xl">
              <div className="w-7 h-7 left-[-5px] top-[-5px] absolute opacity-30 rounded-3xl border-2 border-red-600" />
              <div className="w-9 h-9 left-[-9px] top-[-9px] absolute opacity-10 rounded-3xl border-2 border-red-600" />
              <div className="w-5 h-5 left-[-1px] top-[-1px] absolute">{alertCircle}</div>
            </div>
            <div className="grow shrink basis-0 pr-1 flex-col justify-start items-start gap-3 inline-flex">
              <div className="self-stretch h-4 flex-col justify-start items-start gap-1 flex">
                <div className="self-stretch text-gray-900 text-sm font-medium font-['SF Pro Display'] leading-none">{message}</div>
              </div>
            </div>
          </div>
        </div>
    </div>
);

export { NotificationComponent, NotificationProvider, useNotification };
