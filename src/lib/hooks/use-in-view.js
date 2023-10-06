import { useEffect, useRef, useState } from "react";

export default function useInView(){
     const viewRef = useRef();
     const [inView, setInView] = useState(false);
     useEffect(()=>{
          const el = viewRef.current;
          const observer = new IntersectionObserver(entries=>setInView(entries[0].isIntersecting));
          if(el) observer.observe(el);
          return ()=> {
               if(el) observer.unobserve(el);
          }
     },[]);
     return {viewRef, inView}
}