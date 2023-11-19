import Header from "@/components/header/Header";
import { useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";

export default function Layout({children}){
     const {theme} = useTheme();
     return <div className={theme==='dark' ? 'dark' : ''}>
          <Header/>
          {children}
          <ToastContainer position="top-right" autoClose={2000} newestOnTop closeOnClick draggable pauseOnHover theme={theme==='dark' ? 'dark' : 'light'}/>
     </div>
}