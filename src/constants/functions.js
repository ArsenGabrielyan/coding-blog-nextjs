import axios from "axios"; import { REQ_CONFIG } from "./forms/formData";

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
               if(n===1000 && i<abbr.length-1){n=1; i++;}
               n+=abbr[i]; break;
          }
     }
     return n;
}
export const fetcher = async url => {
     const res = await axios.get(url,REQ_CONFIG);
     return res.data
}
export const followUnfollow = async({status,email,userId},router,payload)=>{
     if(status==='authenticated'){
          const res = await axios.patch('/api/users',{email, userId},REQ_CONFIG);
          if(res.status===200) payload();
     } else router.push('/auth/signin')
}
export const sortList = (a,b,options)=>{
     switch(options.sortPost){
          case 'name': return a.title>b.title ? 1 : a.title<b.title ? -1 : 0
          case 'dName': return a.title>b.title ? -1 : a.title<b.title ? 1 : 0
          case 'latest': return a?-1:b?1:0;
          case 'oldest': return a?1:b?-1:0;
     }
}
export const toQueryURL = text => text.split(' ').join('+');
export const serializeObject = obj => JSON.parse(JSON.stringify(obj));
export const search = (val,q) => 
     val.name?.toLowerCase().includes(q.toLowerCase()) ||
     val.title?.toLowerCase().includes(q.toLowerCase()) ||
     val.username?.toLowerCase().includes(q.toLowerCase() ||
     val.keywords?.includes(q.toLowerCase())) ||
     val.otherData?.tags.includes(q.toLowerCase())
export const isCurrent = (currUser,post,author) => ({
     isLiked:currUser?.details?.likedPosts.includes(post?.post_id),
     isSaved:currUser?.details?.savedPosts.includes(post?.post_id),
     isFollowed:currUser?.details?.followingUsers.includes(author?.user_id),
})