import React, { useState } from "react";
import { useSelector } from "react-redux";

const NavBar: React.FC = () => {
  const [active, setActive] = useState<string>("");

  const toggleNav = (section: string) => {
    setActive(section);
  };

  return (
    <div className="bg-blue-800 p-4 flex justify-between items-center md:justify-center mb-5">
      <nav>
        {/* Lista de navegación */}
        <ul className="flex space-x-8 text-white">
          <li
            className="cursor-pointer hover:text-gray-300"
            onClick={() => toggleNav("Home")}
          >
            Home
          </li>
          <li
            className="cursor-pointer hover:text-gray-300"
            onClick={() => toggleNav("Calendar")}
          >
            Calendar
          </li>
          <li
            className="cursor-pointer hover:text-gray-300"
            onClick={() => toggleNav("Tasks")}
          >
            Tasks
          </li>
          <li
            className="cursor-pointer hover:text-gray-300"
            onClick={() => toggleNav("Progress")}
          >
            Progress
          </li>
          <li
            className="cursor-pointer hover:text-gray-300"
            onClick={() => toggleNav("Recursos")}
          >
            Recursos
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
