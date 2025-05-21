import React, { useEffect, useState } from "react";
import "./App.css";
import Main from "./components/Main";
import GameOver from "./components/GameOver";

import store from "./store";
import { setGameOver } from "./features/gameSlice";

const App: any = () => {
  const [isOpen, setOpen] = useState(true);
  const [isGameOver, setGameOver] = useState(false);

  const update = () => {
    const state = store.getState();
    setGameOver(state.game.isGameOver);
    if (state.game.isGameOver == true) {
      location.href = "/";
    }
  };

  useEffect(() => {
    store.subscribe(() => update());
  }, []);

  return (
    <div>
      <Main isOpen={isOpen}></Main>
      <GameOver isOpen={isGameOver}></GameOver>
    </div>
  );
};

export default App;
