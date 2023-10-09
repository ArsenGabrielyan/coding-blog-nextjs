import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { followUnfollow } from "@/constants/functions";

export default function UserListItem({user, type="other", isFollowed}){
     const {data,status} = useSession();
     const router = useRouter();
     return <article className="user">
     <div className="pfp">
          <Image src={user?.image} alt="pfp" fill priority sizes="(max-width: 500px) 150px"/>
     </div>
     <div className="details">
          <h2>{user?.name}</h2>
          <span>{user?.username}&nbsp;&middot;&nbsp;
          {user.followers} Followers&nbsp;&middot;&nbsp;
          {user.postCount} Posts</span>
          <p className="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed pellentesque felis. Vivamus vitae gravida lorem, et sollicitudin ante. Sed pulvinar lorem eu mi ultricies, sit amet lobortis mauris tempus.</p>
          {type==='other' ? <div className="options">
               <button className="btn follow" onClick={()=>followUnfollow(status,data?.user.email,user.user_id,router)}>{isFollowed?'Unfollow':'Follow'}</button>
               <Link className="btn follow" href={`/users/${user?.user_id || user?.username}`}>Explore</Link>
          </div> : <div className="options">
               <button className="btn follow">Edit Profile</button>
               <button className="btn follow">Analytics</button>
          </div>}
     </div>
     </article>
}