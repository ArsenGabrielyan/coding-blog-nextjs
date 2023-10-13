import { sortPostOptions, getCategories } from "@/constants/constantData";
import Link from "next/link"; import { useRouter } from "next/router";

export default function ListNavbar({options, change}){
     const router = useRouter(), {handleChange, changeFilter} = change;
     return <div className="list-nav">
     <h1>{router.pathname==='/posts' ? 'All Posts' : 'All Users'}</h1>
     <div className="list-nav-links">
          <Link href="/posts" className={router.pathname==='/posts' ? 'active' : ''}>Posts</Link>
          <Link href="/users" className={router.pathname==='/users' ? 'active' : ''}>Users</Link>
     </div>
     <div className="list-nav-options">
          <select title="Sort Posts" name="sortPost" value={options.sortPost} onChange={handleChange}>
               {sortPostOptions.map((opt,i)=><option key={i} value={opt.value} disabled={!opt.value}>{opt.name}</option>)}
          </select>
          <select title="Filter Posts By Category" name="filterCategory" value={options.filterCategory} onChange={changeFilter}>
               {getCategories('filter').map((opt,i)=><option key={i} value={opt.value} disabled={!opt.value}>{opt.name}</option>)}
          </select>
     </div>
</div>
}