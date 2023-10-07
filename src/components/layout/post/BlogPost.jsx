import Image from "next/image";
import Link from "next/link";
import { FaCalendar, FaUser } from "react-icons/fa";

export default function BlogPost({data, noLink=false}){
     return <article className="post">
          <div className="header"> <Image src={data?.thumbnail?.file || "/images/post-thumbnail.webp"} alt="post" fill priority sizes="(max-width: 500px) 270px"/></div> 
          <div className="content">
               <h2 className="blog-title">{data?.title}</h2>
               <div className="details">
                    <div className="user"><FaUser/>{data?.author}</div>
                    <div className="date"><FaCalendar/>{data?.date}</div>
               </div>
               {!noLink ? <Link href={`/posts/${data?.post_id}`} className="btn read">Start Reading</Link> : <button className="btn read">Start Reading</button>}
          </div>
     </article>
}