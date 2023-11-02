import ErrPage from "@/components/ErrPage";
import Head from "next/head";

export default function ServerErrPage(){
     return <>
     <Head><title>Oh No! Internal Server Error</title></Head>
     <ErrPage>
          <div className="heading">
               <h1>Oh No! Internal Server Error</h1>
               <h2>500</h2>
          </div>
          <p>Sorry for the Inconvenience. Our Team is on the way to Fix This Issue. Please Try Again Later</p>
     </ErrPage>
     </>
}