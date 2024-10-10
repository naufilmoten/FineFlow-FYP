import React from "react";
import { createPopper } from "@popperjs/core";
import { useHistory } from "react-router-dom"; // Import useHistory for navigation
import manImage from "assets/img/man.png";

const WardenDropdown = () => { // Renamed to WardenDropdown
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const history = useHistory();

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("warden_id");
    localStorage.removeItem("citizen_id");
    history.push("/auth/login");
  };

  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="flex items-center">
          <span className="w-12 h-12 inline-flex items-center justify-center rounded-full overflow-hidden bg-blueGray-200">
            <img
              alt="Profile"
              className="w-full h-full object-cover rounded-full shadow-lg"
              src={manImage} // Use the imported image here
              onError={(e) => {
                e.target.onerror = null; // Prevent looping
                e.target.src = "https://via.placeholder.com/48"; // Fallback image
              }}
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <a
          href="#pablo"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={(e) => {
            e.preventDefault();
            handleLogout(); // Call handleLogout when clicking Logout
          }}
        >
          Logout
        </a>
      </div>
    </>
  );
};

export default WardenDropdown;
