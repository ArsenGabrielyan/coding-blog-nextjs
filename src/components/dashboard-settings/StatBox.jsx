import { abbrNum } from "@/constants/helpers";

export default function StatBox({Icon, title, data, enableAttr=false}){
     return <div className="stats-box">
          <div className="details">
               <h2>{enableAttr?abbrNum(data):data}</h2>
               <span>{title}</span>
          </div>
          <Icon/>
     </div>
}