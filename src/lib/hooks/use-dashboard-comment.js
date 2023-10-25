import { fetcher } from "@/constants/functions";
import useSWR from "swr"; 

export default function useDashboardComment(userEmail){
     const {data: user, mutate: updateSession, isLoading: isUserLoading} = useSWR(`/api/users/${userEmail}`,fetcher)
     const {data: users, mutate: updateUsers, isLoading: areUsersLoading} = useSWR('/api/users',fetcher);
     const {data: posts, mutate: updatePosts, isLoading: arePostsLoading} = useSWR(`/api/posts?email=${userEmail}`,fetcher);
     const comments = posts?.flatMap(val=>val.comments);
     const isAllLoading = isUserLoading && arePostsLoading && areUsersLoading
     const updateDetails = async () =>{
          await updatePosts();
          await updateSession();
          await updateUsers()
     }
     return {
          updateDetails,comments,
          users,user,
          isAllLoading
     }
}