import { signOut } from "next-auth/react"
import Image from "next/image"; import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import {FaUser} from "react-icons/fa"
import {MdSettings,MdLogout,MdNotifications,MdDashboard,MdPostAdd, MdBookmark, MdHelp} from "react-icons/md"

export default function UserDropdown({user}){
     const [toggle, setToggle] = useState({pfp: false, notif: false})
     const pfpRef = useRef(null), notifRef = useRef(null)
     useEffect(()=>{
          document.addEventListener('click',e=>{
               if(!pfpRef.current?.contains(e.target)) setToggle({...toggle, pfp: false});
               if(!notifRef.current?.contains(e.target)) setToggle({...toggle, notif: false});
          },true)//eslint-disable-next-line
     },[]);
     const updateToggle = type => {
          switch(type){
               case 'pfp':
                    setToggle({...toggle, pfp: !toggle.pfp});
                    break;
               case 'notif':
                    setToggle({...toggle, notif: !toggle.notif});
                    break;
               default: break;
          }
     }
     return <div className="userData">
          <button className="link-icon" title="Notifications" ref={notifRef} onClick={()=>updateToggle('notif')}><MdNotifications/></button>
          <div className={`notifMenu ${!toggle.notif ? 'hide' : ''}`}>
               <span className="notifTitle">Notifications</span><br/>
               <span className="notifEmpty">There are no New Notifications</span>
          </div>
          {user && <Image src={user.image} alt="profilePic" width={64} height={64} onClick={()=>updateToggle('pfp')} ref={pfpRef}/>}
          <div className={`menu ${!toggle.pfp ? 'hide' : ''}`}>
               <span className="full-name">{user?.name}</span><br/>
               <span className="username">@{user?.username}</span>
               <ul>
                    <li><FaUser/><Link href={`/users/${user?.id || user?.username}`}>Your Profile</Link></li>
                    <li><MdPostAdd/><Link href='/postEditor'>Create a Post</Link></li>
                    <li><MdBookmark/><Link href='/saved'>Saved Posts</Link></li>
                    <li><MdDashboard/><Link href='#'>Dashboard</Link></li>
                    <li><MdSettings/><Link href='#'>Settings</Link></li>
                    <li><MdHelp/><Link href='#'>Help and Feedback</Link></li>
                    <li><MdLogout/><Link href='#' onClick={async()=>await signOut()}>Sign Out</Link></li>
               </ul>
          </div>
     </div>
}