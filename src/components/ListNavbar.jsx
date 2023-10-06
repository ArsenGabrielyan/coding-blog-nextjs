import { sortPostOptions, sortUserOptions, getCategories } from "@/constants/constantData";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ListNavbar({userMode=false}){
     const router = useRouter();
     const [options, setOptions] = useState({sortPost: 'default',sortUser: 'default',filterCategory: 'all',})
     const handleChangeOptions = e => setOptions({...options, [e.target.name]: e.target.value});
     return <div className="list-nav">
     <h1>{router.pathname==='/posts' ? 'All Posts' : 'All Users'}</h1>
     <div className="list-nav-links">
          <Link href="/posts" className={router.pathname==='/posts' ? 'active' : ''}>Posts</Link>
          <Link href="/users" className={router.pathname==='/users' ? 'active' : ''}>Users</Link>
     </div>
     <div className="list-nav-options">
          {!userMode ? <>
          <select title="Sort Posts" name="sortPost" value={options.sortPost} onChange={handleChangeOptions}>
               {sortPostOptions.map((opt,i)=><option key={i} value={opt.value} disabled={!opt.value}>{opt.name}</option>)}
          </select>
          <select title="Filter Posts By Category" name="filterCategory" value={options.filterCategory} onChange={handleChangeOptions}>
               {getCategories('filter').map((opt,i)=><option key={i} value={opt.value} disabled={!opt.value}>{opt.name}</option>)}
          </select>
          </> : <select title="Sort Users" name="sortUser" value={options.sortUser} onChange={handleChangeOptions}>
               {sortUserOptions.map((opt,i)=><option key={i} value={opt.value} disabled={!opt.value}>{opt.name}</option>)}
          </select>}
     </div>
</div>
}