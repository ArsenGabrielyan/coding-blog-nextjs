import { signOut } from "next-auth/react"
import Image from "next/image"; import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import {FaPlus, FaUser} from "react-icons/fa"
import {MdSettings, MdLogout, MdBookmark, MdDashboard} from "react-icons/md"

export default function UserDropdown({user}){
     const [isOpen, setIsOpen] = useState(false)
     const pfpRef = useRef(null);
     useEffect(()=>{
          const handleClick = e => {if(!pfpRef.current?.contains(e.target)) setIsOpen(false);}
          document.addEventListener('click',handleClick,true)
          return () => document.removeEventListener('click',handleClick,true)
     },[]);
     return <>
          <Link className="link-icon" title="Create a Post" href="/post-editor"><FaPlus/></Link>
          {user && <Image src={user.image} alt="profilePic" width={64} height={64} onClick={()=>setIsOpen(!isOpen)} ref={pfpRef}/>}
          <div className={`menu ${!isOpen ? 'hide' : ''}`}>
               <span className="full-name">{user?.name}</span><br/>
               <span className="username">@{user?.username}</span>
               <ul>
                    <li><FaUser/><Link href={`/users/${user?.id || user?.username}`}>Your Profile</Link></li>
                    <li><MdBookmark/><Link href='/saved'>Saved Posts</Link></li>
                    <li><MdSettings/><Link href='/settings'>Settings</Link></li>
                    <li><MdDashboard/><Link href='/dashboard'>Dashboard</Link></li>
                    <li><MdLogout/><Link href='#' onClick={async()=>await signOut()}>Sign Out</Link></li>
               </ul>
          </div>
     </>
}