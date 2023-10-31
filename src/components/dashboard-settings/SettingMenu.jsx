import { settingPages } from "@/constants/constantData"
import Image from "next/image"
import Link from "next/link"
import { FaComments, FaNewspaper } from "react-icons/fa"
import { MdDashboard } from "react-icons/md"

export default function SettingMenu({user,activeElem,changePage}){
     return <div className="settings-menu">
     {user && <>
          <Image src={user.image} alt="pfp" width={175} height={175} priority/>
          <h2>{user?.name}</h2>
     </>}
     <ul>
          {settingPages.map((page,i)=><li key={i} onClick={()=>changePage(page)} className={activeElem===page.name ? 'active' : ''}><page.IconName/>{page.title}</li>)}
          <li className={activeElem==='dashboard' ? 'active' : ''}><MdDashboard/><Link href="/dashboard">Dashboard</Link></li>
          <li className={activeElem==='comments' ? 'active' : ''}><FaComments/><Link href="/dashboard/comments">Comments</Link></li>
          <li><FaNewspaper/><Link href={`/users/${user?.user_id}`}>Posts</Link></li>
     </ul>
</div>
}