import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const AllocateResource = () => {
  return (
    <div className="page-section pb-0">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 py-3 wow fadeInUp">
            <h1>Allocate Resources</h1>
            <p className="text-grey mb-4">
           Allocate Room and Equipments For Doctors
            </p>
            <Link to="/allocate-resource" className="btn btn-primary">
            Allocate
            </Link>
          </div>
          <div className="col-lg-6 wow fadeInRight" data-wow-delay="400ms">
            <div className="img-place custom-img-1">
              <img
                src="https://i.pinimg.com/736x/c0/29/33/c0293339a5faa5407f1e426ae7ef30a6.jpg"
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

export default AllocateResource;
