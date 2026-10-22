import "./TitleBar.css";
import button from "../assets/button.png";

export default function TitleBar({ titre = "Portfolio" }) {
  return (
    <div className="title-bar">
      <span className="icon"><img src={button} width="64" height="64" /></span>
      <span className="title-text">{titre}</span>
      <div className="window-controls">
        <span className="ctrl">&minus;</span>
        <span className="ctrl">▢</span>
        <span className="ctrl">✕</span>
      </div>
    </div>
  );
}