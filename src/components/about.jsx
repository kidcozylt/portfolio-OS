import "./about.css";

const BLOCS = [
  {
    titre: "À propos de moi",
    texte:
      "Étudiante en 2ème année de BTS SIO option SLAM, je suis passionnée par le développement et par l'aspect artistique du design et de la création d'interfaces.",
  },
  {
    titre: "À la recherche d'une alternance",
    texte:
      "Je recherche une alternance pour la rentrée prochaine afin de poursuivre mes études tout en gagnant en expérience. N'hésitez pas à me contacter !",
  },
];

export default function About() {
  return (
    <section className="about">
      <h1>Profil</h1>
      <div className="about-grid">
        {BLOCS.map((b) => (
          <article key={b.titre} className="about-card">
            <h2>{b.titre}</h2>
            <p>{b.texte}</p>
          </article>
        ))}
      </div>
    </section>
  );
}