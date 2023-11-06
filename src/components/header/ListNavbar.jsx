import { sortPostOptions } from "@/constants/constantData";
import { getCategories } from "@/constants/helpers"
import Link from "next/link"; import { useRouter } from "next/router";

export default function ListNavbar({options, change, usermode=false}){
     const router = useRouter();
     return <div className="list-nav">
     <h1>{router.pathname==='/posts' ? 'All Posts' : 'All Users'}</h1>
     <div className="list-nav-links">
          <Link href="/posts" className={router.pathname==='/posts' ? 'active' : ''}>Posts</Link>
          <Link href="/users" className={router.pathname==='/users' ? 'active' : ''}>Users</Link>
     </div>
     {!usermode && <div className="list-nav-options">
          <select title="Sort Posts" name="sortPost" value={options.sortPost} onChange={change?.handleChange}>
               {sortPostOptions.map((opt,i)=><option key={i} value={opt.value} disabled={!opt.value}>{opt.name}</option>)}
          </select>
          <select title="Filter Posts By Category" name="filterCategory" value={options.filterCategory} onChange={change?.changeFilter}>
               {getCategories('filter').map((opt,i)=><option key={i} value={opt.value} disabled={!opt.value}>{opt.name}</option>)}
          </select>
     </div>}
</div>
}