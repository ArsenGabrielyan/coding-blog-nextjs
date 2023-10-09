import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaCalendar, FaUser } from "react-icons/fa";

export default function PostSearchElem({post}){
     const router = useRouter();
     return <article className="post-searchElem">
          <Image src={post.thumbnail.file || "/images/post-thumbnail.webp"} alt="thumbnail" width={128} height={128}/>
          <div className="details">
               <h2>{post.title}</h2>
               <span className="postDetails"><FaUser/>{post.author}<FaCalendar/>{post.date}</span>
               <button className="btn" onClick={()=>router.push(`/posts/${post.post_id}`)}>Start Reading</button>
          </div>
     </article>
}