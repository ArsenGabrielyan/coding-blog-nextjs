import { useState } from "react";

export function useMultistep(steps){
     const [current, setCurrent] = useState(0);
     const next = ()=>setCurrent(i=>{
          if(i>=steps.length-1) return i;
          return i+1
     })
     const prev = ()=>setCurrent(i=>{
          if(i<=0) return i;
          return i-1
     })
     const goTo = (i)=>setCurrent(i);
     return {
          currentIndex: current,
          step: steps[current],
          goTo,next,back: prev,
          steps,isFirst: current===0,
          isLast: current===steps.length-1
     }
}