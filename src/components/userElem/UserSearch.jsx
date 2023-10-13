import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { abbrNum, followUnfollow } from "@/constants/functions";
import useUserCard from "@/lib/hooks/use-user-card";

export default function UserSearchElem({type='other', userId, currUserId}){
     const {user,updateDetails,followOptions,conditions} = useUserCard(userId,currUserId);
     const router = useRouter(), {isFollowed,isLoading} = conditions
     return !isLoading ? <article className="user-searchElem">
          <Image src={user?.image} alt="pfp" width={100} height={100}/>
          <div className="details">
               <h2>{user?.name}&nbsp;&bull;&nbsp;<span className="username">{user?.username}</span></h2>
               <p>
                    <span>{abbrNum(user?.postCount)} Posts</span>&nbsp;&bull;&nbsp;
                    <span>{abbrNum(user?.followers)} Followers</span>&nbsp;&bull;&nbsp;
                    <span>{abbrNum(user?.details.followingUsers.length)} Following</span>
               </p>
               <div className="options">
                    {type==='other' ? <>
                         <button className="btn" onClick={()=>followUnfollow(followOptions,router,async()=>await updateDetails())}>{isFollowed?'Unfollow':'Follow'}</button>
                         <Link href={`/users/${user?.username}`} className="btn">Explore</Link>
                    </> : <>
                         <button className="btn follow">Edit Profile</button>
                         <button className="btn follow">Analytics</button>
                    </>}
               </div>
          </div>
     </article> : null
}