import { create } from 'zustand';
import { shuffle } from '../utils/shuffle&uniquePick';
import { pickUniqueAgent } from '../utils/pickUniqueAgents';

export type Role = "Duelist" | "Initiator" | "Controller" | "Sentinel" | "Flex";

export interface RoleQuota {
    Duelist: number;
    Initiator: number;
    Controller: number;
    Sentinel: number;
    Flex: number;           // //will be filled automatically
}

interface Result {
    nickname: string;
    role: string;
    agent: string;
    id: string;
}

interface GameState {
    nicknames: string[];
    results: Result[];
    step: "config" | "input" | "spinning" | "results";
    playerCount: number;
    quotas: RoleQuota;
    randomAgents: boolean;

    /* -- Actions -- */
    setConfig: (
        playerCount: number,
        quotas: Omit<RoleQuota, "Flex">,
        randomAgents: boolean
    ) => void;
    setNicknames: (names: string[]) => void;
    startSpin: () => void;
    reset: () => void;
}

const defaultQuotas: RoleQuota = {
    Duelist: 0,
    Initiator: 0,
    Controller: 0,
    Sentinel: 0,
    Flex: 5,      // Let's assume 5 players in the first opening
};

export const useGameStore = create<GameState>((set, get) => ({
    /* state */
    step: "config",
    playerCount: 5,
    quotas: defaultQuotas,
    randomAgents: true,

    nicknames: [],
    results: [],

    /* actions */
    setConfig: (playerCount, qWithoutFlex, randomAgents) => {
        // Flex = remainder
        const used = Object.values(qWithoutFlex).reduce((a, b) => a + b, 0);
        const quotas: RoleQuota = { ...qWithoutFlex, Flex: playerCount - used };

        set({
            playerCount,
            quotas,
            randomAgents,
            step: "input",
            nicknames: Array(playerCount).fill(""),
        });
    },

    setNicknames: (names) => set({ nicknames: names }),

    startSpin: () => {
        const { quotas, nicknames, randomAgents } = get();

        /* 1. Role list according to quotas */
        const roleArr: Role[] = [];
        for (const role in quotas) {
            roleArr.push(...Array(quotas[role as Role]).fill(role as Role));
        }
        shuffle(roleArr);

        /* 2nd agent selection */
        const used = new Set<string>();
        const agents = roleArr.map((r) => pickUniqueAgent(r, randomAgents, used));

        /* 3. result objects */
        const results: Result[] = nicknames.map((name, i) => ({
            id: crypto.randomUUID(),
            nickname: name,
            role: roleArr[i],
            agent: agents[i],
        }));

        set({ results, step: "results" });
    },

    reset: () =>
        set({
            step: "config",
            playerCount: 5,
            quotas: defaultQuotas,
            randomAgents: true,
            nicknames: [],
            results: [],
        }),
}));
