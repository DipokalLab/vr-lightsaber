import React from "react";

type GameOverType = {
  isOpen?: boolean;
};

const GameOver = ({ isOpen = false }: GameOverType) => {
  return (
    <div
      style={{
        display: isOpen ? "flex" : "none",
        justifyContent: "center",
        position: "absolute",
        width: "100%",
        zIndex: 99999,
      }}
    >
      <div style={{ padding: "3rem 4rem" }}>
        <p>Game Over</p>
      </div>
    </div>
  );
};

export default GameOver;
