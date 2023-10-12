import { sortPostOptions, sortUserOptions, getCategories } from "@/constants/constantData";
import Link from "next/link"; import { useRouter } from "next/router";

export default function ListNavbar({userMode=false, options, handleChange, changeFilter}){
     const router = useRouter();
     return <div className="list-nav">
     <h1>{router.pathname==='/posts' ? 'All Posts' : 'All Users'}</h1>
     <div className="list-nav-links">
          <Link href="/posts" className={router.pathname==='/posts' ? 'active' : ''}>Posts</Link>
          <Link href="/users" className={router.pathname==='/users' ? 'active' : ''}>Users</Link>
     </div>
     <div className="list-nav-options">
          {!userMode ? <>
          <select title="Sort Posts" name="sortPost" value={options.sortPost} onChange={handleChange}>
               {sortPostOptions.map((opt,i)=><option key={i} value={opt.value} disabled={!opt.value}>{opt.name}</option>)}
          </select>
          <select title="Filter Posts By Category" name="filterCategory" value={options.filterCategory} onChange={changeFilter}>
               {getCategories('filter').map((opt,i)=><option key={i} value={opt.value} disabled={!opt.value}>{opt.name}</option>)}
          </select>
          </> : <select title="Sort Users" name="sortUser" value={options.sortUser} onChange={handleChange}>
               {sortUserOptions.map((opt,i)=><option key={i} value={opt.value} disabled={!opt.value}>{opt.name}</option>)}
          </select>}
     </div>
</div>
}