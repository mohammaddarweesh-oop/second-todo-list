import { createContext, useState } from "react";
import { useContext } from "react";
import SnackBar from "../Components/SnackBar";

const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [openToast, setOpenToast] = useState(false);
  const [message, setMessage] = useState("Empty");

  function showHideToast(mess) {
    setMessage(mess);
    setOpenToast(true);
    setTimeout(() => {
      setOpenToast(false);
    }, 2000);
  }
  return (
    <ToastContext.Provider value={{ showHideToast }}>
      <SnackBar open={openToast} message={message} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
