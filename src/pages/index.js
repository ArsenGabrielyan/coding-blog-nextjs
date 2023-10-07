import Layout from "@/components/Layout";
import BlogPost from "@/components/layout/post/BlogPost";
import PostsCarousel from "@/components/layout/BlogCarousel";
import connectDB from "@/lib/connectDb";
import Post from "@/model/Post";
import { serializeObject } from "@/constants/functions";
import WidgetsFeature from "@/components/layout/widgets/WidgetFeature";

export default function Homepage({posts, recent}){
     return <Layout>
          <PostsCarousel posts={posts}/>
          <main className="siteMain">
          <section className="posts">
               {posts.slice(0,12).map(post=><BlogPost key={post.post_id} data={post}/>)}
          </section>
          <WidgetsFeature recent={recent}/>
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