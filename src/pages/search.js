import Layout from "@/components/pageLayouts/Layout";
import { useSession } from "next-auth/react";
import { UserSearchElem, PostSearchElem } from "@/components/cards/search-elements";
import { useState } from "react"; import Head from "next/head";
import { fetcher, search } from "@/constants/helpers";
import { useRouter } from "next/router"; import useSWR from "swr";
import { SEARCH_LIMIT } from "@/constants/constantData";
import { SkeletonSearch } from "@/components/pageLayouts/Skeleton-Loaders";
   
export default function Search(){
     const [postCount, setPostCount] = useState(SEARCH_LIMIT);
     const [selected, setSelected] = useState('all');
     const {data,status} = useSession(), {query} = useRouter();
     const {data: searchData, mutate: updateSearch, isLoading} = useSWR('/api/search',fetcher);
     const {data: currUser, mutate: updateSession} = useSWR(`/api/users/${data?.user.id}`,fetcher)
     const list = searchData?.filter(val=>search(val,query.q));
     const updateDetails = async()=>{
          await updateSession();
          await updateSearch()
     }
     const showMore = () => {if(postCount<=list?.length) setPostCount(postCount*2);}
     return <><Head><title>{String(query.q)} | Edu-Articles</title></Head>
     <Layout>
          <h1 className="pageTitle">Search</h1>
          <div className="search-filter">
               <button type="button" className={selected==='all'?"active":''} onClick={()=>setSelected('all')}>All</button>
               <button type="button" className={selected==='blogPost'?"active":''} onClick={()=>setSelected('blogPost')}>Posts</button>
               <button type="button" className={selected==='user'?"active":''} onClick={()=>setSelected('user')}>Users</button>
          </div>
          <section className="search-container">
               {isLoading ? <><SkeletonSearch type="pfp"/>
               <SkeletonSearch/>
               <SkeletonSearch type="pfp"/>
               <SkeletonSearch/></> : <>{status!=='loading' && list?.slice(0,postCount).filter(val=>{
                    if(selected==='all') return val;
                    return val.elemType===selected
               }).map(elem=>(elem.elemType==='user') ? <UserSearchElem key={elem.user_id} type={data?.user.email===elem.email?'session':'other'} user={elem} currUser={currUser} update={updateDetails} status={status}/> : <PostSearchElem key={elem.post_id} post={elem}/>)}
               {!list?.length && <h2 className="notFound">Sorry, But No Results Found</h2>}
               {postCount<list?.length && <button className="btn fill" onClick={showMore}>Load More</button>}</>}
          </section>
     </Layout>
     </>
}