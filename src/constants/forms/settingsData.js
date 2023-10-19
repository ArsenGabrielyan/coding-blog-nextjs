export function getInitialSettingData(user){
     const {name,email,username,otherData,image} = user;
     const {website,tags,bio} = otherData
     return {
          name,email,username,website,bio,keywords:tags,image,
          phone: user?.phone || user?.otherData.phone,
          bdate: user?.bdate || user?.otherData.bdate,
          gender: user?.gender || user?.otherData.gender,
          address: user?.address || user?.otherData.address
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
     followerW: false,
     featured: true,
     language:'en',
     clockFormat: 'hr24',
}