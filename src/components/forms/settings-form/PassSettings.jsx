export default function PasswordSettings(){
     return <>
     <div className="frmGroup">
          <label htmlFor="oldPass">Old Password</label>
          <input type="password" name="oldPass" id="oldPass"/>
     </div>
     <div className="frmRow">
          <div className="frmGroup">
               <label htmlFor="newPass">New Password</label>
               <input type="password" name="newPass" id="newPass"/>
          </div>
          <div className="frmGroup">
               <label htmlFor="cPass">Website</label>
               <input type="password" name="cPass" id="cPass"/>
          </div>
     </div>
     </>
}