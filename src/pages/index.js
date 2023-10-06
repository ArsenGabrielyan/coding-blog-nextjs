import Layout from "@/components/Layout";
import Widget from "@/layout/widgets/Widget";
import BlogPost from "@/components/layout/post/BlogPost";
import { getCategories } from "@/constants/constantData";
import Link from "next/link";
import PostWidget from "@/components/layout/widgets/Post-Widget";
import PostsCarousel from "@/components/layout/BlogCarousel";
import { useEffect, useState } from "react";
import connectDB from "@/lib/connectDb";
import Post from "@/model/Post";
import { serializeObject } from "@/constants/functions";

export default function Homepage({posts, recent}){
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
     return <Layout>
          <PostsCarousel posts={posts}/>
          <main className="siteMain">
          <section className="posts">
               {posts.map(post=><BlogPost key={post.post_id} data={post}/>)}
          </section>
          <aside className="widgets">
               <Widget title="Popular Categories">
                    <ul className="categories">{getCategories().map((category,i)=><li key={i}><Link href={`/categories/${category.value}`}>{category.name}</Link></li>)}</ul>
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
          </main>
     </Layout>
}
export async function getStaticProps(){
     await connectDB();
     const postArr = await Post.find(), postList = [];
     postArr?.forEach(post=>{
          const {_id,...rest} = post._doc;
          postList.push(rest)
     })
     return {props: {posts: serializeObject(postList), recent: serializeObject(postList.sort((a,b)=>a?-1:b?1:0).slice(0,3))}}
}