export const shuffle = <T,>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const uniquePick = <T,>(pool: T[], used: Set<T>): T => {
    const available = pool.filter((v) => !used.has(v));
    const pick = available[Math.floor(Math.random() * available.length)];
    used.add(pick);
    return pick;
};