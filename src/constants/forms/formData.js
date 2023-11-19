import PersonalDataForm from "@/components/forms/signup-forms/BasicData"
import BDateForm from "@/components/forms/signup-forms/BirthDate"
import FinalForm from "@/components/forms/signup-forms/FinalForm";

export const INITIAL_MISC_DATA = { website: '', bio: '',keywords: [] }
export const FORGOT_PASS_INITIAL = { newPass: '', cNewPass: '' }
export const LOGIN_INITIAL = { email: '' , pass: '' }
export const REGISTER_INITIAL = {
     name: '',
     email: '', 
     phone: '',
     bdate: '', 
     gender: '',
     address: '',
     username: '', 
     password: '', 
     confirmPass: '',
}
export const REQ_CONFIG = { headers: {"Content-Type": "application/json"} }
export const INITIAL_POSTDATA = { title: '',content: '',post_id: '', thumbnail: '', banner: '', profileImage: '', keywords: [], email: '',category: '',author: '',date: new Date().toDateString() }
export const GET_INITIAL_MULTISTEP_DATA = (data, updateFields) => [
<PersonalDataForm {...data} updateFields={updateFields} key={1}/>,
<BDateForm {...data} updateFields={updateFields} key={2}/>,
<FinalForm {...data} updateFields={updateFields} key={3}/> ]