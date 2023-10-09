import Widget from "@/components/Widget";
import Link from "next/link";
import PostWidget from "../postElem/Post-Widget";
import { getCategories } from "@/constants/constantData";
import { useEffect, useState } from "react";
import { FaNewspaper, FaUsers } from "react-icons/fa";

export default function WidgetsFeature({recent}){
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
     },[date.time])
     return <aside className="widgets">
     <Widget title="Explore">
          <ul className="blog-links">
               <li><Link href="/posts" className="btn-icon" title="Posts"><FaNewspaper/></Link></li>
               <li><Link href="/users" className="btn-icon" title="Users"><FaUsers/></Link></li>
          </ul>
     </Widget>
     <Widget title="Categories">
          <ul className="categories">{getCategories().map((category,i)=><li key={i}><Link href={`/posts?category=${category.value}`}>{category.name}</Link></li>)}</ul>
     </Widget>
     {recent.length ? <Widget title="Recent Posts">
          <ul className="w-posts">
               {recent.map(post=><PostWidget key={post.post_id} data={post}/>)}
          </ul>
     </Widget> : null}
     <Widget title="Clock">
          <p className="time">{date.time}</p>
          <p className="date">{date.date}</p>
     </Widget>
</aside>
}