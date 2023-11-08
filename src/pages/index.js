import Layout from "@/components/pageLayouts/Layout";
import BlogPost from "@/components/postElem/BlogPost";
import PostsCarousel from "@/components/features/posts-carousel";
import connectDB from "@/lib/connectDb"; import { useState } from "react";
import { serializeObject, sortByLatest } from "@/constants/helpers";
import WidgetsFeature from "@/components/widget/WidgetFeature";
import { getSession } from "next-auth/react"; import Post from "@/model/Post";
import User from "@/model/CredentialsUser"; import { MAIN_PAGE_LIMIT } from "@/constants/constantData";

export default function Homepage({posts, recent, appProps}){
     const [postCount, setPostCount] = useState(MAIN_PAGE_LIMIT);
     const showMore = () => {if(postCount<=posts?.length) setPostCount(postCount*3);}
     return <Layout>
          {appProps.settings?.featured && <PostsCarousel posts={posts}/>}
          <main className="siteMain">
          <section className="posts">
               {posts.slice(0,postCount).map(post=><BlogPost key={post.post_id} data={post}/>)}
               {postCount<posts?.length && <button className="btn fill" onClick={showMore}>Load More</button>}
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
          posts, appProps,
          recent: serializeObject(sortByLatest(posts).slice(0,3)),
     }}
}