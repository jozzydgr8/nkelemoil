
type typebutton ={
    title:string,
    onClick:()=>void,
    disable?:boolean
}
function FlatButton({title, onClick, disable}:typebutton) {
  return (
    <button className="btn btn-success" onClick={onClick} disabled={disable}>{title}</button>
  )
}

export default FlatButton
