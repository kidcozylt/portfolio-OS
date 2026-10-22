import { useEffect, useRef, useState } from "react";
import { Puissance4Game } from "./puissance4game";
import "./puissance4.css";

const LIGNES = 6;
const COLONNES = 7;

export default function Puissance4() {
  const rootRef = useRef(null);
  const [config, setConfig] = useState(null);
  const [nom1, setNom1] = useState("");
  const [nom2, setNom2] = useState("");

  // Lance la partie une fois les noms validés
  useEffect(() => {
    if (!config) return;
    const game = new Puissance4Game(rootRef.current, config);
    return () => game.destroy();
  }, [config]);

  const demarrer = (e) => {
    e.preventDefault();
    setConfig({
      rows: LIGNES,
      columns: COLONNES,
      player1: nom1.trim() || "Joueur 1",
      player2: nom2.trim() || "Joueur 2",
    });
  };

  return (
    <div className="puissance4" ref={rootRef}>
      <h1>PUISSANCE 4</h1>
      <h3></h3>
      <div id="scoreDisplay"></div>

      {!config && (
        <form className="p4-noms" onSubmit={demarrer}>
          <label className="p4-rouge">
            Joueur 1 (Rouge)
            <input
              type="text"
              value={nom1}
              onChange={(e) => setNom1(e.target.value)}
              placeholder="Joueur 1"
              maxLength={16}
              autoFocus
            />
          </label>
          <label className="p4-jaune">
            Joueur 2 (Jaune)
            <input
              type="text"
              value={nom2}
              onChange={(e) => setNom2(e.target.value)}
              placeholder="Joueur 2"
              maxLength={16}
            />
          </label>
          <button type="submit">Jouer</button>
        </form>
      )}
    </div>
  );
}