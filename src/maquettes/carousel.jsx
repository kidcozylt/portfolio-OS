import { useState } from "react";
import "./carousel.css";

const MAQUETTES = [
  {
    titre: "Titre de la maquette",
    description:
      "Description de la maquette : objectif, outils utilisés, choix de design.",
    image: null,
  },
  {
    titre: "Titre de la maquette",
    description:
      "Description de la maquette : objectif, outils utilisés, choix de design.",
    image: null,
  },
  {
    titre: "Titre de la maquette",
    description:
      "Description de la maquette : objectif, outils utilisés, choix de design.",
    image: null,
  },
];

export default function MaquetteCarousel() {
  const [index, setIndex] = useState(0);

  const total = MAQUETTES.length;
  const maquette = MAQUETTES[index];

  const precedent = () => setIndex((i) => (i - 1 + total) % total);
  const suivant = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="carousel">
      <div className="carousel__scene">
        <button
          className="pixel-btn"
          onClick={precedent}
          aria-label="Maquette précédente"
        >
          ◀
        </button>

        <div className="carousel__frame">
          {maquette.image ? (
            <img src={maquette.image} alt={maquette.titre} />
          ) : (
            <div className="carousel__placeholder">{maquette.titre}</div>
          )}
        </div>

        <button
          className="pixel-btn"
          onClick={suivant}
          aria-label="Maquette suivante"
        >
          ▶
        </button>
      </div>

      <div className="carousel__dots" role="tablist">
        {MAQUETTES.map((m, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === index}
            aria-label={`Maquette ${i + 1}`}
            className={`carousel__dot ${i === index ? "is-active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      {/* Box de description en pixels */}
      <div className="pixel-box">
        <h2 className="pixel-box__title">{maquette.titre}</h2>
        <p className="pixel-box__text">{maquette.description}</p>
        <span className="pixel-box__count">
          {index + 1}/{total}
        </span>
      </div>
    </section>
  );
}