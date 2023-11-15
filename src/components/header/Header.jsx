import Image from "next/image"; import Link from "next/link"
import UserDropdown from "./UserDropdown";
import { useSession } from "next-auth/react"
import { MdClose, MdSearch } from "react-icons/md";
import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation"; 
import { fetcher, toQueryURL } from "@/constants/helpers";
import { SkeletonElement } from "../pageLayouts/Skeleton-Loaders";

export default function Header(){
     const router = useRouter(), {status, data} = useSession();
     const {data: user, isLoading} = useSWR(`/api/users/${data?.user.id}`,fetcher);
     const [searchBox, setSearchBox] = useState({isOpen:false,search:''});
     const clearSearch = () => setSearchBox({isOpen:false,search:''});
     const acceptSearch = e => {
          e.preventDefault();
          if(searchBox.search.trim()!=='') {
               router.push(`/search?q=${toQueryURL(searchBox.search)}`)
               clearSearch();
          }
     }
     return <header className='siteHeader'>
          <Link href='/' id="logo"><Image src="/images/logo.webp" priority alt="" className="logo" width={125} height={80}/></Link>
          {searchBox.isOpen && <div className="inner-content">
               <form className="search" onSubmit={acceptSearch}>
                    <input type="text" name="search" placeholder="Search..." value={searchBox.search} onChange={e=>setSearchBox({...searchBox,search: e.target.value})} title="Search"/>
                    <span className="icon"><MdSearch/></span>
                    {(searchBox.search!=='' || searchBox.isOpen) && <button type='button' onClick={clearSearch}><MdClose/></button>}
               </form>
          </div>}
          <div className="userData">
               <button type="button" className="link-icon" onClick={()=>setSearchBox({...searchBox,isOpen:true})} title="Search..."><MdSearch/></button>
               {status==="unauthenticated" ? <Link href='/auth/signin' className="link">Sign In</Link> : isLoading ? <>
               <SkeletonElement type="square small icon-btn"/>
               <SkeletonElement type="pfp small"/>
               </> : <UserDropdown user={user}/>}
          </div>
     </header>
}