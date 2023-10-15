import { fetcher, isCurrent } from "@/constants/functions";
import useSWR from "swr";import { useSession } from "next-auth/react";

export default function usePost(query,author){
     const {data, status} = useSession();
     const {data: post, isLoading, mutate: updatePost, isValidating} = useSWR(query ? `/api/posts/${query?.postId}` : null, fetcher);
     const {data: users, mutate: updateEveryUser} = useSWR('/api/users',fetcher)
     const currUserId = users?.find(val=>val.email===data?.user.email)?.user_id;
     const {data: currUser, mutate: updateSession} = useSWR(`/api/users/${currUserId}`,fetcher);
     const isCurrUser = data?.user.email===post?.email, isCurrPost = isCurrent(currUser,post,author);
     const likeCount = users?.filter(val=>val.details.likedPosts.includes(post?.post_id)).length;
     const followOptions = {status, email: data?.user.email, userId: author?.user_id, name: author?.name}
     const updateDetails = async()=>{
          await updateSession();
          await updateEveryUser();
     }
     return {
          state: {post,users,currUser,likeCount},
          update: {updatePost,updateDetails},
          session: {user: {...data?.user}, status},
          conditions: {isValidating,isLoading,isCurrUser,isCurrPost},
          followOptions
     }
}