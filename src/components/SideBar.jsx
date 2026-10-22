import { useState } from "react";
import "./SideBar.css";

export default function Sidebar({
  projets = [],
  projetActif,
  pageActive,
  onSelectPage,
  onSelectProjet,
}) {
  const [ouvertes, setOuvertes] = useState({
    projets: true,
  });

  const toggle = (cle) => {
    setOuvertes((prev) => ({ ...prev, [cle]: !prev[cle] }));
  };

  const pages = [
    { cle: "profil", label: "PROFIL" },
    { cle: "competences", label: "COMPETENCES" },
    { cle: "epreuves", label: "EPREUVES" },
    { cle: "experiences sco.", label: "EXPERIENCES SCOLAIRES" },
    { cle: "experiences pro.", label: "EXPERIENCES PROFESSIONNELLES" },
  ];

  return (
    <aside className="sidebar">
      {pages.map(({ cle, label }) => (
        <div className="section" key={cle}>
          <div
            className={`section-title ${pageActive === cle ? "actif" : ""}`}
            onClick={() => onSelectPage(cle)}
          >
            {label}
          </div>
        </div>
      ))}

      <div className="section">
        <div
          className={`section-title ${pageActive === "maquettes" ? "actif" : ""}`}
          onClick={() => onSelectPage("maquettes")}
        >
          MAQUETTES
        </div>
      </div>

      <div className="section">
        <div className="section-title" onClick={() => toggle("projets")}>
          PROJETS WEB{" "}
          <span className={`fleche ${ouvertes.projets ? "ouverte" : ""}`}>▾</span>
        </div>
        {ouvertes.projets && (
          <ul className="liste-projets">
            {projets.map((p) => (
              <li
                key={p}
                className={p === projetActif ? "actif" : ""}
                onClick={() => onSelectProjet(p)}
              >
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>
     

      <div className="sidebar-footer">•••</div>
    </aside>
  );
}