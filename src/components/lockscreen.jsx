import { useEffect, useState } from "react";
import "./lockscreen.css";

export default function LockScreen({ onUnlock, langue = "fr" }) {
  const [sortie, setSortie] = useState(false);

  const deverrouiller = () => {
    if (sortie) return;
    setSortie(true);
    setTimeout(onUnlock, 700);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (["Enter", " ", "ArrowUp"].includes(e.key)) deverrouiller();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div
      className={`lock-screen ${sortie ? "lock-screen--out" : ""}`}
      onClick={deverrouiller}
    >
      <div className="lock-center">
        <h1 className="lock-title">
          {langue === "fr" ? "Portfolio de Laurenda TESSI" : "Laurenda's Portfolio"}
        </h1>

        <img className="lock-avatar" src="/profil.jpg" alt="Photo de profil" />

        <p className="lock-hint">
          {langue === "fr"
            ? "Cliquez ou appuyez sur Entrée pour entrer"
            : "Click or press Enter to unlock"}
        </p>
      </div>
    </div>
  );
}