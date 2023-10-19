import dynamic from "next/dynamic";
import { customToolbar, rehypePlugins, remarkPlugins } from "@/constants/markdown-options";
import { MdClose } from "react-icons/md";

const MarkdownEditor = dynamic(
     () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
     { ssr: false }
);   
export default function Accounts1({user}){
     return <>
          <div className="frmRow">
               <div className="frmGroup">
                    <label htmlFor="name">Account Name</label>
                    <input type="text" name="name" value={user?.name} id="name"/>
               </div>
               <div className="frmGroup">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={user?.email} id="email"/>
               </div>
          </div>
          <div className="frmRow">
               <div className="frmGroup">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" value={user?.username} id="username"/>
               </div>
               <div className="frmGroup">
                    <label htmlFor="website">Website</label>
                    <input type="text" name="website" value={user?.otherData.website} placeholder="e.g. example.com" id="website"/>
               </div>
          </div>
          <div className="frmGroup">
               <label htmlFor="bio">Bio</label>
               <MarkdownEditor value={user?.otherData.bio} className="editor" toolbars={customToolbar} toolbarsMode={['preview']} previewProps={{rehypePlugins,remarkPlugins}} id="bio"/>
          </div>
          <div className="frmGroup">
               <label htmlFor="tags">Tags (Keywords)</label>
               <input type="text" name="tags" id="tags"/>
          </div>
          <ul className="tags">
               <li><span>Heyyy</span><button type="button"><MdClose/></button></li>
               <li><span>Heyyy</span><button type="button"><MdClose/></button></li>
               <li><span>Heyyy</span><button type="button"><MdClose/></button></li>
          </ul>
     </>
}