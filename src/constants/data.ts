export const Roles = ['Duelist', 'Initiator', 'Controller', 'Sentinel', 'Flex'];

export const AGENTS_BY_ROLE: Record<string, string[]> = {
    Duelist: ['Jett', 'Phoenix', 'Raze', 'Reyna', 'Yoru', 'Iso'],
    Initiator: ['Sova', 'Skye', 'Fade', 'Breach', 'Gekko', 'KAY/O'],
    Controller: ['Omen', 'Brimstone', 'Viper', 'Harbor', 'Astra'],
    Sentinel: ['Sage', 'Killjoy', 'Cypher', 'Chamber', 'Deadlock'],
    Flex: [
        'Jett', 'Phoenix', 'Raze', 'Reyna', 'Yoru',
        'Iso', 'Sova', 'Skye', 'Fade', 'Breach',
        'Gekko', 'KAY/O', 'Omen', 'Brimstone', 'Viper',
        'Harbor', 'Astra', 'Sage', 'Killjoy', 'Cypher',
        'Chamber', 'Deadlock'
    ],
};
