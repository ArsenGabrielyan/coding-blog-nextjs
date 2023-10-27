import Image from "next/image"

export default function DashboardComment({data}){
     return <div className="comment" key={data.commentId}>
          <Image src={data.image} alt="follower" width={48} height={48} className="pfp"/>
          <div className="comment-details">
               <span>@{data.name}</span>
               <p>{data.comment}</p>
          </div>
     </div>
}