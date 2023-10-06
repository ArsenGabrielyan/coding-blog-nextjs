
import Image from "next/image";
import { MdMoreHoriz } from "react-icons/md";

export default function UserSearchElem({user, type='other', count}){
     return <article className="user-searchElem">
          <Image src={user.image} alt="pfp" width={100} height={100}/>
          <div className="details">
               <h2>{user.name}&nbsp;&bull;&nbsp;<span className="username">{user.username}</span></h2>
               <p>
                    <span>{count.postCount} Posts</span>&nbsp;&bull;&nbsp;
                    <span>0 Followers</span>&nbsp;&bull;&nbsp;
                    <span>0 Following</span>
               </p>
               {type==='other' ? <div className="options">
                    <button className="btn">Follow</button>
                    <button className="btn">About</button>
                    <button className="btn-icon" title="Options"><MdMoreHoriz/></button>
               </div> : <div className="options">
                    <button className="btn follow">Edit Profile</button>
                    <button className="btn follow">Analytics</button>
                    <button className="btn-icon" title="Options"><MdMoreHoriz/></button>
               </div>}
          </div>
     </article>
}