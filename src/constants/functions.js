import axios from "axios";
import { REQ_CONFIG } from "./forms/formData";
import {createTransport} from "nodemailer";

export const generate = (type,length) => {
     const chars = type==='id' ? 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' : 'abcdefghijklmnopqrstuvwxyz0123456789';
     let newChar = '';
     for(let i=0;i<length;i++){
          const randomChar = chars[Math.floor(Math.random()*chars.length)];
          newChar+=randomChar;
     }
     return newChar;
}
export const abbrNum = (n,dec=2) => {
     dec = Math.pow(10,dec);
     const abbr = ["K", "M", "B", "T"];
     for(let i=abbr.length-1;i>=0;i--){
          const size = Math.pow(10,(i+1)*3);
          if(size<=n){
               n=Math.round((n*dec)/size)/dec;
               if(n===1000 && i<abbr.length-1){n=1;i++;}
               n+=abbr[i];
               break;
          }
     }
     return n;
}
export const toQueryURL = text => text.split(' ').join('+');
export const serializeObject = obj => JSON.parse(JSON.stringify(obj));
export const search = (val,q) => {
     return val.name?.toLowerCase().includes(q.toLowerCase()) ||
     val.title?.toLowerCase().includes(q.toLowerCase()) ||
     val.username?.toLowerCase().includes(q.toLowerCase() ||
     val.keywords?.includes(q.toLowerCase())) ||
     val.otherData?.tags.includes(q.toLowerCase())
}
export const followUnfollow = async(status,email,userId,router)=>{
     if(status==='authenticated'){
          const res = await axios.patch('/api/userApi',{email, userId},REQ_CONFIG);
          if(res.status===200) location.reload();
     } else router.replace('/auth/signin')
}
export const sendEmail = async(email,subject,text)=>{
     const USER = process.env.BASE_EMAIL;
     const transporter = createTransport({
          service: 'gmail',
          auth: {
               user: USER,
               pass: process.env.BASE_PASS
          }
     })
     transporter.sendMail({
          from: USER,
          to: email,
          subject,text
     },(err,info)=>{
          if(err) console.error("email didn't sent because of a following error: " + err);
          else console.info(`email sent to ${email}: ${info.response}`)
     });
}
export const sortList = (a,b,type,options)=>{
     if(type==='post') switch(options.sortPost){
          case 'name':
               if(a.title>b.title) return 1;
               if(a.title<b.title) return -1;
               return 0;
          case 'dName':
               if(a.title>b.title) return -1;
               if(a.title<b.title) return 1;
               return 0;
          case 'latest': return a?-1:b?1:0;
          default: return a?1:b?-1:0;
     } else switch(options.sortUser){
          case 'followers':
               if(a.followers>b.followers) return -1;
               if(a.followers<b.followers) return 1;
               return 0;
          case 'dFollowers':
               if(a.followers>b.followers) return 1;
               if(a.followers<b.followers) return -1;
               return 0;
          case 'name':
               if(a.name>b.name) return 1;
               if(a.name<b.name) return -1;
               return 0;
          case 'dName':
               if(a.name>b.name) return -1;
               if(a.name<b.name) return 1;
               return 0;
          default:
               if(a.user_id>b.user_id) return 1;
               if(a.user_id<b.user_id) return -1;
               return 0;
     }
}