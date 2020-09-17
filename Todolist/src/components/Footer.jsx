import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Nick Kwok ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
