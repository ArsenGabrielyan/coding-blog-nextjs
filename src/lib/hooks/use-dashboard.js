import { fetcher } from "@/constants/functions";
import useSWR from "swr";

export default function useDashboard(user){
     const {data: users, isLoading: areUsersLoading} = useSWR('/api/users',fetcher)
     const {data: userData, isLoading: isSessionLoading} = useSWR(`/api/users/${user.user_id}`,fetcher);
     const {data: posts, isLoading: arePostsLoading} = useSWR(`/api/posts?email=${user.email}`,fetcher);
     const totalComments = posts?.flatMap(val=>val.comments);
     const postIds = posts?.map(val=>val.post_id);
     const totalLikes = postIds?.flatMap(val=>users?.filter(v=>v.details.likedPosts.includes(val)));
     const followers = users?.filter(val=>val.details.followingUsers.includes(user?.user_id));
     const totalSaves = user?.details.savedPosts.length;
     const isAllLoading = isSessionLoading && areUsersLoading && arePostsLoading;
     return {
          userData, isAllLoading,
          stats: {totalComments,totalLikes,followers,totalSaves}
     }
}