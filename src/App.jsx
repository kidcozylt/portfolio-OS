import { useState } from "react";

import "./styles/variables.css";
import "./App.css";

import TitleBar from "./components/TitleBar";
import Sidebar from "./components/SideBar";
import TabBar from "./components/TabBar";
import StatusBar from "./components/StatusBar";
import Competences from "./components/skills";
import About from "./components/about";
import LockScreen from "./components/lockscreen";

import MaquetteCarousel from "./maquettes/carousel";

import Puissance4 from "./projets/puissance4/puissance4";
import ChatIRC from "./projets/my-irc/app";

const PROJETS = [
  "puissance-4",
  "chatroom",
  "projet-3",
  "projet-4",
];

export default function App() {
  // L'écran de verrouillage s'affiche au chargement
  const [verrouille, setVerrouille] = useState(true);

  const [ongletActif, setOngletActif] = useState("profil");
  const [ongletsOuverts, setOngletsOuverts] = useState(["profil"]);
  const [langue, setLangue] = useState("fr");

  // Ouvre l'onglet ou l'active s'il est déjà ouvert
  const ouvrirOnglet = (nom) => {
    setOngletsOuverts((prev) =>
      prev.includes(nom) ? prev : [...prev, nom]
    );

    setOngletActif(nom);
  };

  // Ferme un onglet et active un onglet voisin si nécessaire
  const fermerOnglet = (nom) => {
    const index = ongletsOuverts.indexOf(nom);

    const restants = ongletsOuverts.filter(
      (onglet) => onglet !== nom
    );

    setOngletsOuverts(restants);

    if (nom === ongletActif) {
      setOngletActif(
        restants[index] ??
        restants[index - 1] ??
        null
      );
    }
  };

  // Affiche le contenu correspondant à l'onglet actif
  const renderContenu = () => {
    if (!ongletActif) {
      return <p>Aucun onglet ouvert</p>;
    }

    // Projets
    if (PROJETS.includes(ongletActif)) {
      if (ongletActif === "puissance-4") {
        return <Puissance4 />;
      }

      // Chat IRC dans le projet 2
      if (ongletActif === "chatroom") {
        return <ChatIRC />;
      }

      // Contenu temporaire des autres projets
      return (
        <section>
          <h1>{ongletActif}</h1>
          {/* contenu du projet */}
        </section>
      );
    }

    // Onglet unique des maquettes : carrousel + box de description
    if (ongletActif === "maquettes") {
      return <MaquetteCarousel />;
    }

    // Compétences
    if (ongletActif === "competences") {
      return <Competences />;
    }

    // Profil
    if (ongletActif === "profil") {
      return <About />;
    }

    // Autres pages
    return <h1>{ongletActif}</h1>;
  };

  return (
    <>
      {/* Écran de verrouillage par-dessus le portfolio */}
      {verrouille && (
        <LockScreen
          langue={langue}
          onUnlock={() => setVerrouille(false)}
        />
      )}

      <div className="app-window">
        <TitleBar titre="Portfolio" />

        <div className="body">
          <Sidebar
            projets={PROJETS}
            pageActive={ongletActif}
            projetActif={ongletActif}
            onSelectPage={ouvrirOnglet}
            onSelectProjet={ouvrirOnglet}
          />

          <TabBar
            onglets={ongletsOuverts}
            ongletActif={ongletActif}
            onSelectOnglet={setOngletActif}
            onFermerOnglet={fermerOnglet}
          >
            {renderContenu()}
          </TabBar>
        </div>

        <StatusBar
          langue={langue}
          onChangeLangue={setLangue}
          heure="22:52"
        />
      </div>
    </>
  );
}