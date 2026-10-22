import "./skills.css";

const COMPETENCES = [
  { nom: "HTML / CSS", icone: ""},
  { nom: "Git",  icone: "" },
  { nom: "MySQL", icone: "" },
  { nom: "React", icone: "" },
  { nom: "Figma", icone: "" },
  { nom: "PHP", icone: "" },
  { nom: "Laravel", icone: "" },
  { nom: "Symfony", icone: "" },
  { nom: "PostgreSQL", icone: "" },

];

export default function Competences() {
  return (
    <section className="competences">
      <h1>Compétences</h1>
      <div className="competences-grid">
        {COMPETENCES.map((c) => (
          <article key={c.nom} className="competence-card">
            <span className="competence-icone">{c.icone}</span>
            <h2>{c.nom}</h2>
            <p>{c.niveau}</p>
          </article>
        ))}
      </div>
    </section>
  );
}