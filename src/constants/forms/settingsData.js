export function getInitialSettingData(user){
     const {name,email,username,otherData,image} = user;
     const {website,keywords,bio,phone,bdate,gender,address} = otherData
     return {
          name,email,username,website,bio,keywords,
          image,phone,bdate,gender,address
     }
}
export const PASS_SETTINGS = {
     oldPass: '',
     newPass: '',
     confPass:''
}
export const INITIAL_USER_DATA = {
     name:'',email:'',username:'',
     website:'',bio:'',
     image:'',phone:'',
     bdate:'',gender:'',
     address:'',keywords:[],
}
export const INITIAL_SETTINGS = {
     darkmode: false,
     clock: true,
     categories: true,
     recent: true,
     followers: false,
     following: false,
     featured: true,
     language:'en',
     clockFormat: 'hr24',
}