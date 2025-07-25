import { AGENTS_BY_ROLE, Roles } from "../constants/data";
import { uniquePick } from "./shuffle&uniquePick";

export const pickUniqueAgent = (
    role: typeof Roles[number],
    randomPool: boolean,
    used: Set<string>
): string => {
    const pool = randomPool
        ? Object.values(AGENTS_BY_ROLE).flat()
        : AGENTS_BY_ROLE[role];

    return uniquePick(pool, used);
};
