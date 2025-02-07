// "use client";

// import React, { useEffect, useRef } from "react";
// import * as d3 from "d3";

// // Canvas size
// const width = 500;
// const height = 400;

// // Raindrop settings
// const numDrops = 100; // Number of raindropsa
// const dropSpeedMin = 2; // Min falling speed
// const dropSpeedMax = 5; // Max falling speed
// const dropSizeMin = 2; // Min raindrop size
// const dropSizeMax = 5; // Max raindrop size

// const RainAnimation: React.FC = () => {
//   const svgRef = useRef<SVGSVGElement | null>(null);

//   useEffect(() => {
//     if (!svgRef.current) return;

//     const svg = d3.select(svgRef.current);
//     svg.selectAll("*").remove(); // Clear previous elements

//     // Create raindrops
//     const drops = svg
//       .selectAll("circle")
//       .data(Array.from({ length: numDrops })) // Generate raindrop data
//       .enter()
//       .append("circle")
//       .attr("cx", () => Math.random() * width) // Random X position
//       .attr("cy", () => Math.random() * height) // Random Y position
//       .attr("r", () => d3.randomInt(dropSizeMin, dropSizeMax)()) // Random size
//       .attr("fill", "rgba(0, 120, 255, 0.7)");

//     // Function to animate raindrops
//     function animateRain() {
//       drops
//         .transition()
//         .duration(() => d3.randomInt(1000, 3000)()) // Random fall duration
//         .ease(d3.easeLinear)
//         .attr("cy", height + 10) // Move to bottom
//         .on("end", function () {
//           d3.select(this)
//             .attr("cy", -10) // Reset to top
//             .attr("cx", Math.random() * width) // Change X position
//             .transition()
//             .duration(() => d3.randomInt(1000, 3000)())
//             .ease(d3.easeLinear)
//             .attr("cy", height + 10)
//             .on("end", animateRain);
//         });
//     }

//     animateRain(); // Start animation

//     return () => {
//       svg.selectAll("*").remove(); // Cleanup on unmount
//     };
//   }, []);

//   return <svg ref={svgRef} width={width} height={height} />;
// };

// export default RainAnimation;


"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const width = 500;
const height = 400;
const waveAmplitude = 20; // Wave height
const waveFrequency = 0.02; // Wave frequency
const waveSpeed = 0.02; // Speed of wave movement

const SeaWave: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const path = svg
      .append("path")
      .attr("fill", "rgba(0, 120, 255, 0.7)")
      .attr("stroke", "blue")
      .attr("stroke-width", 2);

    function updateWave() {
      const waveData = d3.range(0, width + 1, 5).map((x) => {
        return {
          x,
          y: height / 2 + waveAmplitude * Math.sin(x * waveFrequency + Date.now() * waveSpeed),
        };
      });

      const line = d3.line()
        .x((d) => d.x)
        .y((d) => d.y)
        .curve(d3.curveBasis);

      path.attr("d", line(waveData));
    }

    d3.timer(updateWave);

    return () => {
      svg.selectAll("*").remove();
    };
  }, []);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default SeaWave;
