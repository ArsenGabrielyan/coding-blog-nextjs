export default function AdvancedSettings({settings, changeSetting}){
     const {clock,categories,recent,featured,clockFormat,address} = settings;
     return <>
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
          <p className="checkLabel">Show Featured Posts</p>
          <input type="checkbox" name="featured" id="featured" checked={featured} onChange={e=>changeSetting(e,'checkbox')}/>
          <label className="switch" htmlFor="featured"></label>
     </div>
     <div className="frmGroup checkbox">
          <p className="checkLabel">Show Address</p>
          <input type="checkbox" name="address" id="address" checked={address} onChange={e=>changeSetting(e,'checkbox')}/>
          <label className="switch" htmlFor="address"></label>
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