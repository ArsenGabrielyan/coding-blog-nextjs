import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaCalendar, FaUser } from "react-icons/fa";

export default function SmallPost({data}){
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