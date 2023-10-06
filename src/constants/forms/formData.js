import PersonalDataForm from "@/components/signup-forms/BasicData"
import BDateForm from "@/components/signup-forms/BirthDate"
import FinalForm from "@/components/signup-forms/FinalForm";

export const INITIAL_SETTINGS = {
     displayName:'',
     website: '',
     bio: '',
     tags: [],
     otherLinks:{},     
}
export const LOGIN_INITIAL = {
     email: '',
     pass: ''
}
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
export const REQ_CONFIG = {
     headers: {"Content-Type": "application/json"}
}
export const INITIAL_POSTDATA = {
     title: '',content: '',
     thumbnail: {
          file: '',
          preview: '',
          size:0
     },
     banner: {
          file: '',
          preview: '',
          size:0
     },
     keywords: [],
     email: '',
     category: '',
     author: '',
     profileImage: '',
     date: new Date().toDateString(),
     post_id: ''
}
export const GET_INITIAL_MULTISTEP_DATA = (data, updateFields) =>[
<PersonalDataForm {...data} updateFields={updateFields} key={1}/>,
<BDateForm {...data} updateFields={updateFields} key={2}/>,
<FinalForm {...data} updateFields={updateFields} key={3}/>]