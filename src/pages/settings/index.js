import Layout from "@/components/Layout";
import { settingPages } from "@/constants/constantData";
import { serializeObject } from "@/constants/functions";
import connectDB from "@/lib/connectDb";
import useSettings from "@/lib/hooks/use-settings";
import User from "@/model/CredentialsUser";
import { getSession } from "next-auth/react";
import Head from "next/head"; import { useRouter } from "next/router";
import Image from "next/image"; import Link from "next/link";
import { useState } from "react";

export default function SettingsPage({user}){
     const router = useRouter();
     const [mode, setMode] = useState(router.query?.page || 'account');
     const [accPage, setAccPage] = useState('basic');
     const settings = useSettings(user,mode,accPage);
     const changePage = (page) => {
          setMode(page.name)
          router.push(`/settings?page=${page.name}`,undefined,{shallow:true})
     }
     return <>
     <Head><title>Settings | EduArticles</title></Head>
     <Layout>
          <h1 className="pageTitle">Settings</h1>
          <div className="settings-container">
               <div className="settings-menu">
                    {user && <>
                         <Image src={user.image} alt="pfp" width={175} height={175} priority/>
                         <h2>{user?.name}</h2>
                    </>}
                    <ul>
                         {settingPages.map((page,i)=><li key={i} onClick={()=>changePage(page)} className={mode===page.name ? 'active' : ''}>{page.title}</li>)}
                         <li><Link href="/settings/dashboard">Dashboard</Link></li>
                         <li><Link href="/settings/dashboard/comments">Comments</Link></li>
                    </ul>
               </div>
               <div className="settings-content">
                    <h2>{settingPages.find(val=>val.name===mode).title} Settings</h2>
                    <form onSubmit={settings.updateSettings} onReset={settings.resetSettings}>
                         {settings.getSettings()}
                         <div className="frmBtns">
                              <button type="submit" className="btn submit" disabled={settings.isCurrSetting}>Update</button>
                              {mode==='account' && <>
                                   {settings.accSettings.keywords.length ? <button type="button" className="btn" onClick={settings.tagOptions.clearAllTags}>Clear All Tags</button> : null}
                                   {accPage==='basic' ? <button type="button" className="btn" onClick={()=>setAccPage('advanced')}>Other Settings</button> : <button type="button" className="btn" onClick={()=>setAccPage('basic')}>Back</button>}
                              </>}
                              <button type="reset" className="btn">Cancel</button>
                         </div>
                    </form>
               </div>
          </div>
     </Layout>
     </>
}
export async function getServerSideProps(ctx){
     const session = await getSession(ctx);
     if(session){
          await connectDB();
          const user = await User.findOne({email: session?.user.email});
          return {props: {user: serializeObject(user)}}
     } else return {redirect:{
          pernament:false,
          destination: '/auth/signin'
     }}
}