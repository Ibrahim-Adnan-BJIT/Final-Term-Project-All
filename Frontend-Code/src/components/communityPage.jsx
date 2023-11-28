import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const CommunitySection = () => {
  return (
    <div className="page-section pb-0">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 py-3 wow fadeInUp">
            <h1>Visit Our Community</h1>
            <p className="text-grey mb-4">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Accusantium aperiam earum ipsa eius,
              inventore nemo labore eaque porro consequatur ex aspernatur.
              Explicabo, excepturi accusantium! Placeat voluptates esse ut optio
              facilis!
            </p>
            <Link to="/see-community" className="btn btn-primary">
              Visit
            </Link>
          </div>
          <div className="col-lg-6 wow fadeInRight" data-wow-delay="400ms">
            <div className="img-place custom-img-1">
              <img
                src="https://www.waldenu.edu/media/5462/seo-2279-bs-group-of-raised-hands-holding-417699019-1200x675"
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

export default CommunitySection;
