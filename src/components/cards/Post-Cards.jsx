import Image from "next/image"; import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaCalendar, FaUser } from "react-icons/fa";
import { MdMoreHoriz, MdEdit, MdDelete } from "react-icons/md";
import axios from "axios"; import { REQ_CONFIG } from "@/constants/forms/formData";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function SmallPost({data}){
     const router = useRouter();
     return <div className="smallPost" onClick={()=>router.push(`/posts/${data.post_id}`)}>
          <Image src={data.thumbnail} alt="thumbnail" fill priority/>
          <div className="details">
               <span><FaCalendar/>{data.date}</span>
               <h2>{data.title}</h2>
               <span><FaUser/>{data.author}</span>
          </div>
     </div>
}

export function BlogPost({data, noLink=false, adminMode=false, update}){
     const [open, setOpen] = useState(false), optRef = useRef(null);
     useEffect(()=>{
          const handleClick = e => { if(!optRef.current?.contains(e.target)) setOpen(false); }
          document.addEventListener('click',handleClick);
          return () => document.removeEventListener('click',handleClick);
     },[]);
     const deletePost = async () => {
          if(confirm('Are You Sure to Delete That Post?')){
               const res = await toast.promise(axios.delete(`/api/posts/${data?.post_id}`,REQ_CONFIG),{
                    pending: 'Deleting...',
                    success: 'Post Deleted',
                    error: 'Failed to Delete the Post'
               })
               if(res.status===200) update();
          }
     }
     return <article className="post">
          <div className="header">
               <Image src={data?.thumbnail || "/images/post-thumbnail.webp"} alt="post" fill priority sizes="(max-width: 500px) 270px"/>
          </div> 
          <div className="content">
               <h2 className="blog-title">{data?.title}</h2>
               <div className="details">
                    <div className="user"><FaUser/>{data?.author}</div>
                    <div className="date"><FaCalendar/>{data?.date}</div>
               </div>
               <div className="btns">
                    {!noLink ? <Link href={`/posts/${data?.post_id}`} className="btn read">Start Reading</Link> : <button type="button" className="btn read">Start Reading</button>}
                    {adminMode && <>
                         <button type="button" className="btn-icon" title="options" onClick={()=>setOpen(!open)} ref={optRef}><MdMoreHoriz/></button>
                         {open && <ul className="post-options">
                              <li><Link href={`/post-editor/${data?.post_id}`}><MdEdit/>&nbsp;Edit</Link></li>
                              <li><button type="button" onClick={deletePost}><MdDelete/>&nbsp;Delete</button></li>
                         </ul>}
                    </>}
               </div>
          </div>
     </article>
}