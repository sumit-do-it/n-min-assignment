import Toast from "react-native-toast-message";

export const showSuccessToast = (message: string) => {
  Toast.show({
    type: "success",
    text1: "Info",
    text2: message,
    position: "bottom",
  });
};
