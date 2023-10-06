import Head from "next/head";
import {SessionProvider} from "next-auth/react";
import "@/styles/globals.scss"
import "react-multi-carousel/lib/styles.css";
import "@uiw/react-markdown-editor/markdown-editor.css";

export default function App({Component, pageProps}){
     return <>
     <Head>
          <link rel="shortcut icon" href="/favicon.ico"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Edu-Articles | Educational Blog</title>
     </Head>
     <SessionProvider session={pageProps.session}>
          <Component {...pageProps}/>
     </SessionProvider>
     </>
}