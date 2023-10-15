import { signOut } from "next-auth/react"
import Image from "next/image"; import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import {FaPlus, FaUser} from "react-icons/fa"
import {MdSettings,MdLogout,MdBookmark, MdHelp} from "react-icons/md"

export default function UserDropdown({user}){
     const [isOpen, setIsOpen] = useState(false)
     const pfpRef = useRef(null);
     useEffect(()=>{
          document.addEventListener('click',e=>{
               if(!pfpRef.current?.contains(e.target)) setIsOpen(false);
          },true)//eslint-disable-next-line
     },[]);
     return <div className="userData">
          <Link className="link-icon" title="Create a Post" href="/postEditor"><FaPlus/></Link>
          {user && <Image src={user.image} alt="profilePic" width={64} height={64} onClick={()=>setIsOpen(!isOpen)} ref={pfpRef}/>}
          <div className={`menu ${!isOpen ? 'hide' : ''}`}>
               <span className="full-name">{user?.name}</span><br/>
               <span className="username">@{user?.username}</span>
               <ul>
                    <li><FaUser/><Link href={`/users/${user?.id || user?.username}`}>Your Profile</Link></li>
                    <li><MdBookmark/><Link href='/saved'>Saved Posts</Link></li>
                    <li><MdSettings/><Link href='/settings'>Settings</Link></li>
                    <li><MdHelp/><Link href='#'>Help and Feedback</Link></li>
                    <li><MdLogout/><Link href='#' onClick={async()=>await signOut()}>Sign Out</Link></li>
               </ul>
          </div>
     </div>
}