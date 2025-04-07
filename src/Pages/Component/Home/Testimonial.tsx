import { testimonials } from "../../../data";

export function Testimonial() {
  return (
    <>
      <div style={{textAlign:'center', marginTop:'20px'}}>
      <h3 >Testimonials</h3>
      <small >Hear what others have to say about us</small>
      </div>

      <div
        id="carouselExampleFade"
        className="carousel slide "
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {testimonials.map((data, index) => (
            <div
              key={data.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className="text-center p-4">
                <p className="fs-5 fst-italic">"{data.text}"</p>
                <p className="fw-bold mb-1">{data.name}</p>
                <div className="google-stars text-warning fs-4">
                  {data.ratings}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
         
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}
