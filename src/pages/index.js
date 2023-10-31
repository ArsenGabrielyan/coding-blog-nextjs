import Layout from "@/components/Layout";
import BlogPost from "@/components/postElem/BlogPost";
import PostsCarousel from "@/components/features/posts-carousel";
import connectDB from "@/lib/connectDb";
import Post from "@/model/Post";
import { serializeObject } from "@/constants/helpers";
import WidgetsFeature from "@/components/features/WidgetFeature";
import { getSession } from "next-auth/react";
import User from "@/model/CredentialsUser";

export default function Homepage({posts, recent, appProps}){
     return <Layout>
          {appProps.settings?.featured && <PostsCarousel posts={posts}/>}
          <main className="siteMain">
          <section className="posts">
               {posts.slice(0,12).map(post=><BlogPost key={post.post_id} data={post}/>)}
          </section>
          <WidgetsFeature recent={recent} settings={appProps.settings}/>
          </main>
     </Layout>
}
export async function getServerSideProps(ctx){
     await connectDB();
     const session = await getSession(ctx);
     const appProps = session ? (await User.aggregate([
          {$match: {email: session?.user.email}},
          {$project: {settings: '$details.settings', _id:0}},
     ]))[0] : {};
     const posts = await Post.aggregate([{$project: { _id:0, banner:0, content:0, comments:0 }}]);
     return {props: {
          posts,
          appProps,
          recent: serializeObject(posts.sort((a,b)=>a?-1:b?1:0).slice(0,3)),
     }}
}