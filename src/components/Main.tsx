import React, { useState } from "react";
import Button from "./Button";
import store from "../store";
import { setGameMode } from "../features/gameSlice";

type MainType = {
  isOpen?: boolean;
};

type TitleType = {
  children?: any;
  fontSize?: number;
  fontWeight?: number;
  marginTop?: number;
};

const Main = ({ isOpen = true }: MainType) => {
  const [difficulty, setDifficulty] = useState("easy");
  const difficultyValue: any = {
    easy: {
      minRadian: 190,
      maxRadian: 200,
      shotFrequency: 1000,
    },
    normal: {
      minRadian: 170,
      maxRadian: 200,
      shotFrequency: 500,
    },
    hard: {
      minRadian: 160,
      maxRadian: 200,
      shotFrequency: 300,
    },
  };

  const switchDifficulty = (mode: string) => {
    setDifficulty(mode);

    store.dispatch(
      setGameMode({
        minRadian: difficultyValue[mode].minRadian,
        maxRadian: difficultyValue[mode].maxRadian,
        shotFrequency: difficultyValue[mode].shotFrequency,
      })
    );
  };

  return (
    <div
      style={{
        display: isOpen ? "flex" : "none",
        justifyContent: "center",
        position: "absolute",
        width: "100%",
      }}
    >
      <div style={{ padding: "3rem 4rem" }}>
        <Title fontSize={3} fontWeight={700}>
          Light Saber
        </Title>
        <Title fontSize={1} fontWeight={500} marginTop={1}>
          This game is now the ultimate power in the universe! Play with VR
        </Title>
        <Title fontSize={1} fontWeight={500} marginTop={1}>
          - <a href="https://hhj.devent.kr/">@huh.hyeongjun</a>
        </Title>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            marginTop: "2rem",
          }}
        >
          <Button
            isActive={difficulty == "easy" ? true : false}
            onClick={() => switchDifficulty("easy")}
          >
            Easy
          </Button>
          <Button
            isActive={difficulty == "normal" ? true : false}
            onClick={() => switchDifficulty("normal")}
          >
            Normal
          </Button>
          <Button
            isActive={difficulty == "hard" ? true : false}
            onClick={() => switchDifficulty("hard")}
          >
            Hard
          </Button>
        </div>
      </div>
    </div>
  );
};

const Title = ({ children, fontSize, fontWeight, marginTop }: TitleType) => {
  return (
    <div
      style={{
        textAlign: "center",
        color: "#ffffff",
        fontSize: String(fontSize) + "rem",
        fontFamily: "'Noto Sans KR', sans-serif",
        fontWeight: fontWeight,
        marginTop: String(marginTop) + "rem",
      }}
    >
      {children}
    </div>
  );
};

export default Main;
