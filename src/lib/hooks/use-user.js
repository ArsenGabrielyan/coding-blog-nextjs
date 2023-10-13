import { useSession } from "next-auth/react";
import useSWR from "swr"; 
import { fetcher } from "@/constants/functions";

export default function useUser(query){
     const {data, status} = useSession();
     const {data: user, mutate: updateUser, isLoading} = useSWR(query?`/api/users/${query.userId}`:null,fetcher)
     const isCurrUser = data?.user.email===user?.email;
     const {data: users, mutate: updateEveryUser} = useSWR('/api/users',fetcher)
     const currUserId = users?.find(val=>val.email===data?.user.email)?.user_id;
     const {data: currUser, mutate: updateSession} = useSWR(`/api/users/${currUserId}`,fetcher);
     const isFollowed = currUser?.details?.followingUsers.includes(user?.user_id);
     const followers = users?.filter(val=>val.details.followingUsers.includes(user?.user_id)).length
     const followOptions = {status, email: data?.user.email, userId: user?.user_id};
     const updateDetails = async()=>{
          await updateSession();
          await updateUser();
          await updateEveryUser();
     }
     return{
          state: {user,followers},
          conditions: {isCurrUser,isFollowed,isLoading},
          updateDetails,followOptions
     }
}