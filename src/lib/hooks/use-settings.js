import AccBasic from "@/components/forms/settings-form/AccBasic";
import AdvancedSettings from "@/components/forms/settings-form/AppSettings";
import AccAdvanced from "@/components/forms/settings-form/AccAdvanced";
import { getInitialSettingData, INITIAL_SETTINGS, INITIAL_USER_DATA } from "@/constants/forms/settingsData";
import { useState } from "react"; import useTags from "./tools/use-tags";
import { toast } from "react-toastify"; import { appStorage } from "../firebase";
import axios from "axios"; import { REQ_CONFIG } from "@/constants/forms/formData";
import useSWR from "swr"; import { fetcher } from "@/constants/helpers";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function useSettings(user,mode,accPage){
     const {data: users} = useSWR('/api/users',fetcher)
     const currSetting = getInitialSettingData(user)
     const initialAccSettings = user ? currSetting : INITIAL_USER_DATA;
     const initialSettings = user ? user?.details.settings : INITIAL_SETTINGS;
     const [accSettings, setAccSettings] = useState(initialAccSettings);
     const [settings, setSettings] = useState(initialSettings);
     const tagOptions = useTags(setAccSettings,accSettings);
     const isCurrSetting = JSON.stringify({...accSettings,settings})===JSON.stringify({...initialAccSettings,settings:initialSettings});
     const stats = {
          followers: users?.filter(val=>val.details.followingUsers.includes(user?.user_id)).length,
          following: user?.details.followingUsers.length,
          likes: user?.details.likedPosts.length,
          saves: user?.details.savedPosts.length
     }
     const changeAccSetting = e => setAccSettings({...accSettings,[e.target.name]:e.target.value});
     const changeSetting = (e,type='input') => setSettings({...settings,[e.target.name]:type==='input' ? e.target.value : e.target.checked});
     const changeBio = val => setAccSettings({...accSettings,bio: val});
     const changePfp = async e => {
          if(e.target.files[0]) if(confirm('Are You Sure To Change Profile Picture?')){
               const pfpRef = ref(appStorage,`users/user-${user?.user_id}`);
               await uploadBytes(pfpRef,e.target.files[0]);
               setAccSettings({...accSettings,image: await getDownloadURL(pfpRef)});
          }
     }
     const getSettings = () => {
          switch(mode){
               case 'account': return <>
               {accPage==='basic' ? <AccBasic user={accSettings} changeAccSetting={changeAccSetting} changeBio={changeBio} tagOptions={tagOptions}/> : <AccAdvanced user={accSettings} changeAccSetting={changeAccSetting} stats={stats} changePfp={changePfp} id={user?.user_id}/>}
               </>
               default: return <AdvancedSettings settings={settings} changeSetting={changeSetting}/>
          }
     }
     const resetSettings = () => {
          setAccSettings(initialAccSettings);
          setSettings(initialSettings)
     }
     const updateSettings = async e => {
          e.preventDefault();
          await toast.promise(axios.put('/api/users',{accSettings, settings},REQ_CONFIG),{
               pending: 'Updating...',
               success: 'Settings updated successfully. Please Make sure to Refresh to take effect.',
               error: 'Settings update failed. Please try again later.'
          });
     }
     return {
          accSettings,
          tagOptions,
          getSettings,
          isCurrSetting,
          resetSettings,
          updateSettings
     }
}