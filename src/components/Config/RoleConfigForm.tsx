import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../../store/gameStore";
import styles from "./RoleConfigForm.module.css";

/* Helper: stepper component */
function Stepper({ label, value, min, max, onChange }: {
    label: string;
    value: number;
    min: number;
    max: number;
    onChange: (v: number) => void;
}) {
    return (
        <div className={styles.stepper}>
            <span className={styles.role}>
                {label}
                <strong className={styles.count}> ({value})</strong>
            </span>
            <div className={styles.controls}>
                <button disabled={value <= min} onClick={() => onChange(value - 1)}>-</button>
                <span>{label}</span>
                <button disabled={value >= max} onClick={() => onChange(value + 1)}>+</button>
            </div>
        </div>
    );
}

export default function RoleConfigForm() {
    const [playerCount, setPlayerCount] = useState(5);
    const [quotas, setQuotas] = useState({
        Duelist: 0,
        Initiator: 0,
        Controller: 0,
        Sentinel: 0,
    });
    const [randomAgents, setRandomAgents] = useState(true);

    const sumOther = Object.values(quotas).reduce((a, b) => a + b, 0);
    const flex = playerCount - sumOther;
    const isValid = flex >= 0 && playerCount >= 3;

    const setConfig = useGameStore((s) => s.setConfig);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) return;
        setConfig(playerCount, quotas, randomAgents);
    };

    return (
        <motion.section
            className={styles.section}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
        >
            <h2 className={styles.heading}>Cast & Role Distribution</h2>

            <label className={styles.sliderLabel}>
                Number of Players: <strong>{playerCount}</strong>
            </label>
            <input
                type="range"
                min={3}
                max={10}
                value={playerCount}
                onChange={(e) => setPlayerCount(+e.target.value)}
                className={styles.slider}
            />

            {/* Stepper list */}
            {(["Duelist", "Initiator", "Controller", "Sentinel"] as const).map((r) => (
                <Stepper
                    key={r}
                    label={r}
                    value={quotas[r]}
                    min={0}
                    max={playerCount}
                    onChange={(v) => setQuotas({ ...quotas, [r]: v })}
                />
            ))}

            <p className={styles.flexInfo}>
                Flex (random): <strong>{Math.max(flex, 0)}</strong>
            </p>

            <label className={styles.toggle}>
                <input
                    type="checkbox"
                    checked={randomAgents}
                    onChange={(e) => setRandomAgents(e.target.checked)}
                />
                Troll picks (roles don't matter)
            </label>

            {flex < 0 && <p className={styles.error}>You have exceeded the total number of players!</p>}

            <button className={styles.btn} disabled={!isValid} onClick={handleSubmit}>
                Enter Names →
            </button>
        </motion.section>
    );
}