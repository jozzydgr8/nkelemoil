import { Steps } from "antd"
import { useState } from "react"
import Checkout from "../Checkout"
import { checkoutvalues } from "../../shared/Types"
import { Summary } from "../Summary"

export const CheckoutSteps = ()=>{
    const {Step} = Steps 
    const [current, setCurrent] = useState(1);
    //state from checkout
    const [checkoutdetails, setCheckoutdetails] = useState<checkoutvalues>({} as checkoutvalues);

    const handleCheckOut = (values:checkoutvalues)=>{
        setCheckoutdetails(values);
        setCurrent(1);
    }

    const Forms =[
        <Checkout handleCheckOut={handleCheckOut}/>,
        <Summary data={checkoutdetails}/>
    ]

    return(
        <section>
            <div className="container-fluid">
                <Steps onChange={setCurrent} current={current}>
                    <Step title='checkout'/>
                    <Step title='summary' />
                    <Step title='payment'/>

                    
                </Steps>
                {
                    Forms[current]
                }
            </div>
        </section>
    )
}