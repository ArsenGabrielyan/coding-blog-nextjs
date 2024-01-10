import axios from "axios";
import { REQ_CONFIG } from "./forms/formData";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { appStorage } from "@/lib/firebase";

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
export const followUnfollow = async({status,email,userId,name},router,isFollowed,payload)=>{
     if(status==='authenticated'){
          const res = await axios.patch('/api/users',{email, userId},REQ_CONFIG);
          if(res.status===200) await toast.promise(payload(),{
               pending: 'Processing...',
               success: `Successfully ${isFollowed ? 'Unfollowed' : 'Followed'} ${name}`,
               error: `Failed to ${isFollowed ? 'Unfollow' : 'Follow'} ${name}`
          });
     } else router.push('/auth/signin')
}
export const sortByLatest = arr => arr?.sort((a,b)=>{
     const d1 = new Date(a.date).getTime(), d2 = new Date(b.date).getTime();
     return d1>d2?-1:d1<d2?1:0
})
export const sortList = (a,b,options)=>{
     const d1 = new Date(a.date).getTime(), d2 = new Date(b.date).getTime();
     switch(options.sortPost){
          case 'name': return a.title>b.title ? 1 : a.title<b.title ? -1 : 0
          case 'dName': return a.title>b.title ? -1 : a.title<b.title ? 1 : 0
          case 'latest': return d1>d2?-1:d1<d2?1:0;
          default: return d1>d2?1:d1<d2?-1:0;
     }
}
export const toQueryURL = text => text.split(' ').join('+');
export const serializeObject = obj => JSON.parse(JSON.stringify(obj));
export const search = (val,q) => 
     val.name?.toLowerCase().includes(q.toLowerCase()) ||
     val.title?.toLowerCase().includes(q.toLowerCase()) ||
     val.username?.toLowerCase().includes(q.toLowerCase() ||
     val.keywords?.includes(q.toLowerCase())) ||
     val.otherData?.keywords.includes(q.toLowerCase()) ||
     val.content?.toLowerCase().includes(q.toLowerCase())
export const currentPost = (currUser,post,author) => ({
     isLiked:currUser?.details?.likedPosts.includes(post?.post_id),
     isSaved:currUser?.details?.savedPosts.includes(post?.post_id),
     isFollowed:currUser?.details?.followingUsers.includes(author?.user_id),
})
export const format12Hr = time => {
     const [hr,mn,sc] = time.split(':');
     const timeObj = new Date();
     timeObj.setHours(hr);
     timeObj.setMinutes(mn);
     timeObj.setSeconds(sc);
     const ampm = timeObj.getHours()>=12?'PM':'AM';
     let hr12 = timeObj.getHours()%12;
     hr12 = hr12 ? hr12 : 12;
     return `${hr12}:${mn}:${sc} ${ampm}`;
}
export const shareData = async (title='') => {
     const shareData = {
          title: 'CodeBlog',
          text: title,
          url: location.href
     }
     if(navigator.canShare(shareData)) await navigator.share(shareData)
     else {
          navigator.clipboard.writeText(location.href);
          toast.success('Link is Copied');
     }
}
export const currentComment = (users,currUser,commentId) => ({
     commentLikes: users?.filter(val=>val.details.likedComments.includes(commentId)).length,
     isLikedComment: currUser?.details?.likedComments.includes(commentId)
});
export const getCategories = (type='standard')=>{
     const filterMode = type==='filter' ? [{name: 'Filter By Category'},{name: 'All', value: 'all'}] : [];
     return [...filterMode,
          {name: 'Game Dev', value: 'game-dev'},
          {name: 'FrontEnd', value: 'frontend'},
          {name: 'BackEnd', value: 'backend'},
          {name: 'Full Stack', value: 'full-stack'},
          {name: 'Databases', value: 'databases'},
          {name: 'Coding Tools', value: 'coding-tools'},
          {name: 'Others (Coding Related)', value: 'others'},
          {name: 'Software Dev', value: 'software-dev'},
          {name: 'Mobile Dev', value: 'mobile-dev'},
          {name: 'Hardware Dev', value: 'hardware-dev'},
          {name: 'IoT Things', value: 'iot'},
          {name: 'Circuits', value: 'circuits'},
     ]
}
export async function uploadPostImage(data,type,postId){
     const fileName = type!=='thumb' ? 'banner' : 'thumbnail';
     const file = type!=='thumb' ? data.banner : data.thumbnail;
     const imgRef = ref(appStorage,`post-${postId}/${fileName}`);
     await uploadBytes(imgRef,file);
     return await getDownloadURL(imgRef);
}
export const getRecommendedTags = category =>{
     switch(category){
          case 'game-dev': return ['unity','unreal-engine','game-maker','clickteam-fusion','godot','kaboom-js']
          case 'frontend': return ['html','css','bootstrap','javascript','react','angular','vue','jquery','json','pwa','spa','website','web','web-app','sass','scss']
          case 'backend': return ['php','python','ruby','node-js','api','express-js']
          case 'full-stack': return ['next-js','javascript','express-js','php','python','ruby','node-js','api']
          case 'databases': return ['sql','mysql','postgresql','mongodb','nosql']
          case 'coding-tools': return ['github','git','firebase','supabase','gitlab','aws','visual-studio','vscode','api','google-cloud','linux','docker']
          case 'software-dev': return ['java','c++','c#','c','python','visual-basic','dotnet','software']
          case 'mobile-dev': return ['react-native','android','ios','lua','kotlin','java','swift','dotnet']
          case 'hardware-dev': return ['pc','mac','macbook','hardware','circuits']
          case 'iot': return ['raspberry-pi','arduino','node-mcu']
          case 'circuits': return ['pcb','breadboard','raspberry-pi','arduino','node-mcu','rc','smart-projects','hardware','circuits']
          default: return []
     }
}