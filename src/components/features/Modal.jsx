import { MdClose } from "react-icons/md";

export default function Modal({title='',open, customCloseText="Close" ,children}){
     const {isOpen,setIsOpen} = open;
     return isOpen ? <div className="modal-container">
          <div className="modal">
               {title!=='' && <div className="modal-header">
                    <h2>{title}</h2>
                    <button type="button" className="btn-icon" onClick={()=>setIsOpen(false)} title="Close"><MdClose/></button>
               </div>}
               <div className="modal-content">
                    {children}
                    {title==='' && <button type="button" className="modal-close" title={customCloseText || "Close"} onClick={()=>setIsOpen(false)}>{customCloseText || 'Close'}</button>}
               </div>
          </div>
     </div> : null;
}