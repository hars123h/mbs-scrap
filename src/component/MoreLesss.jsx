import { useEffect, useState } from "react";
import "../styling/Notification.css"

const copyStart = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const copyEnd= "Duis aute irure dolor in reprehenderit in voluptate "
const defaultHeight = 0;

const ToggleButton = ({ isExpanded, onClick }) => {
  return (
    <button className="btn-toggle" onClick={onClick}>
      {isExpanded ? "Show Less" : "Show More"}
    </button>
  );
};

const MoreLesss = ({ isLongCopy = true }) => {
  const text = `${copyStart} ${isLongCopy ? copyEnd : ""}`;
  const [heightCurrent, setHeightCurrent] = useState(defaultHeight);
  const [heightMax, setHeightMax] = useState(defaultHeight);
  const [heightMin, setHeightMin] = useState(defaultHeight);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const element = document.querySelector(".text-display")
    const heightClient = element?.clientHeight || defaultHeight;
    const scrollClient = element?.scrollHeight || defaultHeight;
    if (heightClient !== scrollClient) {
      setIsOverflow(true);
      setHeightMax(scrollClient);
      setHeightMin(heightClient);
      setHeightCurrent(heightClient);
    }
  }, [text]);

  const handleClickBtn = () => {
    setHeightCurrent(isExpanded ? heightMin : heightMax);
    setIsExpanded((prev) => !prev);
  };
  return (
    <div className="moreLess">
      <div
        className={`${isExpanded ? "expanded" : "collapsed"} text-display`}
        style={{ height: `${heightCurrent}px` }}
      >
        {text}
      </div>
      {isOverflow && <ToggleButton isExpanded={isExpanded} onClick={handleClickBtn}/>}
    </div>
  );
};

export default MoreLesss;