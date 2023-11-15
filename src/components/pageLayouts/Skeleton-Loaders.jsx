const Shimmer = () => <div className="shimmer-wrapper"><div className="shimmer"/></div>

const Item = () => <div className="item">
     <SkeletonElement type="pfp smaller"/>
      <div className="text">
          <SkeletonElement type="text"/>
          <SkeletonElement type="text"/>
     </div>
</div>

export const SkeletonElement = ({type=''}) => <div className={`skeleton ${type}`}/>

export const SkeletonSearch = ({type=''}) => <div className="skeleton-wrapper search">
     <div className="skeleton-search">
          {type!=='pfp' ? <SkeletonElement type="square thumb"/> : <SkeletonElement type="pfp"/>}
          <div className="details">
               <SkeletonElement type="title"/>
               <SkeletonElement type="text"/>
               <SkeletonElement type="text"/>
          </div>
     </div>
     <Shimmer/>
</div>
export const SkeletonSinglePost = () => <div className="skeleton-single-post">
     <div className="skeleton-wrapper single-post">
          <SkeletonElement type="post-header"/>
          <SkeletonElement type="title h1"/>
          <SkeletonElement type="text"/>
          <div className="details">
               <div className="user">
                    <SkeletonElement type="pfp smaller"/>
                    <SkeletonElement type="text short"/>
               </div>
               <SkeletonElement type="text"/>
          </div>
          <SkeletonElement type="text"/>
          <SkeletonElement type="text"/>
          <SkeletonElement type="text"/>
          <SkeletonElement type="text"/>
          <SkeletonElement type="text"/>
          <SkeletonElement type="text"/>
          <SkeletonElement type="text"/>
          <Shimmer/>
     </div>
</div>
export const SkeletonPost = () => <div className="skeleton-wrapper post-card">
     <SkeletonElement type="post-thumb"/>
     <SkeletonElement type="title full"/>
     <div className="details">
          <div>
               <SkeletonElement type="text"/>
               <SkeletonElement type="text"/>
          </div>
          <div>
               <SkeletonElement type="text"/>
               <SkeletonElement type="text"/>
          </div>
     </div>
     <SkeletonElement type="text"/>
     <Shimmer/>
</div>
export const SkeletonUser = () => <div className="skeleton-wrapper user-card">
     <SkeletonElement type="pfp big"/>
     <SkeletonElement type="title full"/>
     <SkeletonElement type="text"/>
     <div className="details">
          <SkeletonElement type="text"/>
          <SkeletonElement type="text"/>
     </div>
     <Shimmer/>
</div>
export const SkeletonStatBox = () => <div className="skeleton-wrapper statbox shadow">
     <SkeletonElement type="title full"/>
     <SkeletonElement type="text"/>
     <Shimmer/>
</div>
export const SkeletonDashboard = () => <div className="skeleton-wrapper shadow">
     <SkeletonElement type="title"/>
     <Item/><Item/><Item/>
     <Shimmer/>
</div>
export const SkeletonComment = () => <div className="skeleton-wrapper comment">
     <SkeletonElement type="pfp small"/>
     <div className="details">
          <SkeletonElement type="text"/>
          <SkeletonElement type="text"/>
          <SkeletonElement type="text"/>
     </div>
     <Shimmer/>
</div>