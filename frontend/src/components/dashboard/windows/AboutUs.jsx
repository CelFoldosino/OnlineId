/** @format */

import React from "react";
import Casandra from "../../../assets/team/Casandra.jpg";
import Anton from "../../../assets/team/Anton.jpg";
import Francel from "../../../assets/team/Francel.jpg";

const AboutUs = () => {
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-[3rem] text-blue-700 font-bold">Overview</h1>
      <p className="pb-10">
        We created the Web-Based Online ID Card Generation System to update the
        current ID card issuance process. This project was developed by three
        students of the Philippine State College of Aeronautics (PhilSCA). Our
        system allows students, faculty, and staff to input their details online
        for quick and secure ID processing, verified by the registrar.
        Integrating One-Time Password (OTP) technology ensures that all user
        data is kept private and protected.
      </p>

      <h3 className="text-[2rem]  font-bold pb-2">MEET THE TEAM</h3>
      <div className="flex justify-between items-center">
        <div className="text-center">
          <img src={Casandra} alt="Casandra" className="h-[350px] w-full" />
          <p className="font-bold">Casandra Denise O. Dizon</p>
          <p>Project Manager</p>
        </div>
        <div className="text-center">
          <img src={Anton} alt="Anton" className="h-[350px] w-full" />

          <p className="font-bold">Anton Van F. Domingo</p>
          <p>Technical Writer</p>
        </div>
        <div className="text-center">
          <img src={Francel} alt="Francel" className="h-[350px] w-full" />
          <p className="font-bold">Francel P. Foldosino</p>
          <p>Lead Developer</p>
        </div>
      </div>
      <p className="text-center py-10">
        We are all committed to making this system the best it can be in terms
        of performance, security, and usability, and this effort is continuous.
      </p>

      <div className="flex flex-col gap-3 pb-5">
        <p className="font-bold">Capstone Adviser:</p>
        <p className="font-semibold">RICHARD NIEL B. PERALTA, MSIT</p>
        <p className="font-bold">Academic Adviser:</p>
        <p className="font-semibold">
          ASSOC. PROF. MARY ANN F. ABALLIAR-VISTA, MEAM
        </p>
      </div>
      <p className="font-bold pb-1">Copyright Notice</p>
      <p className="pb-2 font-semibold">
        © 2024 Philippine State College of Aeronautics (PhilSCA) and the
        Development Team
      </p>
      <p className="font-semibold">
        All rights reserved. This Web-Based Online ID Card Generation System
        such as the software used, the layout, programming codes, text, image,
        logo, and all other elements of this system belongs to the Philippine
        State College of Aeronautics (PhilSCA) and the development team. Use of
        any content of this system, whole or partial, without proper
        accreditation and written acceptance of the owners of this system, is
        prohibited.
      </p>
    </div>
  );
};

export default AboutUs;
