import Header from "@/components/header/Header";
import Image from "next/image";

export default function Layout({children}){
     return <>
     <Header/>
     <div className="imgBg"><Image src="/images/bg.webp" alt="background" fill/></div>
     {children}
     </>
}