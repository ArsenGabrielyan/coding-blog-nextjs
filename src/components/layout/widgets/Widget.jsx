export default function Widget({title='',children}){
     return <div className="widget">
          {title && <h3>{title}</h3>}
          {children}
     </div>
}