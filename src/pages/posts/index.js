import Layout from "@/components/pageLayouts/Layout";
import ListNavbar from "@/components/header/ListNavbar";
import BlogPost from "@/components/postElem/BlogPost"; import Head from "next/head";
import { fetcher, sortList } from "@/constants/helpers";
import { useState } from "react"; import { useRouter } from "next/router";
import useSWR from "swr";
import usePagination from "@/lib/hooks/tools/use-pagination";
import ReactPaginate from "react-paginate";
import { DEFAULT_PAGINATION_PROPS } from "@/constants/constantData";
import { SkeletonPost } from "@/components/pageLayouts/Skeleton-Loaders";

export default function PostList(){
     const router = useRouter(), {data: posts, isLoading} = useSWR('/api/posts',fetcher);
     const [options, setOptions] = useState({sortPost: 'latest',filterCategory: router.query.category || 'all'})
     const postList = (options.filterCategory && options.filterCategory==='all') ? posts?.sort((a,b)=>sortList(a,b,options)) : posts?.sort((a,b)=>sortList(a,b,options)).filter(val=>options.filterCategory===val.category);
     const {data: currPosts, pageCount, changePage} = usePagination(postList,20);
     const handleChange= e => setOptions({...options, [e.target.name]: e.target.value});
     const handleChangeFilter = e => {
          setOptions({...options, filterCategory: e.target.value});
          router.push(`/posts?category=${e.target.value}`,undefined,{shallow:true})
     }
     return <><Head><title>Explore Posts | Edu-Articles</title></Head>
     <Layout>
          <ListNavbar options={options} change={{handleChange,changeFilter: handleChangeFilter}}/>
          <section className="posts small">
               {isLoading ? <>
                    <SkeletonPost/>
                    <SkeletonPost/>
                    <SkeletonPost/>
                    <SkeletonPost/>
                    <SkeletonPost/>
               </> : !currPosts?.length ? <h2 className="empty">No Posts Found</h2> : currPosts?.map(post=><BlogPost key={post.post_id} data={post}/>)}
          </section>
          {!isLoading && currPosts?.length ? <ReactPaginate
               pageCount={pageCount}
               onPageChange={changePage}
               {...DEFAULT_PAGINATION_PROPS}
          /> : null}
     </Layout></>
}