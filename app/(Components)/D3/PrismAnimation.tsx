"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

// Define the size of the SVG canvas
const width = 400;
const height = 400;

// Prism vertices
const prismVertices = [
  { x: 100, y: 50 },
  { x: 300, y: 50 },
  { x: 350, y: 150 },
  { x: 150, y: 150 },
  { x: 100, y: 50 }, // Closing point
];

const sideVertices = [
  { x: 100, y: 50 },
  { x: 150, y: 150 },
  { x: 350, y: 150 },
  { x: 300, y: 50 },
];

const bottomVertices = [
  { x: 150, y: 150 },
  { x: 350, y: 150 },
  { x: 300, y: 250 },
  { x: 100, y: 250 },
];

const PrismAnimation: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    
    // Grouping all elements to rotate them together
    const group = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

    // Draw front face
    group
      .append("polygon")
      .attr("points", prismVertices.map((p) => `${p.x - width / 2},${p.y - height / 2}`).join(" "))
      .attr("fill", "rgba(0, 120, 255, 0.7)")
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    // Draw side face
    group
      .append("polygon")
      .attr("points", sideVertices.map((p) => `${p.x - width / 2},${p.y - height / 2}`).join(" "))
      .attr("fill", "rgba(0, 90, 200, 0.7)")
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    // Draw bottom face
    group
      .append("polygon")
      .attr("points", bottomVertices.map((p) => `${p.x - width / 2},${p.y - height / 2}`).join(" "))
      .attr("fill", "rgba(0, 60, 150, 0.7)")
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    // Rotation animation using D3 transition
    function animateRotation() {
      group
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attrTween("transform", () => {
          return (t) => `translate(${width / 2},${height / 2}) rotate(${t * 360})`;
        })
        .on("end", animateRotation);
    }

    animateRotation(); // Start animation

    return () => {
      svg.selectAll("*").remove(); // Cleanup on unmount
    };
  }, []);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default PrismAnimation;
