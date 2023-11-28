import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const DoctorRegistrationMessage = () => {
  return (
    <div className="page-section pb-0">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 py-3 wow fadeInUp">
            <h1>Allocate Doctors</h1>
            <p className="text-grey mb-4">
            Allocate new Doctors with some additional Resource allocation 
            </p>
            <Link to="/register-doctors" className="btn btn-primary">
             Register
            </Link>
          </div>
          <div className="col-lg-6 wow fadeInRight" data-wow-delay="400ms">
            <div className="img-place custom-img-1">
              <img
                src="https://emedia1.nhs.wales/HEIW2/cache/file/B0B0B290-28BC-415C-98F02B5070E09EFE_carouselimage.jpeg"
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

export default DoctorRegistrationMessage;
