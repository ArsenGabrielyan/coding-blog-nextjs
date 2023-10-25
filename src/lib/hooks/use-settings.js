import Accounts1 from "@/components/forms/settings-form/Account";
import AdvancedSettings from "@/components/forms/settings-form/Advanced";
import Accounts2 from "@/components/forms/settings-form/OtherOptionsAcc";
import PasswordSettings from "@/components/forms/settings-form/PassSettings";
import { getInitialSettingData, INITIAL_SETTINGS, INITIAL_USER_DATA, PASS_SETTINGS } from "@/constants/forms/settingsData";
import { useState } from "react";
import useTags from "./use-tags";

export default function useSettings(user,mode,accPage){
     const currSetting = getInitialSettingData(user)
     const [accSettings, setAccSettings] = useState(currSetting||INITIAL_USER_DATA);
     const [settings, setSettings] = useState(INITIAL_SETTINGS);
     const [passSettings, setPassSettings] = useState(PASS_SETTINGS);
     const tagOptions = useTags(setAccSettings,accSettings);
     const isCurrSetting = JSON.stringify({...accSettings,...passSettings,...settings})===JSON.stringify({...(currSetting||INITIAL_USER_DATA),...PASS_SETTINGS,...INITIAL_SETTINGS});
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
          setAccSettings(currSetting||INITIAL_USER_DATA);
          setPassSettings(PASS_SETTINGS);
          setSettings(INITIAL_SETTINGS)
     }
     const updateSettings = e => {
          e.preventDefault();
          console.log(accSettings)
          console.log(passSettings)
          console.log(settings)
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