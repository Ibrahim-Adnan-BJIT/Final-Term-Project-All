import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const ManageSlots = () => {
  return (
    <div className="page-section pb-0">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 py-3 wow fadeInUp">
            <h1>Schedule Slots</h1>
            <p className="text-grey mb-4">
              Manage Your slots according to you time .....
            </p>
            <Link to="/slot-allocation" className="btn btn-primary">
              Manage
            </Link>
          </div>
          <div className="col-lg-6 wow fadeInRight" data-wow-delay="400ms">
            <div className="img-place custom-img-1">
              <img
                src="https://www.magnatag.com/thumbor/nGTA36Q4dPVnnAhrjmqth7dMgbU=/1170x0/products/HXPA/HXPAcover2500.png"
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

export default ManageSlots;
