import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const AllocateMedicine = () => {
  return (
    <div className="page-section pb-0">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 py-3 wow fadeInUp">
            <h1>Adjust Medicine</h1>
            <p className="text-grey mb-4">
           Allocate Any New Medicine Here...
            </p>
            <Link to="/allocate-medicine" className="btn btn-primary">
            Allocate
            </Link>
          </div>
          <div className="col-lg-6 wow fadeInRight" data-wow-delay="400ms">
            <div className="img-place custom-img-1">
              <img
                src="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
                alt=""
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocateMedicine;
