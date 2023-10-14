import Header from "@/components/header/Header";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

export default function Layout({children}){
     return <>
     <Header/>
     <div className="imgBg"><Image src="/images/bg.webp" alt="background" fill/></div>
     {children}
     <ToastContainer position="top-right" autoClose={2000} newestOnTop closeOnClick draggable pauseOnHover/>
     </>
}