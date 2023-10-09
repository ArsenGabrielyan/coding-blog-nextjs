import { FaCalendar, FaThumbsUp, FaComment, FaShare, FaBookmark } from "react-icons/fa";
import { MarkdownContent } from "@/constants/markdown-options";
import Image from "next/image";
import BlogPost from "./BlogPost";

export default function PostPreview({postData}){
     return <div className="results">
          <div className="results-single-post">
               <h2 className="title">Single Post Preview</h2>
               <div className="single-post">
                    <div className="single-post-header">
                         <Image src={postData.banner.file || '/images/post-header.webp'} alt="banner" fill priority/>
                    </div>
                    <div className="single-post-body">
                         <h2 className="title-edit">{postData.title}</h2>
                         <div className="details-upper">
                              <span className="user"><Image src={postData.profileImage} alt="account profile" width={45} height={45}/>{postData.author}</span>
                              <span className="date"><FaCalendar/> {postData.date}</span>
                         </div>
                         <div className="content">
                              <MarkdownContent>{postData.content}</MarkdownContent>
                         </div>
                         <div className="details-lower edit-mode">
                              <div>
                                   <span title="Like"><FaThumbsUp/> 0</span>
                                   <span title="Comment"><FaComment/> 0</span>
                              </div>
                              <div>
                                   <span title="Save to Reading List"><FaBookmark/></span>
                                   <span title="Share"><FaShare/></span>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
          <div className="result-card posts">
               <h2 className="title">Post Card Preview</h2>
               <BlogPost data={postData} noLink/>
          </div>
     </div>
}