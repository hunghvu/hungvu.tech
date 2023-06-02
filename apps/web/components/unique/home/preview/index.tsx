/**
 * @author Hung Vu
 *
 * Hero section (well, but it is the latest article to be exact).
 */

import React from "react";

import Link from "next/link";
import Image from "next/image";

import CardContent from "../../../shared/card/content";
import Card from "../../../shared/card";

// Temporary value for testing purpose
const category = {
  name: "Tutorial",
  url: "categories/tutorial",
};

const Preview: React.FC = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:p-16 p-4 gap-8 justify-items-center items-center">
      {["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""].map((item, index) => (
        <div className="max-w-[26.5rem]">
          <Card key={index} />
        </div>
      ))}
    </section>
  );
};

export default Preview;
