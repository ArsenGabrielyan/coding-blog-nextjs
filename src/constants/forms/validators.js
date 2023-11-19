import { dateReg, emailReg, passReg, phoneReg } from "./regexp";

export const validateSignup = (data, setError, type) => {
     const {name,email,phone,bdate,gender,address,password,confirmPass} = data;
     const d = new Date(), selectedD = new Date(bdate); let errTxt = '';
     const age = d.getFullYear() - selectedD.getFullYear();
     switch(true){
          case (!name || name.length <= 2): errTxt ='Full name is Too Short'; break;
          case (!email || !emailReg.test(email)): errTxt ='The Email Format is Invalid'; break;
          case (!phoneReg.test(phone)): errTxt ='The Phone Format is Invalid'; break;
          case (!dateReg.test(bdate) || age < 18): errTxt ='You Should Be Over 18'; break;
          case (!gender): errTxt ='You Should Choose Either Male or Female'; break;
          case (address.length<=1): errTxt ='The Address Field is Too Short'; break;
          case (!password || !passReg.test(password)): errTxt ='Password is Too Weak'; break;
          case (!confirmPass || password!==confirmPass): errTxt ="These Passwords Doesn't Match"; break;
          default: errTxt ='';
     }
     setError(errTxt)
     switch(type){
          case "pg1": return [
               !(!name || name.length <= 2),
               !(!email || !emailReg.test(email)),
               !(!phoneReg.test(phone))
          ].every(val=>val);
          case "pg2": return [
               !(!dateReg.test(bdate) || age < 18),
               !(!gender), !(address.length<=1)
          ].every(val=>val);
          case "pg3": return [
               !(!password || !passReg.test(password)),
               !(!confirmPass || password!==confirmPass)
          ].every(val=>val);
     }
}
export const validatePost = (postData, setError) => {
     let errTxt = ''; const {banner,thumbnail,title,content,keywords,category} = postData;
     const bannerSize = banner ? (banner.size/1024/1024).toFixed(2) : 0;
     const thumbSize = thumbnail ? (thumbnail.size/1024/1024).toFixed(2) : 0;
     switch(true){
          case !banner: errTxt = 'It is Required to Upload Banner'; break;
          case !thumbnail: errTxt = 'It is Required to Upload Thumbnail'; break;
          case bannerSize >= 4 || thumbSize >= 4: errTxt = "That File is Too Large, Select a File less than 4mb"; break;
          case !title || title.trim()==='': errTxt = 'Title Field is Required'; break;
          case title.length<12: errTxt = 'Title Should Not Be Less than 12 Characters'; break;
          case !content || content.trim()==='': errTxt = 'Description Field is Required'; break;
          case content.length<21: errTxt = 'Description Should Not Be Less than 21 Characters'; break;
          case !keywords.length: errTxt = "It is Required to Add some Keywords"; break;
          case !category: errTxt = "Select Category For Your Post"; break;
          default: errTxt = ''
     }
     setError(errTxt);
     return errTxt==='';
}