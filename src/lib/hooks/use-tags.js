import { useState } from "react";

export default function useTags(setData,data){
     const [tagInput, setTagInput] = useState('');
     const removeTag = i => {
          const arr = [...data.keywords];
          arr.splice(i,1);
          setData({...data, keywords: arr});
     }
     const editTag = i => {
          const newVal = prompt('New Value For a Selected Tag');
          if(newVal && newVal.trim()!==''){
               const arr = [...data.keywords];
               arr[i] = newVal;
               setData({...data, keywords: arr});
          }
     }
     const clearAllTags = () => {
          const arr = [...data.keywords];
          arr.splice(0,arr.length);
          setData({...data, keywords: arr});
     }
     const handleKeydown = e => {
          const trimmed = tagInput.trim();
          if((e.key===',' || e.key==='Enter') && trimmed.length && !data.keywords.includes(trimmed)){
               e.preventDefault();
               const arr = [...data.keywords];
               arr.push(trimmed)
               setData({...data, keywords: arr})
               setTagInput('')
          }
     }
     const changeTags = e=>setTagInput(e.target.value)
     return {
          removeTag,editTag,
          clearAllTags,
          handleKeydown,
          changeTags,tagInput
     }
}