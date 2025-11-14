import React, { useEffect } from "react";
import { message } from "antd";
import { setMessageApi } from "../utils/messageService";

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    // Set messageApi để axios interceptor có thể sử dụng
    setMessageApi(messageApi);

    return () => {
      // Cleanup: xóa messageApi khi component unmount
      setMessageApi(null);
    };
  }, [messageApi]);

  return (
    <>
      {contextHolder}
      {children}
    </>
  );
};
