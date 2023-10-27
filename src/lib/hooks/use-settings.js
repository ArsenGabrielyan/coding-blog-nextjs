import Accounts1 from "@/components/forms/settings-form/Account";
import AdvancedSettings from "@/components/forms/settings-form/Advanced";
import Accounts2 from "@/components/forms/settings-form/OtherOptionsAcc";
import PasswordSettings from "@/components/forms/settings-form/PassSettings";
import { getInitialSettingData, INITIAL_SETTINGS, INITIAL_USER_DATA, PASS_SETTINGS } from "@/constants/forms/settingsData";
import { useState } from "react";
import useTags from "./use-tags";
import { toast } from "react-toastify";
import axios from "axios";
import { REQ_CONFIG } from "@/constants/forms/formData";

export default function useSettings(user,mode,accPage){
     const currSetting = getInitialSettingData(user)
     const initialAccSettings = currSetting||INITIAL_USER_DATA;
     const initialPasswordSetting = user?.details.settings || PASS_SETTINGS;
     const initialSettings = INITIAL_SETTINGS;

     const [accSettings, setAccSettings] = useState(initialAccSettings);const [passSettings, setPassSettings] = useState(initialPasswordSetting);
     const [settings, setSettings] = useState(initialSettings);

     const tagOptions = useTags(setAccSettings,accSettings);
     const isCurrSetting = JSON.stringify({...accSettings,...passSettings,...settings})===JSON.stringify({...initialAccSettings,...initialPasswordSetting,...initialSettings});
     
     const changeAccSetting = e => setAccSettings({...accSettings,[e.target.name]:e.target.value})
     const changeSetting = (e,type='input') => setSettings({...settings,[e.target.name]:type==='input' ? e.target.value : e.target.checked});
     const changeBio = val => setAccSettings({...accSettings,bio: val});
     const changePass = e => setPassSettings({...passSettings,[e.target.name]: e.target.value});
     const getSettings = () => {
          switch(mode){
               case 'account': return <>
               {accPage==='basic' ? <Accounts1 user={accSettings} changeAccSetting={changeAccSetting} changeBio={changeBio} tagOptions={tagOptions}/> : <Accounts2 user={accSettings} changeAccSetting={changeAccSetting}/>}
               </>
               case 'password': return <PasswordSettings settings={passSettings} changeSetting={changePass}/>
               case 'advanced': return <AdvancedSettings settings={settings} changeSetting={changeSetting}/>
               default: return <h2>Other Settings Page Comming Soon</h2>
          }
     }
     const resetSettings = () => {
          setAccSettings(initialAccSettings);
          setPassSettings(initialPasswordSetting);
          setSettings(initialSettings)
     }
     const updateSettings = async e => {
          e.preventDefault();
          const res = await toast.promise(
               axios.put('/api/users',{accSettings, settings},REQ_CONFIG),
               {
                    pending: 'Updating...',
                    success: 'Settings updated successfully.',
                    error: 'Settings update failed. Please try again later.'
               }
          );
          if(res.status===200){
               console.log(res.data);
          }
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