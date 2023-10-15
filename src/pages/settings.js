import Layout from "@/components/Layout";
import Head from "next/head";

export default function SettingsPage(){
     return <>
     <Head>
          <title>Settings | EduArticles</title>
     </Head>
     <Layout>
          <h1 className="pageTitle">Settings</h1>
          Settings, Analytics, Post Manager, Account Settings, Dashboard
     </Layout>
     </>
}