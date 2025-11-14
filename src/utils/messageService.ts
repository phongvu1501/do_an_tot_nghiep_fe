// Message service để axios interceptor có thể hiển thị message
let messageApi: {
  error: (content: string) => void;
  success: (content: string) => void;
  warning: (content: string) => void;
  info: (content: string) => void;
} | null = null;

export const setMessageApi = (
  api: {
    error: (content: string) => void;
    success: (content: string) => void;
    warning: (content: string) => void;
    info: (content: string) => void;
  } | null
) => {
  messageApi = api;
};

export const showMessage = {
  error: (content: string) => {
    if (messageApi) {
      messageApi.error(content);
    }
  },
  success: (content: string) => {
    if (messageApi) {
      messageApi.success(content);
    }
  },
  warning: (content: string) => {
    if (messageApi) {
      messageApi.warning(content);
    }
  },
  info: (content: string) => {
    if (messageApi) {
      messageApi.info(content);
    }
  },
};
