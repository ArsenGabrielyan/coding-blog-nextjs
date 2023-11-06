import Layout from "@/components/pageLayouts/Layout";
import UserListItem from "@/components/UserListItem";
import Head from "next/head"; import { useSession } from "next-auth/react";
import { fetcher } from "@/constants/helpers"; import useSWR from "swr";
import ListNavbar from "@/components/header/ListNavbar";
import usePagination from "@/lib/hooks/tools/use-pagination";
import ReactPaginate from "react-paginate";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { DEFAULT_PAGINATION_PROPS } from "@/constants/constantData";

export default function UserList(){
     const {data,status} = useSession();
     const {data: users, isLoading, mutate: updateUsers} = useSWR("/api/users",fetcher);
     const {data: currUser, mutate: updateSession} = useSWR(`/api/users/${data?.user.id}`);
     const updateDetails = async()=>{
          await updateSession();
          await updateUsers()
     }
     const {data: currUsers, pageCount, changePage} = usePagination(users,20);
     return <><Head><title>Explore Users | Edu-Articles</title></Head>
     <Layout>
          {!isLoading ? <>
          <ListNavbar usermode/>
          <section className="userlist">
               {!currUsers?.length ? <h2 className="empty">No User Found</h2> : currUsers?.map(user=><UserListItem key={user.user_id} user={user} type={data?.user.email===user.email?"session":"other"} currUser={currUser} status={status} update={updateDetails}/>)}
          </section>
          </> : <h2 className="loadTxt">Loading...</h2>}
          {!isLoading && <ReactPaginate
               pageCount={pageCount}
               onPageChange={changePage}
               {...DEFAULT_PAGINATION_PROPS}
          />}
     </Layout></>
}