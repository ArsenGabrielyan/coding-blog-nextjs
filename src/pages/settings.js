import Layout from "@/components/Layout";
import Accounts1 from "@/components/forms/settings-form/Account";
import AdvancedSettings from "@/components/forms/settings-form/Advanced";
import Accounts2 from "@/components/forms/settings-form/OtherOptionsAcc";
import PasswordSettings from "@/components/forms/settings-form/PassSettings";
import { settingPages } from "@/constants/constantData";
import { serializeObject } from "@/constants/functions";
import connectDB from "@/lib/connectDb";
import User from "@/model/CredentialsUser";
import { getSession } from "next-auth/react";
import Head from "next/head"; import Image from "next/image";
import { useState } from "react";

export default function SettingsPage({user}){
     const [mode, setMode] = useState('account');
     const [accPage, setAccPage] = useState(1)
     const getSettings = () => {
          switch(mode){
               case 'account': return <>
               {accPage===1 ? <Accounts1 user={user}/> : <Accounts2 user={user}/>}
               </>
               case 'password': return <PasswordSettings/>
               case 'advanced': return <AdvancedSettings/>
               default: return <h2>Other Settings Page Comming Soon</h2>
          }
     }
     return <>
     <Head>
          <title>Settings | EduArticles</title>
     </Head>
     <Layout>
          <h1 className="pageTitle">Settings</h1>
          <div className="settings-container">
               <div className="settings-menu">
                    {user && <>
                         <Image src={user.image} alt="pfp" width={175} height={175}/>
                         <h2>{user?.name}</h2>
                    </>}
                    <ul>
                         {settingPages.map((page,i)=><li key={i} onClick={()=>setMode(page.name)} className={mode===page.name ? 'active' : ''}>{page.title}</li>)}
                    </ul>
               </div>
               <div className="settings-content">
                    <h2>Account Settings</h2>
                    <form className="preview">
                         {getSettings()}
                         <div className="frmBtns">
                              <button className="btn submit">Update</button>
                              {mode==='account' && <>
                                   <button type="button" className="btn">Clear All Tags</button>
                                   {accPage===1 ? <button type="button" className="btn" onClick={()=>setAccPage(2)}>Other Settings</button> : <button type="button" className="btn" onClick={()=>setAccPage(1)}>Back</button>}
                              </>}
                              <button className="btn">Cancel</button>
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