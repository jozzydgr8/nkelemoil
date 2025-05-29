import { Benefit } from "./Component/Home/Benefit"
import { Header } from "./Component/Home/Header"
import { Highlight } from "./Component/Home/Highlight"
import { Product } from "./Component/Home/Product"
import { Testimonial } from "./Component/Home/Testimonial"
import { Footer } from "../shared/Footer"

function HomePage() {
  return (
    <section>
        <Header/>
       
        <div className="container-fluid">
        <Product header="Our Product"/>
        </div>
        <Benefit/>
        <Testimonial/>
        <Highlight/>
        <Footer/>
        
    </section>
  )
}

export default HomePage
