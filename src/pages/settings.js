import Layout from "@/components/pageLayouts/Layout";
import { settingPages } from "@/constants/constantData";
import { serializeObject } from "@/constants/helpers";
import connectDB from "@/lib/connectDb"; import User from "@/model/CredentialsUser";
import useSettings from "@/lib/hooks/use-settings";
import useUnsavedWarning from "@/lib/hooks/use-unsaved";
import { getSession } from "next-auth/react"; import { useState } from "react";
import Head from "next/head"; import { useRouter } from "next/router";
import SettingMenu from "@/components/features/SettingMenu";

export default function SettingsPage({user}){
     const router = useRouter();
     const [mode, setMode] = useState(router.query?.page || 'account');
     const [accPage, setAccPage] = useState('basic');
     const settings = useSettings(user,mode,accPage);
     const changePage = (page) => {
          setMode(page.name)
          router.push(`/settings?page=${page.name}`,undefined,{shallow:true})
     };
     useUnsavedWarning(!settings.isCurrSetting);
     return <>
     <Head><title>Settings | EduArticles</title></Head>
     <Layout>
          <h1 className="pageTitle">Settings</h1>
          <div className="settings-container">
               <SettingMenu user={user} activeElem={mode} changePage={changePage}/>
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