"use client";

import { useEffect, useState } from "react";
import "./app.css";
import { io } from "socket.io-client";
import Chat from "./chat";

const SOCKET_URL = import.meta.env.DEV ? undefined : "https://my-irc.onrender.com";

const socket = io(SOCKET_URL, { autoConnect: false });

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [isRoomJoined, setIsRoomJoined] = useState(false);
  const [error, setError] = useState("");

  // Connexion à l'ouverture, déconnexion à la fermeture
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  const connectUser = () => {
    const clean = username.trim();

    if (clean === "") return;

    socket.emit("register", clean, (response) => {
      if (response?.ok) {
        setUsername(response.username);
        setIsUserConnected(true);
        setError("");
      } else {
        setError(response?.error || "Connexion impossible.");
      }
    });
  };

  const joinRoom = () => {
    const clean = room.trim();

    if (clean === "") return;
    
    setRoom(clean);
    setIsRoomJoined(true);
  };

  return (
    <div className="irc-chat">
      {!isUserConnected ? (
        <div className="irc-login">
          <h3>Connexion</h3>

          <input
            type="text"
            placeholder="Pseudo"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") connectUser();
            }}
          />

          {error && <p className="irc-error">{error}</p>}

          <button onClick={connectUser}>
            Se connecter
          </button>
        </div>
      ) : !isRoomJoined ? (
        <div className="irc-login">
          <h3>Rejoindre un salon</h3>

          <input
            type="text"
            placeholder="Code du salon"
            value={room}
            onChange={(event) => setRoom(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") joinRoom();
            }}
          />

          <button onClick={joinRoom}>
            Rejoindre
          </button>
        </div>
      ) : (
        <Chat
          socket={socket}
          username={username}
          room={room}
        />
      )}
    </div>
  );
}

export default App;