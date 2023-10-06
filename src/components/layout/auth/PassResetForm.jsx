export default function PassResetForm(){
     // Not Finished
     return <form>
          <h1>Reset Password</h1>
          <div className="frmGroup">
               <label htmlFor="email">Email Address</label>
               <input type="email" id='email' name="email" placeholder="name@example.com"/>
          </div>
          <div className="frmGroup">
               <label htmlFor="password">New Password</label>
               <input type="password" id="password" name="pass"/>
          </div>
          <div className="frmGroup">
               <label htmlFor="cPassword">Confirm New Password</label>
               <input type="password" id="cPassword" name="cPass"/>
          </div>
          <button type="submit" className="frmBtn signInBtn">Reset Password</button>
     </form>
}