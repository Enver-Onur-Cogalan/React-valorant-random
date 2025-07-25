import React from "react";
import { AnimatePresence, px } from "framer-motion";

import NicknameForm from "./components/NicknameForm/NicknameForm";
import WheelScene from "./components/Wheel/WheelScene/WheelScene";
import ResultsScene from "./components/Results/ResultsScene/ResultsScene";
import { useGameStore } from "./store/gameStore";

import styles from './App.module.css'
import RoleConfigForm from "./components/Config/RoleConfigForm";


export default function App() {
  const step = useGameStore((s) => s.step);

  return (
    <div className={styles.wrapper}>
      <AnimatePresence mode="wait">
        {step === "config" && <RoleConfigForm key="config" />}
        {step === "input" && <NicknameForm key="input" />}
        {step === "spinning" && <WheelScene key="wheel" />}
        {step === "results" && <ResultsScene key="results" />}
      </AnimatePresence>
    </div>
  );
}
