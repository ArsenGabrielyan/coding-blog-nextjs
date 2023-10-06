import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UserListItem({user, type="other", posts}){
     const router = useRouter();
     return <article className="user" onClick={()=>router.push(`/users/${user?.user_id || user?.id || user?.username}`)}>
     <div className="pfp">
          <Image src={user?.image} alt="pfp" fill priority sizes="(max-width: 500px) 150px"/>
     </div>
     <div className="details">
          <h2>{user?.name}</h2>
          <span>{user?.username}&nbsp;&middot;&nbsp;
          0 Followers&nbsp;&middot;&nbsp;
          {posts || user.postCount} Posts</span>
          <p className="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed pellentesque felis. Vivamus vitae gravida lorem, et sollicitudin ante. Sed pulvinar lorem eu mi ultricies, sit amet lobortis mauris tempus.</p>
          {type==='other' ? <div className="options">
               <button className="btn follow">Follow</button>
               <button className="btn follow">About</button>
          </div> : <div className="options">
               <button className="btn follow">Edit Profile</button>
               <button className="btn follow">Analytics</button>
          </div>}
     </div>
     </article>
}