import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdContrast, MdDarkMode, MdLightMode } from "react-icons/md";

export default function AdvancedSettings({settings, changeSetting}){
     const {clock,categories,recent,featured,clockFormat,address} = settings;
     const {setTheme,theme} = useTheme()
     const [mode, setMode] = useState('');
     useEffect(()=>{
          if(theme) setMode(theme);
          return () => setMode('');
     },[theme])
     return <>
     <div className="frmGroup checkbox">
          <p className="checkLabel">Clock</p>
          <input type="checkbox" name="clock" id="clock" checked={clock} onChange={e=>changeSetting(e,'checkbox')}/>
          <label className="switch" htmlFor="clock"></label>
     </div>
     <div className="frmGroup checkbox">
          <p className="checkLabel">Categories</p>
          <input type="checkbox" name="categories" id="categories" checked={categories} onChange={e=>changeSetting(e,'checkbox')}/>
          <label className="switch" htmlFor="categories"></label>
     </div>
     <div className="frmGroup checkbox">
          <p className="checkLabel">Recent Posts</p>
          <input type="checkbox" name="recent" id="recent" checked={recent} onChange={e=>changeSetting(e,'checkbox')}/>
          <label className="switch" htmlFor="recent"></label>
     </div>
     <div className="frmGroup checkbox">
          <p className="checkLabel">Featured Posts</p>
          <input type="checkbox" name="featured" id="featured" checked={featured} onChange={e=>changeSetting(e,'checkbox')}/>
          <label className="switch" htmlFor="featured"></label>
     </div>
     <div className="frmGroup checkbox">
          <p className="checkLabel">Location</p>
          <input type="checkbox" name="address" id="address" checked={address} onChange={e=>changeSetting(e,'checkbox')}/>
          <label className="switch" htmlFor="address"></label>
     </div>
     <div className="frmGroup  multi-choose">
          <p className="checkLabel">Theme</p>
          <div className="mc-options">
               <button className={mode==='light'?'active':''} type="button" onClick={()=>setTheme('light')}><MdLightMode/></button>
               <button className={mode==='dark'?'active':''} type="button" onClick={()=>setTheme('dark')}><MdDarkMode/></button>
               <button className={mode==='system'?'active':''} type="button" onClick={()=>setTheme('system')}><MdContrast/></button>
          </div>
     </div>
     <div className="frmGroup">
          <label htmlFor="clockFormat">Clock Format</label>
          <select name="clockFormat" id="clockFormat" value={clockFormat} onChange={e=>changeSetting(e,'input')}>
               <option value='hr12'>12 Hour Format</option>
               <option value='hr24'>24 Hour Format</option>
          </select>
     </div>
     <button type="button" className="btn red mt">Delete The Account</button>
     </>
}