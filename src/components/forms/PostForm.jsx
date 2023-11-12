import { MdClose, MdError, MdImage } from "react-icons/md";
import { useRef, useState } from "react";
import useTags from "@/lib/hooks/tools/use-tags";
import useUnsavedWarning from "@/lib/hooks/tools/use-unsaved";
import { validatePost } from "@/constants/forms/validators";
import axios from "axios"; import Link from "next/link";
import { REQ_CONFIG, INITIAL_POSTDATA } from "@/constants/forms/formData";
import { generate, getCategories, uploadPostImage } from "@/constants/helpers";
import { useRouter } from "next/navigation";
import { MarkdownInput } from "@/constants/markdown-options";

export default function PostForm({postData,setPostData,currData,type='new'}){
     const bannerRef = useRef(null), thumbRef = useRef(null);
     const [err, setErr] = useState('');
     const [loaded, setLoaded] = useState(false);
     const tagOptions = useTags(setPostData,postData);
     const router = useRouter();
     const isCurrPost = JSON.stringify(postData)===JSON.stringify(currData);
     useUnsavedWarning(!isCurrPost);
     const handleChange = e => setPostData({...postData, [e.target.name]: e.target.value});
     const reset = type => {
          if(type==='some'){
               const {author,profileImage,email} = postData;
               setPostData({...INITIAL_POSTDATA,author,profileImage,email});
          }
          else setPostData(INITIAL_POSTDATA);
          setErr('');setLoaded(false);
     };
     const handleChangeFile = async e => {
          if(e.target.files.length)  setPostData({...postData, [e.target.id==='banner' ? 'banner' : 'thumbnail']: e.target.files[0]});
     }
     const handleSubmit = async e => {
          e.preventDefault();
          if(validatePost(postData,setErr)) try{
               setLoaded(true);
               if(type==='new') {
                    const postId = generate('id',12);
                    const bannerImg = await uploadPostImage(postData,'banner',postId);
                    const thumbImg = await uploadPostImage(postData,'thumb',postId);
                    const res = await axios.post('/api/posts',{postData: {...postData, post_id: postId, banner: bannerImg, thumbnail: thumbImg}},REQ_CONFIG);
                    if(res?.status===200){
                         setLoaded(false);
                         router.push(`/posts/${postId}`);
                         reset('all');
                    }
               } else{
                    const bannerImg = await uploadPostImage(postData,'banner',postData.post_id);
                    const thumbImg = await uploadPostImage(postData,'thumb',postData.post_id);
                    const res = await axios.put('/api/posts',{postData: {...postData, banner: bannerImg, thumbnail: thumbImg}},REQ_CONFIG);
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
          {postData.banner?.name && <p className="imgPreview"><MdImage/> Banner: {postData.banner?.name} </p>}
          {postData.thumbnail?.name &&<p className="imgPreview"><MdImage/> Thumbnail: {postData.thumbnail?.name}</p>}
          <div className="frmGroup">
               <label>Post Title</label>
               <input type="text" name="title" placeholder="Make Sure It Represents the post you are currently creating" value={postData.title} onChange={handleChange}/>
          </div>
          <div className="frmGroup">
               <label className="separated">Post Description</label>
               <MarkdownInput val={postData.content} changeVal={val=>setPostData({...postData, content: val})}/>
          </div>
          <div className="row">
               <div className="frmGroup">
                    <label>Email</label>
                    <input type="text" name="email" value={postData.email} readOnly/>
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