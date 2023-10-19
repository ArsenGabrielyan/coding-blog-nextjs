export default function PasswordSettings({settings, changeSetting}){
     return <>
     <div className="frmGroup">
          <label htmlFor="oldPass">Old Password</label>
          <input type="password" name="oldPass" id="oldPass" value={settings.oldPass} onChange={changeSetting}/>
     </div>
     <div className="frmRow">
          <div className="frmGroup">
               <label htmlFor="newPass">New Password</label>
               <input type="password" name="newPass" id="newPass" value={settings.newPass} onChange={changeSetting}/>
          </div>
          <div className="frmGroup">
               <label htmlFor="cPass">Confirm New Password</label>
               <input type="password" name="confPass" id="cPass" value={settings.confPass} onChange={changeSetting}/>
          </div>
     </div>
     </>
}