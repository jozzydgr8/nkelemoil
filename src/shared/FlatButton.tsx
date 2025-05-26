
type typebutton ={
    title:string,
    onClick:()=>void,
    disable?:boolean,
    className?:string,
}
function FlatButton({title, onClick, disable, className}:typebutton) {
  return (
    <button className={`btn ${className}`} onClick={onClick} disabled={disable}>{title}</button>
  )
}

export default FlatButton
