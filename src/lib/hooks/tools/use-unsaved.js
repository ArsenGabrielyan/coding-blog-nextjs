import { useEffect } from "react";

export default function useUnsavedWarning(cond){
     useEffect(()=>{
          const handleBeforeUndload = e => {
               if(cond){
                    e.preventDefault();
                    e.returnValue = true;
               }
          };
          window.addEventListener('beforeunload',handleBeforeUndload);
          return ()=> window.removeEventListener('beforeunload',handleBeforeUndload);
     },[cond]);
}