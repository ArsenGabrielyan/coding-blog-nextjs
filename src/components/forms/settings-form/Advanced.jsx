export default function AdvancedSettings(){
     return <>
     <div className="frmGroup checkbox">
          <p className="checkLabel">Dark Mode</p>
          <input type="checkbox" name="darkmode" id="darkmode"/>
          <label className="switch" htmlFor="darkmode"></label>
     </div>
     <div className="frmGroup checkbox">
          <p className="checkLabel">Show Clock</p>
          <input type="checkbox" name="clock" id="clock"/>
          <label className="switch" htmlFor="clock"></label>
     </div>
     <div className="frmGroup checkbox">
          <p className="checkLabel">Show Categories</p>
          <input type="checkbox" name="category" id="category"/>
          <label className="switch" htmlFor="category"></label>
     </div>
     <div className="frmGroup checkbox">
          <p className="checkLabel">Show Recent Posts</p>
          <input type="checkbox" name="recent" id="recent"/>
          <label className="switch" htmlFor="recent"></label>
     </div>
     <div className="frmGroup checkbox">
          <p className="checkLabel">Show Followers</p>
          <input type="checkbox" name="followers" id="followers"/>
          <label className="switch" htmlFor="followers"></label>
     </div>
     <div className="frmGroup checkbox">
          <p className="checkLabel">Show Following Users</p>
          <input type="checkbox" name="following" id="following"/>
          <label className="switch" htmlFor="following"></label>
     </div>
     <div className="frmGroup checkbox">
          <p className="checkLabel">Show Followers Widget</p>
          <input type="checkbox" name="followerW" id="followerW"/>
          <label className="switch" htmlFor="followerW"></label>
     </div>
     <div className="frmGroup checkbox">
          <p className="checkLabel">Show Featured Posts</p>
          <input type="checkbox" name="featured" id="featured"/>
          <label className="switch" htmlFor="featured"></label>
     </div>
     <div className="frmRow">
          <div className="frmGroup">
               <label htmlFor="lang">Language</label>
               <select name="language" id="lang">
                    <option value='en'>English</option>
                    <option value='ru'>Русский</option>
                    <option value='hy'>Հայերեն</option>
               </select>
          </div>
          <div className="frmGroup">
               <label htmlFor="clockFrm">Clock Format</label>
               <select name="clockFrm" id="clockFrm">
                    <option value='hr12'>12 Hour Format</option>
                    <option value='hr24'>24 Hour Format</option>
               </select>
          </div>
     </div>
     </>
}