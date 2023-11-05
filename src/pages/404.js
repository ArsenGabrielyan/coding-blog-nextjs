import ErrPage from "@/components/pageLayouts/ErrPage";
import Head from "next/head";

export default function NotFoundErr(){
     return <>
     <Head><title>Oops! Page Not Found</title></Head>
     <ErrPage>
          <div className="heading">
               <h1>Oops! Page Not Found.</h1>
               <h2>404</h2>
          </div>
          <p>Sorry, But This is not the webpage you&apos;re looking for. Go Back to The Homepage Please</p>
     </ErrPage>
     </>
}