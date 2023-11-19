import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCategories } from "@/constants/helpers";
import { useEffect, useState } from "react";
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { format12Hr } from "@/constants/helpers";

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

export default function WidgetsFeature({recent, settings}){
     const [date, setDate] = useState({time: '00:00:00',date: 'Thu Jan 01 1970'});
     useEffect(()=>{
          const d = new Date();
          const interval = setInterval(()=>{
               setDate({
                    time: `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`,
                    date: d.toDateString()
               })
          },1000);
          return ()=>{if(interval) clearInterval(interval)}
     },[date.time]);
     return <aside className="widgets">
     <Widget title="Explore">
          <ul className="blog-links">
               <li><Link href="/posts" className="btn-icon" title="Posts"><FaNewspaper/></Link></li>
               <li><Link href="/users" className="btn-icon" title="Users"><FaUsers/></Link></li>
          </ul>
     </Widget>
     {settings?.categories && <Widget title="Categories">
          <ul className="categories">{getCategories().map((category,i)=><li key={i}><Link href={`/posts?category=${category.value}`}>{category.name}</Link></li>)}</ul>
     </Widget>}
     {(settings?.recent && recent.length) ? <Widget title="Recent Posts">
          <ul className="w-posts">
               {recent.map(post=><PostWidget key={post.post_id} data={post}/>)}
          </ul>
     </Widget> : null}
     {settings?.clock && <Widget title="Clock">
          <p className="time">{settings?.is24HrFormat ? date.time : format12Hr(date.time)}</p>
          <p className="date">{date.date}</p>
     </Widget>}</aside>
}