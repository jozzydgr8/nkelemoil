import { Steps } from "antd"
import { useState } from "react"
import Checkout from "../Checkout"
import { checkoutvalues } from "../../shared/Types"
import { Summary } from "../Summary"
import { Payment } from "../Payment"

export const CheckoutSteps = ()=>{
    const {Step} = Steps 
    const [current, setCurrent] = useState(0);
    //state from checkout
    const [checkoutdetails, setCheckoutdetails] = useState<checkoutvalues>({} as checkoutvalues);
    const [sumapproved, setSumapproved] = useState(false);

    const handleCheckOut = (values:checkoutvalues)=>{
        setCheckoutdetails(values);
        setCurrent(1);
    }

    const handleSummary = (values:boolean)=>{
        setSumapproved(values);
        setCurrent(2);
    }

    const isStepDisabled = (stepNumber: number) => {
        if (stepNumber === 0) return false;
        if (stepNumber === 1) return Object.keys(checkoutdetails).length === 0;
        if (stepNumber === 2) return Object.keys(checkoutdetails).length === 0 || !sumapproved;
        return true;
      };
      const handleStepChange = (step: number) => {
        if (!isStepDisabled(step)) {
          setCurrent(step);
        }
      };

    const Forms =[
        <Checkout handleCheckOut={handleCheckOut}/>,
        <Summary data={checkoutdetails} handleSummary={handleSummary}/>,
        <Payment data={checkoutdetails}/>

    ]

    return(
        <section >
            <div className="container-fluid">
                <Steps onChange={handleStepChange} current={current}>
                    <Step title='checkout' disabled={isStepDisabled(0)}/>
                    <Step title='summary' disabled={isStepDisabled(1)} />
                    <Step title='payment'/>

                    
                </Steps>
                {
                    Forms[current]
                }
            </div>
        </section>
    )
}