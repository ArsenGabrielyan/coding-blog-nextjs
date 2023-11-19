import Image from "next/image"; import Link from "next/link";
import { FaCalendar, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { abbrNum, followUnfollow } from "@/constants/helpers";

export const PostSearchElem = ({post}) => <article className="post-searchElem">
     <Image src={post?.thumbnail || "/images/post-thumbnail.webp"} alt="thumbnail" width={128} height={128}/>
     <div className="details">
          <h2>{post?.title}</h2>
          <span className="postDetails"><FaUser/>{post?.author}<FaCalendar/>{post?.date}</span>
          <Link className="btn" href={`/posts/${post?.post_id}`}>Start Reading</Link>
     </div>
</article>

export const UserSearchElem = ({type='other', user, currUser, status, update}) => {
     const router = useRouter();
     const isFollowed = currUser?.details?.followingUsers.includes(user.user_id);
     const followOptions = {status, email: currUser?.email, userId: user?.user_id, name: user?.name};
     return <article className="user-searchElem">
          <Image src={user?.image} alt="pfp" width={100} height={100}/>
          <div className="details">
               <h2>{user?.name}&nbsp;&bull;&nbsp;<span className="username">{user?.username}</span></h2>
               <p>
                    <span>{abbrNum(user?.postCount)} Posts</span>&nbsp;&bull;&nbsp;
                    <span>{abbrNum(user?.followers)} Followers</span>&nbsp;&bull;&nbsp;
                    <span>{abbrNum(user?.details?.followingUsers.length)} Following</span>
               </p>
               <div className="options">
                    {type==='other' ? <button type="button" className="btn" onClick={()=>followUnfollow(followOptions,router,isFollowed,update)}>{isFollowed?'Unfollow':'Follow'}</button> : <Link className="btn" href="/settings">Settings</Link>}
                    <Link href={`/users/${user?.username}`} className="btn">Explore</Link>
               </div>
          </div>
     </article>
}