import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "../../../store/gameStore";
import ResultCard from "../ResultCard/ResultCard";
import styles from './ResultsScene.module.css'

export default function ResultsScene() {
    const results = useGameStore((s) => s.results);
    const reset = useGameStore((s) => s.reset);

    return (
        <motion.section
            className={styles.scene}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
        >
            <h2 className={styles.heading}>Results</h2>

            <AnimatePresence>
                <div className={styles.grid}>
                    {results.map((res, idx) => (
                        <ResultCard key={res.id} result={res} index={idx} />
                    ))}
                </div>
            </AnimatePresence>

            <button className={styles.button} onClick={reset}>
                Yeniden Çevir
            </button>
        </motion.section>
    );
}
