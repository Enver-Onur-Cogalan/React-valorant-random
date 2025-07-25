import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "../../store/gameStore";
import styles from './NicknameForm.module.css'


export default function NicknameForm() {
    /* ▶︎ store */
    const playerCount = useGameStore((s) => s.playerCount);
    const setNicknames = useGameStore((s) => s.setNicknames);
    const goToSpin = () => useGameStore.setState({ step: "spinning" });

    /* ▶︎ local state */
    const [inputs, setInputs] = useState<string[]>(Array(playerCount).fill(""));
    const [error, setError] = useState<string | null>(null);


    /* ▶︎ handlers */
    const handleChange = (idx: number, value: string) => {
        setInputs((prev) => {
            const copy = [...prev];
            copy[idx] = value;
            return copy;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const trimmed = inputs.map((n) => n.trim()).filter(Boolean);

        if (trimmed.length !== playerCount) {
            return setError(`Please ${playerCount} enter player name.`);
        }

        // Benzersiz kontrolü
        if (new Set(trimmed).size !== playerCount) {
            return setError("Nicknames must be unique.");
        }

        setError(null);
        setNicknames(trimmed);
        goToSpin();
    };

    return (
        <motion.section
            className={styles.section}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
        >
            <h1 className={styles.title}>VALORANT</h1>
            <h2 className={styles.subtitle}>Enter 5 player names and random roles and agents will be assigned!</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
                {Array.from({ length: playerCount }).map((_, idx) => (
                    <input
                        key={idx}
                        className={styles.input}
                        placeholder={`${idx + 1}. Nickname`}
                        value={inputs[idx]}
                        onChange={(e) => handleChange(idx, e.target.value)}
                    />
                ))}

                {error && <p className={styles.error}>{error}</p>}

                <button
                    type="submit"
                    className={styles.button}
                >
                    Assign agents
                </button>
            </form>
        </motion.section>
    );
}

