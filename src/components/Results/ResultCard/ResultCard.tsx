import React from "react";
import { motion } from "framer-motion";
import styles from './ResultCard.module.css';

export interface Result {
    id: string;
    nickname: string;
    role: string;
    agent: string;
}

interface Props {
    result: Result;
    index: number;
}

const roleColors: Record<string, string> = {
    Duelist: "#e11d48", // rose‑600
    Initiator: "#14b8a6", // teal‑500
    Controller: "#8b5cf6", // violet‑500
    Sentinel: "#f59e0b", // amber‑500
    Flex: "#06b6d4", // cyan‑500
};

export default function ResultCard({ result }: Props) {
    const { nickname, role, agent } = result;

    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={styles.card}
            style={{ "--role-clr": roleColors[role] ?? "#4b5563" } as React.CSSProperties}
        >
            <span className={styles.badge}>{role}</span>
            <span className={styles.name}>{nickname}</span>
            <span className={styles.agent}>{agent}</span>
        </motion.div>
    );
}
