import Layout from "@/components/pageLayouts/Layout";
import BlogPost from "@/components/postElem/BlogPost";
import connectDB from "@/lib/connectDb";
import User from "@/model/CredentialsUser";
import Post from "@/model/Post"; import Head from "next/head";
import { serializeObject } from "@/constants/helpers";
import { getSession } from "next-auth/react";
import usePagination from "@/lib/hooks/tools/use-pagination";
import ReactPaginate from "react-paginate";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { DEFAULT_PAGINATION_PROPS } from "@/constants/constantData";

export default function SavedPosts({posts}){
     const {data: currSavedPosts,changePage,pageCount} = usePagination(posts,15);
     return <><Head><title>Saved Posts | Edu-Articles</title></Head>
     <Layout>
          <h1 className="pageTitle">Saved Posts</h1>
          <section className="posts small">
               {currSavedPosts.map(post=><BlogPost key={post.post_id} data={post}/>)}
               {!currSavedPosts.length && <h2 className="empty">There are No Saved Posts</h2>}
          </section>
          <ReactPaginate
               pageCount={pageCount}
               onPageChange={changePage}
               {...DEFAULT_PAGINATION_PROPS}
          />
     </Layout></>
}
export async function getServerSideProps(ctx){
     const session = await getSession(ctx);
     await connectDB();
     const user = await User.findOne({email: session?.user?.email});
     if(user){
          const postList = await Post.find({post_id: {$in: user?.details.savedPosts}})
          return {props: {posts: serializeObject(postList)}}
     } else return {redirect:{
          pernament:false,
          destination: '/auth/signin'
     }}
}