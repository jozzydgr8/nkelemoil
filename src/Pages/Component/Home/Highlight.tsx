import demoimage from '../../../assets/palmkernel_background.jpg'
export const Highlight = ()=>{
    return(
        <section>
            <div className="container-fluid">
                <div style={{backgroundImage:`url(${demoimage})`, backgroundSize:'cover',
                    height:'350px', borderRadius:'10px'}}>

                </div>
            </div>
            
        </section>
    )
}