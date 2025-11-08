import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="text-center p-4 bg-gray-800 text-white">
        &copy; {new Date().getFullYear()} HealOnline. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
