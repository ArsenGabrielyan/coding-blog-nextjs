import { useSession } from "next-auth/react";import useSWR from "swr";
import { fetcher } from "@/constants/functions";

export default function useUserCard(userId, currUserId){
     const {data,status} = useSession();
     const {data: user, isLoading, mutate: updateUser} = useSWR(`/api/users/${userId}`,fetcher)
     const {data: currUser, mutate: updateSession} = useSWR(`/api/users/${currUserId}`,fetcher);
     const isFollowed = currUser?.details?.followingUsers.includes(userId);
     const followOptions = {status, email: data?.user.email, userId};
     const updateDetails = async()=>{
          await updateSession();
          await updateUser();
     }
     return {
          user,followOptions,updateDetails,
          conditions: {isLoading,isFollowed}
     }
}