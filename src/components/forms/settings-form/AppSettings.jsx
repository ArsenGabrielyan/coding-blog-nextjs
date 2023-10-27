export default function AdvancedSettings({settings, changeSetting}){
     const {darkmode,clock,categories,recent,followers,following,featured,language,clockFormat} = settings;
     return <>
     <div className="frmGroup checkbox">
          <p className="checkLabel">Dark Mode</p>
          <input type="checkbox" name="darkmode" id="darkmode" checked={darkmode} onChange={e=>changeSetting(e,'checkbox')}/>
          <label className="switch" htmlFor="darkmode"></label>
     </div>
     <div className="frmGroup checkbox">
          <p className="checkLabel">Show Clock</p>
          <input type="checkbox" name="clock" id="clock" checked={clock} onChange={e=>changeSetting(e,'checkbox')}/>
          <label className="switch" htmlFor="clock"></label>
     </div>
     <div className="frmGroup checkbox">
          <p className="checkLabel">Show Categories</p>
          <input type="checkbox" name="categories" id="categories" checked={categories} onChange={e=>changeSetting(e,'checkbox')}/>
          <label className="switch" htmlFor="categories"></label>
     </div>
     <div className="frmGroup checkbox">
          <p className="checkLabel">Show Recent Posts</p>
          <input type="checkbox" name="recent" id="recent" checked={recent} onChange={e=>changeSetting(e,'checkbox')}/>
          <label className="switch" htmlFor="recent"></label>
     </div>
     <div className="frmGroup checkbox">
          <p className="checkLabel">Show Followers</p>
          <input type="checkbox" name="followers" id="followers" checked={followers} onChange={e=>changeSetting(e,'checkbox')}/>
          <label className="switch" htmlFor="followers"></label>
     </div>
     <div className="frmGroup checkbox">
          <p className="checkLabel">Show Following Users</p>
          <input type="checkbox" name="following" id="following" checked={following} onChange={e=>changeSetting(e,'checkbox')}/>
          <label className="switch" htmlFor="following"></label>
     </div>
     <div className="frmGroup checkbox">
          <p className="checkLabel">Show Featured Posts</p>
          <input type="checkbox" name="featured" id="featured" checked={featured} onChange={e=>changeSetting(e,'checkbox')}/>
          <label className="switch" htmlFor="featured"></label>
     </div>
     <div className="frmRow">
          <div className="frmGroup">
               <label htmlFor="lang">Language</label>
               <select name="language" id="lang" value={language} onChange={e=>changeSetting(e,'input')}>
                    <option value='en'>English</option>
                    <option value='ru'>Русский</option>
                    <option value='hy'>Հայերեն</option>
               </select>
          </div>
          <div className="frmGroup">
               <label htmlFor="clockFormat">Clock Format</label>
               <select name="clockFormat" id="clockFormat" value={clockFormat} onChange={e=>changeSetting(e,'input')}>
                    <option value='hr12'>12 Hour Format</option>
                    <option value='hr24'>24 Hour Format</option>
               </select>
          </div>
     </div>
     <button type="button" className="btn red">Delete The Account</button>
     </>
}