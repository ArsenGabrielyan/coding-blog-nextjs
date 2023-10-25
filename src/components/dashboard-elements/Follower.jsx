import Image from "next/image";

export default function Follower({data}){
     return <div className="follower" key={data?.user_id}>
          <Image src={data?.image} alt="follower" width={55} height={55}/>
          <div className="follower-details">
               <h3>{data?.name}</h3>
               <p>@{data?.username}</p>
          </div>
     </div>
}