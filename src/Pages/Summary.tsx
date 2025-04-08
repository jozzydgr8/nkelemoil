import { checkoutvalues } from "../shared/Types"
type summaryprops ={
    data:checkoutvalues
}
export const Summary = ({data }:summaryprops)=>{
    return(
        <div>
            <h1>Summary</h1>
            <div>
                <p>{data.name}</p>
                <p>{data.email}</p>
                <p>{data.phone}</p>

            </div>

        </div>
    )
}