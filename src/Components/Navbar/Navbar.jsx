/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {
  faHouse,
  faPlus,
  faClockRotateLeft,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./navbar.css";
function Navbar({ flag }) {
  return (
    <>
      <div className="nav-bar">
        <div className="fixed">
          {flag ? (
            <button
              type="button"
              className="btn-opt"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <FontAwesomeIcon
                icon={faPlus}
                style={{ color: "#ffffff" }}
                size="xl"
              />
            </button>
          ) : (
            <Link to="/" className="btn-opt">
              <FontAwesomeIcon
                icon={faHouse}
                style={{ color: "#ffffff" }}
                size="lg"
              />
            </Link>
          )}
        </div>

        <Link to="/history" className="btn-opt">
          <FontAwesomeIcon
            icon={faClockRotateLeft}
            style={{ color: "#ffffff" }}
            size="lg"
          />
        </Link>
        <Link to="/limit" className="btn-opt">
          <FontAwesomeIcon
            icon={faSliders}
            style={{ color: "#ffffff" }}
            size="lg"
          />
        </Link>
      </div>
    </>
  );
}

export default Navbar;
