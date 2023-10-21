import zxcvbn from "zxcvbn"

export default function PasswordStrength({pass}){
     const result = zxcvbn(pass), score = result.score*100/4;
     const getProps = (type='')=>{
          switch(result.score){
               case 0: return type==='color'?"#828282":'Very weak';
               case 1: return type==='color'?"#dc3545":'Weak';
               case 2: return type==='color'?"#ffad00":'Fair';
               case 3: return type==='color'?'#9bc158':'Good';
               case 4: return type==='color'?'#167051':'Strong';
               default: return type==='color'?'none':'';
          }
     }
     const changeColor = (type='')=>type==='bar' ? {
          width: `${score}%`,
          background: getProps('color')
     } : {color: getProps('color')}
     return <div className="frmProgress">
          <div className="bar" style={changeColor('bar')}></div>
          <div className="label" style={changeColor()}>{getProps()}</div>
     </div>
}