import FormWrapper from "../FormWrapper";

export default function PersonalDataForm({name='',email='', phone='', updateFields}){
     return <FormWrapper title='User Details'>
     <div className="frmGroup">
          <label htmlFor="name">Account Name</label>
          <input type="text" id='name' name="name" placeholder="e.g. John Doe" value={name} onChange={e=>updateFields({name: e.target.value})}/>
     </div>
     <div className="frmGroup">
          <label htmlFor="email">Email Address</label>
          <input type="email" id='email' name="email" placeholder="e.g. name@example.com" value={email} onChange={e=>updateFields({email: e.target.value})}/>
     </div>
     <div className="frmGroup">
          <label htmlFor="phone">Phone Number</label>
          <input type="text" id='phone' name="phone" placeholder="e.g. 012-345-678" value={phone} onChange={e=>updateFields({phone: e.target.value})}/>
     </div>
     </FormWrapper>
}