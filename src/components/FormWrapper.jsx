export default function FormWrapper({title='',children}){
     return <>
          <h2 className="form-title">{title}</h2>
          {children}
     </>
}