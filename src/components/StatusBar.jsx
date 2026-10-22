import { useState, useEffect } from "react";
import "./StatusBar.css";

export default function StatusBar() {
  const [heure, setHeure] = useState(() => getHeureActuelle());
  const [langue, setLangue] = useState("FR");
  const [theme, setTheme] = useState(() => {
    const sauvegarde = localStorage.getItem("theme");
    if (sauvegarde) return sauvegarde;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const interval = setInterval(() => setHeure(getHeureActuelle()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  function getHeureActuelle() {
    const maintenant = new Date();
    const heures = String(maintenant.getHours()).padStart(2, "0");
    const minutes = String(maintenant.getMinutes()).padStart(2, "0");
    return `${heures}:${minutes}`;
  }

  const basculerTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <footer className="status-bar">
      <button className={`lang ${langue === "FR" ? "actif" : ""}`} onClick={() => setLangue("FR")}>FR</button>
      <button className={`lang ${langue === "ENG" ? "actif" : ""}`} onClick={() => setLangue("ENG")}>ENG</button>

      <button className="lang theme-toggle" onClick={basculerTheme}>
        {theme === "dark" ? "☀ Clair" : "☾ Sombre"}
      </button>

      <span className="heure">{heure}</span>
    </footer>
  );
}