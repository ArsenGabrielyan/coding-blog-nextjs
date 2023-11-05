import Image from "next/image";
import Link from "next/link";
import { abbrNum } from "@/constants/helpers";

export const Follower = ({data, onClick}) => <div className="follower" key={data?.user_id}>
     <Link href={`/users/${data?.username}`} onClick={onClick}><Image src={data?.image} alt="follower" width={55} height={55}/></Link>
     <div className="follower-details">
          <h3>{data?.name}</h3>
          <p>@{data?.username}</p>
     </div>
</div>

export const DashboardElem = ({title='',children}) => <div className="dashboard-element">
     <h2 className="title">{title}</h2>
     {children}
</div>

export const DashboardComment = ({data}) => <div className="comment" key={data.commentId}>
     <Image src={data.image} alt="follower" width={48} height={48} className="pfp"/>
     <div className="comment-details">
          <span>@{data.name}</span>
          <p>{data.comment}</p>
     </div>
</div>

export const StatBox = ({Icon, title, data, enableAttr=false}) => <div className="stats-box">
     <div className="details">
          <h2>{enableAttr?abbrNum(data):data}</h2>
          <span>{title}</span>
     </div>
     <Icon/>
</div>