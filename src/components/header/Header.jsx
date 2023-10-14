import Image from "next/image"; import Link from "next/link"
import UserDropdown from "./UserDropdown"
import { useSession } from "next-auth/react"
import { MdClose, MdSearch } from "react-icons/md";
import { useState } from "react"
import { useRouter } from "next/navigation";
import { fetcher, toQueryURL } from "@/constants/functions";
import useSWR from "swr";

export default function Header(){
     const router = useRouter(), {status, data} = useSession();
     const {data: user} = useSWR(`/api/users/${data?.user.id}`,fetcher)
     const [isOpenSearch, setIsOpenSearch] = useState(false);
     const [search, setSearch] = useState('')
     const clearSearch = () => {
          setSearch('');
          setIsOpenSearch(false)
     }
     const acceptSearch = e => {
          e.preventDefault();
          if(search.trim()!=='') {
               router.push(`/search?q=${toQueryURL(search)}`)
               clearSearch();
          }
     }
     return <header className={`siteHeader ${status==='loading' ? 'loading' : ''}`}>
          <Link href='/' id="logo"><Image src="/images/logo.webp" priority alt="" className="logo" width={125} height={80}/></Link>
          <div className={`inner-content ${isOpenSearch ? 'active' : ''}`}>
               <button className="searchBtn" onClick={()=>setIsOpenSearch(true)} title="Search..."><MdSearch/></button>
               <form className="search" onSubmit={acceptSearch}>
                    <input type="text" name="search" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} title="Search"/>
                    <span className="icon"><MdSearch/></span>
                    {(search!=='' || isOpenSearch) && <button type='button' onClick={clearSearch}><MdClose/></button>}
               </form>
          </div>
          {status==="unauthenticated" ? <Link href='/auth/signin' className="link">Sign In</Link> : <UserDropdown user={user}/>}
     </header>
}