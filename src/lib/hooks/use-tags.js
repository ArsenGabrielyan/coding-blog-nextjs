import { useState } from "react";

export default function useTags(setPostData,postData){
     const [tagInput, setTagInput] = useState('');
     const removeTag = i => {
          const arr = [...postData.keywords];
          arr.splice(i,1);
          setPostData({...postData, keywords: arr});
     }
     const editTag = i => {
          const newVal = prompt('New Value For a Selected Tag');
          if(newVal && newVal.trim()!==''){
               const arr = [...postData.keywords];
               arr[i] = newVal;
               setPostData({...postData, keywords: arr});
          }
     }
     const clearAllTags = () => {
          const arr = [...postData.keywords];
          arr.splice(0,arr.length);
          setPostData({...postData, keywords: arr});
     }
     const handleKeydown = e => {
          const trimmed = tagInput.trim();
          if((e.key===',' || e.key==='Enter') && trimmed.length && !postData.keywords.includes(trimmed)){
               e.preventDefault();
               const arr = [...postData.keywords];
               arr.push(trimmed)
               setPostData({...postData, keywords: arr})
               setTagInput('')
          }
     }
     const changeTags = e=>setTagInput(e.target.value)
     return {
          removeTag,
          clearAllTags,
          handleKeydown,
          changeTags,
          tagInput,
          editTag
     }
}