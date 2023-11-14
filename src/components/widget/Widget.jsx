import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export const Widget = ({title='',children}) => <div className="widget">
     {title && <h3>{title}</h3>}
     {children}
</div>
export function PostWidget({data}){
     const router = useRouter();
     return <li className="w-post">
          <div className="w-post-img">
               <Link href={`/posts/${data.post_id}`}><Image src={data.thumbnail} alt='recent-post' fill priority sizes="(max-width: 400px) 300px"/></Link>
          </div>
          <div className="w-post-content" onClick={()=>router.push(`/posts/${data.post_id}`)}>
               <h3><Link href={`/posts/${data.post_id}`}>{data.title}</Link></h3>
               <p>{data.date}</p>
          </div>
     </li>
}