import React from "react";
import Toast from "react-native-toast-message";

interface ToastProps {
  type: string;
  text1: string;
  text2?: string;
}

const ToastComponent: React.FC<ToastProps> = ({ type, text1, text2 }) => {
  const showToastMessage = async () => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  };

  showToastMessage();

  return null;
};

export default ToastComponent;
