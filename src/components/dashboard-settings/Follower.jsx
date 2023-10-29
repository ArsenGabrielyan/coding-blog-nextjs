import Image from "next/image";
import Link from "next/link";

export default function Follower({data, onClick}){
     return <div className="follower" key={data?.user_id}>
          <Link href={`/users/${data?.username}`} onClick={onClick}><Image src={data?.image} alt="follower" width={55} height={55}/></Link>
          <div className="follower-details">
               <h3>{data?.name}</h3>
               <p>@{data?.username}</p>
          </div>
     </div>
}