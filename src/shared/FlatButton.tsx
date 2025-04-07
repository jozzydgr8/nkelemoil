
type typebutton ={
    title:string,
    onClick:()=>void
}
function FlatButton({title, onClick}:typebutton) {
  return (
    <button className="btn btn-success" onClick={onClick}>{title}</button>
  )
}

export default FlatButton
