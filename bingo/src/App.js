import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { AmlTV } from "./pages/AmlTV/AmlTV";
import AugmentedTable from "./pages/AugmentedTable/AugmentedTable";
import { Mobile } from "./pages/Mobile/Mobile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SurroundWall from "./pages/SurroundWall/SurroundWall";

function App() {
  const [title] = useState("frontend");
  const cursorReplacementRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const GesturesStr = [
    "SWIPE_LEFT",
    "SWIPE_UP",
    "SWIPE_DOWN",
    "SWIPE_RIGHT",
    "CIRCLE_CLOCKWISE",
    "CIRCLE_COUNTERCLOCKWISE",
    "PINCH",
  ];

  // Similar to ngOnInit in Angular
  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      onmousemove(e);
    });

    window["electronAPI"]?.onGesture((arg) => {
      console.log("Gesture recognised: ", GesturesStr[arg]);
    });

    return () => {
      // Cleanup if needed
    };
  }, []);

  const onmousemove = (event) => {
    if (cursorReplacementRef.current) {
      cursorReplacementRef.current.style.left = event.pageX + "px";
      cursorReplacementRef.current.style.top = event.pageY + "px";
    }

    //console.log("Mouse Position:", event.pageX, event.pageY);
  };

  const cursorStyle = {
    width: "20px",
    height: "20px",
    backgroundColor: "blue",
    position: "absolute",
    borderRadius: "10px",
    pointerEvents: "none", // Ensure it doesn't interfere with mouse events
  };
  return (
    <Router onMouseMove={onmousemove}>
      <Routes>
        <Route exact path="/" element={<AmlTV />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/table" element={<AugmentedTable />} />
        <Route path="/wall" element={<SurroundWall />} />
      </Routes>
      <div
        ref={cursorReplacementRef}
        style={cursorStyle}
        className="cursor-replacement"
      ></div>
    </Router>
  );
}

export default App;
