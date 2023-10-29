export function getInitialSettingData(user){
     const {name,email,username,otherData,image} = user;
     const {website,keywords,bio,phone,bdate,gender,address} = otherData;
     return {
          name,email,username,
          website,bio,keywords,
          image,phone,bdate,gender,address
     }
}
export const INITIAL_USER_DATA = {
     name:'',email:'',username:'',
     website:'',bio:'',
     image:'',phone:'',
     bdate:'',gender:'',
     address:'',keywords:[],
}
export const INITIAL_SETTINGS = {
     clock: true,
     categories: true,
     recent: true,
     featured: true,
     address: false,
     clockFormat: 'hr24',
}