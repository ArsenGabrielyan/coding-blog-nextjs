import { MdClose, MdError, MdImage } from "react-icons/md";
import { useRef, useState } from "react";
import useTags from "@/lib/hooks/use-tags";
import Compress from "compress.js";
import { validatePost } from "@/constants/forms/validators";
import dynamic from "next/dynamic";
import { customMode, customToolbar, rehypePlugins, remarkPlugins } from "@/constants/markdown-options";
import axios from "axios"; import Link from "next/link";
import { REQ_CONFIG, INITIAL_POSTDATA } from "@/constants/forms/formData";
import { generate } from "@/constants/functions";
import { useRouter } from "next/navigation";
import { getCategories } from "@/constants/constantData";

const MarkdownEditor = dynamic(
     () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
     { ssr: false }
);   
export default function PostForm({postData,setPostData,currData,type='new'}){
     const bannerRef = useRef(null), thumbRef = useRef(null);
     const [err, setErr] = useState(''), [loaded, setLoaded] = useState(false);
     const tagOptions = useTags(setPostData,postData), compress = new Compress(), router = useRouter();
     const isCurrPost = JSON.stringify(postData)===JSON.stringify(currData);
     const handleChange = e => setPostData({...postData, [e.target.name]: e.target.value});
     const reset = type => {
          if(type==='some'){
               const {author,profileImage,email} = postData;
               setPostData({...INITIAL_POSTDATA,author,profileImage,email});
          }
          else setPostData(INITIAL_POSTDATA);
          setErr('');
          setLoaded(false);
     }
     const handleChangeFile = async e => {
          if(e.target.files[0]){
               const optimized = await compress.compress([...e.target.files],{
                    maxWidth: 1000,
                    maxHeight: 560,
                    size: 4, quality: 0.75
               });
               setPostData({...postData, [e.target.id==='banner' ? 'banner' : 'thumbnail']: {
                    preview: optimized[0].alt,
                    file: optimized[0].prefix+optimized[0].data,
                    size: optimized[0].initialSizeInMb
               }})
          }
     }
     const handleSubmit = async e => {
          e.preventDefault();
          if(validatePost(postData,setErr)) try{
               if(type==='new') {
                    setLoaded(true);
                    const postId = generate('id',12);
                    const res = await axios.post('/api/posts',{postData: {...postData, post_id: postId}},REQ_CONFIG);
                    if(res?.status===200){
                         setLoaded(false);
                         router.push(`/posts/${postId}`);
                         reset('all');
                    }
               } else{
                    setLoaded(true);
                    const res = await axios.put('/api/posts',{postData},REQ_CONFIG);
                    if(res?.status===200){
                         setLoaded(false);
                         router.push(`/posts/${postData.post_id}`);
                         reset('all');
                    }
               }  
          } catch(err){
               setLoaded(false)
               setErr(err.response ? err.response.data.message : err.message)
          } 
     }
     return <form className="frmNewPost" onSubmit={handleSubmit}>
          {err && <p className="frmErr"><MdError/> {err}</p>}
          <div className="imageUploads">
               <button className="imgUpload" type="button" onClick={()=>bannerRef.current.click()}><MdImage/> Upload Banner</button>
               <button className="imgUpload" type="button" onClick={()=>thumbRef.current.click()}><MdImage/> Upload Thumbnail</button>
               <input type="file" name="thumbnail" ref={thumbRef} onChange={handleChangeFile} hidden accept="image/*" id="thumbnail"/>
               <input type="file" name="banner" ref={bannerRef} hidden onChange={handleChangeFile} accept="image/*" id="banner"/>
          </div>
          {postData.banner.preview && <p className="imgPreview"><MdImage/> Banner: {postData.banner.preview} </p>}
          {postData.thumbnail.preview &&<p className="imgPreview"><MdImage/> Thumbnail: {postData.thumbnail.preview}</p>}
          <div className="frmGroup">
               <label>Post Title</label>
               <input type="text" name="title" placeholder="Make Sure It Represents the post you are currently creating" value={postData.title} onChange={handleChange}/>
          </div>
          <div className="frmGroup">
               <label className="separated">Post Description</label>
               <MarkdownEditor value={postData.content} onChange={val=>setPostData({...postData, content: val})} className="editor" enablePreview={false} toolbars={customToolbar} toolbarsMode={customMode} previewProps={{rehypePlugins,remarkPlugins}}/>
          </div>
          <div className="row">
               <div className="frmGroup">
                    <label>Email</label>
                    <input type="text" name="keywords" value={postData.email} readOnly/>
               </div>
               <div className="frmGroup">
                    <label>Post Category</label>
                    <select name="category" value={postData.category} onChange={handleChange}>
                         {getCategories().map((opt,i)=><option key={i} value={opt.value} disabled={!opt.value}>{opt.name}</option>)}
                    </select>
               </div>
          </div>
          <div className="frmGroup">
               <label>Keywords</label>
               <input type="text" name="keywords" placeholder="Enter a comma after each keyword and make sure they are unique" value={tagOptions.tagInput} onChange={tagOptions.changeTags} onKeyDown={tagOptions.handleKeydown}/>
          </div>
          {!!postData.keywords.length && <>
               <ul className="tagList">
                    {postData.keywords.map((tag,i)=><li key={i}><span onClick={()=>tagOptions.editTag(i)}>{tag}</span><button type="button" onClick={()=>tagOptions.removeTag(i)}><MdClose/></button></li>)}
               </ul>
               <button type="button" className="btn white btnTags" onClick={()=>tagOptions.clearAllTags()}>Clear All Keywords</button>
          </>}
          <div className="btns">
               <button className="btn fill" disabled={loaded || isCurrPost} type="submit">{loaded ? 'Loading...' : type!=='new' ? 'Apply Changes' : 'Publish'}</button>
               {type==='new' ? <button className="btn white" disabled={loaded} type="button" onClick={()=>reset('some')}>Reset Details</button> : <Link className="btn white" href={`/posts/${currData.post_id}`} onClick={()=>reset('all')}>Cancel</Link>}
          </div>
     </form>
}