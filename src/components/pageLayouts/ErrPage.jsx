import Link from "next/link";
import { useEffect, useState } from "react";

export default function ErrPage({children}){
     const [cords, setCords] = useState({x:0,y:0});
     useEffect(()=>{
          const handleMouseMove = e => setCords({x: -e.clientX/5,y: -e.clientY/5});
          window.addEventListener('mousemove',handleMouseMove);
          return () => window.removeEventListener('mousemove',handleMouseMove);
     },[])
     return <div className="errPage">
          <div className="content" style={{backgroundPositionX: `${cords.x}px`, backgroundPositionY: `${cords.y}px`}}>
               {children}
               <Link href="/" className="btn white">Go Back</Link>
          </div>
     </div>
}