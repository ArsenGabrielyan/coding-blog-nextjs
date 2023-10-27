export default function DashboardElem({title='',children}){
     return <div className="dashboard-element">
          <h2 className="title">{title}</h2>
          {children}
     </div>
}