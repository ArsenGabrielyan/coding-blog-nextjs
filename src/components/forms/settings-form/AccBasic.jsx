import dynamic from "next/dynamic";
import { customToolbar, rehypePlugins, remarkPlugins } from "@/constants/markdown-options";
import { MdClose } from "react-icons/md";

const MarkdownEditor = dynamic(
     () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
     { ssr: false }
);   
export default function AccBasic({user, changeAccSetting, changeBio, tagOptions}){
     return <>
          <div className="frmRow">
               <div className="frmGroup">
                    <label htmlFor="name">Account Name</label>
                    <input type="text" name="name" value={user?.name} id="name" onChange={changeAccSetting} placeholder="e.g. John Doe"/>
               </div>
               <div className="frmGroup">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={user?.email} id="email" onChange={changeAccSetting} placeholder="e.g. name@example.com"/>
               </div>
          </div>
          <div className="frmRow">
               <div className="frmGroup">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={user?.username} id="username" onChange={changeAccSetting}/>
               </div>
               <div className="frmGroup">
                    <label htmlFor="website">Website</label>
                    <input type="text" name="website" value={user?.website} placeholder="e.g. www.example.com" id="website" onChange={changeAccSetting}/>
               </div>
          </div>
          <div className="frmGroup">
               <label htmlFor="bio">Bio</label>
               <MarkdownEditor value={user?.bio} className="editor" toolbars={customToolbar} toolbarsMode={['preview']} previewProps={{rehypePlugins,remarkPlugins}} id="bio" onChange={changeBio}/>
          </div>
          <div className="frmGroup">
               <label htmlFor="tags">Keywords</label>
               <input type="text" name="tags" id="tags" value={tagOptions.tagInput} onChange={tagOptions.changeTags} onKeyDown={tagOptions.handleKeydown} placeholder="Enter a comma after each keyword and make sure they are unique"/>
          </div>
          <ul className="tags">
               {user?.keywords && user?.keywords.map((tag,i)=><li key={i}><span onClick={()=>tagOptions.editTag(i)}>{tag}</span><button type="button" onClick={()=>tagOptions.removeTag(i)}><MdClose/></button></li>)}
          </ul>
     </>
}