import FormWrapper from "../FormWrapper";

export default function FinalForm({username='',password='',confirmPass='', updateFields}){
     return <FormWrapper title="Account Creation Info">
     <div className="frmGroup">
          <label htmlFor="username">Username</label>
          <input type="text" id='username' name="username" placeholder="Don't Type Your Full Name as a Username" value={username} onChange={e=>updateFields({username: e.target.value})}/>
     </div>
     <div className="frmGroup">
          <label htmlFor="password">Password</label>
          <input type="password" id='password' name="password" value={password} onChange={e=>updateFields({password: e.target.value})}/>
     </div>
     <div className="frmGroup">
          <label htmlFor="cPass">Confirm Password</label>
          <input type="password" id='cPass' name="cPass" value={confirmPass} onChange={e=>updateFields({confirmPass: e.target.value})}/>
     </div>
     </FormWrapper>
}