import Image from "next/image"; import Link from "next/link";
import { useRouter } from "next/navigation";
import { abbrNum, followUnfollow } from "@/constants/functions";
import useUserCard from "@/lib/hooks/use-user-card";

export default function UserListItem({userId, type="other", currUserId}){
     const router = useRouter();
     const {user,conditions,followOptions,updateDetails} = useUserCard(userId,currUserId);
     const {isLoading,isFollowed} = conditions
     return !isLoading ? <article className="user">
     <div className="pfp"><Image src={user?.image} alt="pfp" fill priority sizes="(max-width: 500px) 150px"/></div>
     <div className="details">
          <h2>{user?.name}</h2>
          <span>{user?.username}&nbsp;&middot;&nbsp;
          {abbrNum(user?.followers)} Followers&nbsp;&middot;&nbsp;
          {abbrNum(user?.postCount)} Posts</span>
          <p className="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed pellentesque felis. Vivamus vitae gravida lorem, et sollicitudin ante. Sed pulvinar lorem eu mi ultricies, sit amet lobortis mauris tempus.</p>
          {type==='other' ? <div className="options">
               <button className="btn follow" onClick={()=>followUnfollow(followOptions,router,async()=>await updateDetails())}>{isFollowed?'Unfollow':'Follow'}</button>
               <Link className="btn follow" href={`/users/${user?.user_id || user?.username}`}>Explore</Link>
          </div> : <div className="options">
               <button className="btn follow">Edit Profile</button>
               <button className="btn follow">Analytics</button>
          </div>}
     </div> 
     </article> : null
}