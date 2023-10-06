import Layout from "@/components/Layout";
import ListNavbar from "@/components/ListNavbar";
import BlogPost from "@/components/layout/post/BlogPost";
import { serializeObject } from "@/constants/functions";
import connectDB from "@/lib/connectDb";
import Post from "@/model/Post";

export default function PostList({posts}){
     return <Layout>
          <ListNavbar/>
          <section className="posts small">
               {posts.map(post=><BlogPost key={post.post_id} data={post}/>)}
          </section>
     </Layout>
}
export async function getStaticProps(){
     await connectDB();
     const postArr = await Post.find(), postList = [];
     postArr?.forEach(post=>{
          const {_id,user_id,...rest} = post._doc;
          postList.push(rest)
     })
     return {props: {posts: serializeObject(postList)}}
}