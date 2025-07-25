import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WheelCanvas from "../WheelCanvas/WheelCanvas";
import { useGameStore } from "../../../store/gameStore";
import styles from './WheelScene.module.css';

export default function WheelScene() {
    const startSpin = useGameStore((s) => s.startSpin);
    const [spinning, setSpinning] = useState(true);

    // start spin → 3 sn sonra sonuçlara geç
    useEffect(() => {
        const id = setTimeout(() => {
            setSpinning(false);
            startSpin();
        }, 3000);
        return () => clearTimeout(id);
    }, [startSpin]);

    return (
        <motion.section
            className={styles.scene}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h2 className={styles.heading}>Roles are being distributed...</h2>
            <WheelCanvas spinning={spinning} />
        </motion.section>
    );
}

