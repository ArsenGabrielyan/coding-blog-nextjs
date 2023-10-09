import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { followUnfollow } from "@/constants/functions";

export default function UserSearchElem({user, type='other', details, isFollowed}){
     const {data,status} = useSession();
     const router = useRouter();
     return <article className="user-searchElem">
          <Image src={user.image} alt="pfp" width={100} height={100}/>
          <div className="details">
               <h2>{user.name}&nbsp;&bull;&nbsp;<span className="username">{user.username}</span></h2>
               <p>
                    <span>{details.postCount} Posts</span>&nbsp;&bull;&nbsp;
                    <span>{details.followers} Followers</span>&nbsp;&bull;&nbsp;
                    <span>{details.following} Following</span>
               </p>
               <div className="options">
                    {type==='other' ? <>
                         <button className="btn" onClick={()=>followUnfollow(status,data?.user.email,user.user_id,router)}>{isFollowed?'Unfollow':'Follow'}</button>
                         <Link href={`/users/${user.username}`} className="btn">Explore</Link>
                    </> : <>
                         <button className="btn follow">Edit Profile</button>
                         <button className="btn follow">Analytics</button>
                    </>}
               </div>
          </div>
     </article>
}