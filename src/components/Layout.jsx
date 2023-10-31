import Header from "@/components/header/Header";
import { useTheme } from "next-themes";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

export default function Layout({children}){
     const {theme} = useTheme()
     return <div className={theme==='dark' ? 'dark' : ''}>
     <Header/>
     <div className="imgBg"><Image src="/images/bg.webp" alt="background" fill/></div>
     {children}
     <ToastContainer position="top-right" autoClose={2000} newestOnTop closeOnClick draggable pauseOnHover/>
     </div>
}