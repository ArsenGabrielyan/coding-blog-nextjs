import { dateReg, emailReg, passReg, phoneReg } from "./regexp";

export const validateSignup = (data, setError, type) => {
     const d = new Date(), selectedD = new Date(data.bdate);
     const age = d.getFullYear() - selectedD.getFullYear(); let errTxt = '';
     switch(true){
          case (!data.name || data.name.length <= 2): errTxt ='Full name is Too Short'; break;
          case (!data.email || !emailReg.test(data.email)): errTxt ='The Email Format is Invalid'; break;
          case (!phoneReg.test(data.phone)): errTxt ='The Phone Format is Invalid'; break;
          case (!dateReg.test(data.bdate) || age < 18): errTxt ='You Should Be Over 18'; break;
          case (!data.gender): errTxt ='You Should Choose Either Male or Female'; break;
          case (data.address.length<=1): errTxt ='The Address Field is Too Short'; break;
          case (!data.password || !passReg.test(data.password)): errTxt ='Password is Too Weak'; break;
          case (!data.confirmPass || data.password!==data.confirmPass): errTxt ="These Passwords Doesn't Match"; break;
          default: errTxt ='';
     }
     setError(errTxt)
     switch(type){
          case "pg1": return [
               !(!data.name || data.name.length <= 2),
               !(!data.email || !emailReg.test(data.email)),
               !(!phoneReg.test(data.phone))
          ].every(val=>val);
          case "pg2": return [
               !(!dateReg.test(data.bdate) || age < 18),
               !(!data.gender),
               !(data.address.length<=1)
          ].every(val=>val);
          case "pg3": return [
               !(!data.password || !passReg.test(data.password)),
               !(!data.confirmPass || data.password!==data.confirmPass)
          ].every(val=>val);
     }
}
export const validatePost = (postData, setError) => {
     let errTxt = '';
     switch(true){
          case postData.banner.file==='' || postData.thumbnail.file==='': errTxt = 'It is Required to Upload Banner or Thumbnail'; break;
          case postData.banner.size >= 3 || postData.thumbnail.size >= 3: errTxt = "That File is Too Large, Select a File less than 3mb"; break;
          case !postData.title || postData.title.trim()==='': errTxt = 'Title Field is Required'; break;
          case postData.title.length<20: errTxt = 'Title Should Not Be Less than 20 Characters'; break;
          case !postData.content || postData.content.trim()==='': errTxt = 'Description Field is Required'; break;
          case postData.content.length<30: errTxt = 'Description Should Not Be Less than 30 Characters'; break;
          case !postData.keywords.length: errTxt = "It is Required to Add some Keywords"; break;
          case !postData.category: errTxt = "Select Category For Your Post"; break;
          default: errTxt = ''
     }
     setError(errTxt);
     return errTxt==='';
}