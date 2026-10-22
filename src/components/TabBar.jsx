import { useState, useEffect } from "react";
import "./TabBar.css";

export default function TabBar({ onglets, ongletActif, onSelectOnglet, onFermerOnglet, children }) {
  const [theme, setTheme] = useState(() => {
    const sauvegarde = localStorage.getItem("theme");
    if (sauvegarde) return sauvegarde;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const basculerTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const fermerOnglet = (onglet, e) => {
    e.stopPropagation();
    onFermerOnglet(onglet);
  };

  return (
    <main className="main-panel">
      <div className="tab-bar">
        {onglets.map((onglet) => (
          <div
            key={onglet}
            className={`tab ${onglet === ongletActif ? "actif" : ""}`}
            onClick={() => onSelectOnglet(onglet)}
          >
            <span>{onglet}</span>
            <span className="tab-close" onClick={(e) => fermerOnglet(onglet, e)}>
              ✕
            </span>
          </div>
        ))}
      </div>
      <div className="contenu">{children}</div>
    </main>
  );
}