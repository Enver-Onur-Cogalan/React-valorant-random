import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Roles } from "../../../constants/data";
import styles from './WheelCanvas.module.css';

import valorantLogo from '../../../assets/logo.png';


export default function WheelCanvas() {
    return (
        <motion.div
            aria-label="Role picker wheel"
            className={styles.wheel}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            {/* Spinning ring */}
            <svg viewBox="0 0 120 120" className={styles.ring}>
                <circle cx='60' cy='60' r='52' />
            </svg>

            {/* PNG logo */}
            <img src={valorantLogo} alt="Valorant logo" className={styles.logo} />
        </motion.div>
    );
}

function useWheelRotation(active: boolean, speedDeg = 8) {
    const [deg, setDeg] = useState(0);
    const frame = useRef<number>(0);

    useEffect(() => {
        const animate = () => {
            setDeg((d) => (d + speedDeg) % 360);
            frame.current = requestAnimationFrame(animate);
        };

        if (active) {
            frame.current = requestAnimationFrame(animate);
        }
        return () => {
            if (frame.current) cancelAnimationFrame(frame.current);
        };
    }, [active, speedDeg]);

    return deg;
}

