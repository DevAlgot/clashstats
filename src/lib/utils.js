export function round(num, decimals = 2) {
    let decimalsNum = Math.pow(10, decimals);
    num *= decimalsNum;

    return Math.round(num) / decimalsNum;
}

export function getLevel(card) {
    return card.level + (14 - card.maxLevel);
}

export function sortBy(list, type, ascending) {
    let t = [];

    switch (type) {
        case 0:
            if (ascending)
                t = list.sort((a, b) => getLevel(a) - getLevel(b));
            else t = list.sort((b, a) => getLevel(a) - getLevel(b));
            break;
        case 1:
            if (ascending) t = list.sort((a, b) => a.id - b.id);
            else t = list.sort((b, a) => a.id - b.id);
            break;
        case 2:
            if (ascending)
                t = list.sort((a, b) => a.elixirCost - b.elixirCost);
            else t = list.sort((b, a) => a.elixirCost - b.elixirCost);
            break;
        case 3:
            t = list.sort(
                (a, b) => rarityRank[a.rarity] - rarityRank[b.rarity],
            );
            t = list.sort(
                (a, b) => rarityRank[b.rarity] - rarityRank[a.rarity],
            );
            break;
        default:
            break;
    }
    return t;
}

export const rarityRank = {
    common: 1,
    rare: 2,
    epic: 3,
    legendary: 4,
    champion: 5,
};


export function getAvrageLevel(deck) {
    let sum = 0;
    for (let i = 0; i < deck.length; i++) {
        sum += getLevel(deck[i]);
    }
    return round(sum / deck.length, 1);
}

export function getAvrageElixir(deck) {
    let sum = 0;
    for (let i = 0; i < deck.length; i++) {
        sum += deck[i].elixirCost;
    }
    return round(sum / deck.length, 1);
}


export function sortCards(e, cardsGroupedByLevel) {
    console.log(e.target.value);
    switch (e.target.value) {
        case "rarity-asc":
            for (let levelCards of cardsGroupedByLevel) {
                levelCards.sort((a, b) => {
                    if (rarityRank[a.rarity] === rarityRank[b.rarity]) {
                        return a.elixirCost - b.elixirCost;
                    }
                    return rarityRank[a.rarity] - rarityRank[b.rarity];
                });
            }
            break;
        case "rarity-desc":
            for (let levelCards of cardsGroupedByLevel) {
                levelCards.sort((a, b) => {
                    if (rarityRank[a.rarity] === rarityRank[b.rarity]) {
                        return b.elixirCost - a.elixirCost;
                    }
                    return rarityRank[b.rarity] - rarityRank[a.rarity];
                });
            }
            break;
        case "elixir-asc":
            for (let levelCards of cardsGroupedByLevel) {
                levelCards.sort((a, b) => {
                    const costA = a.elixirCost ?? 0;
                    const costB = b.elixirCost ?? 0;

                    if (costA === costB) {
                        return rarityRank[a.rarity] - rarityRank[b.rarity];
                    }
                    return costA - costB;
                });
            }
            break;
        case "elixir-desc":
            for (let levelCards of cardsGroupedByLevel) {
                levelCards.sort((b, a) => {
                    const costA = a.elixirCost ?? 0;
                    const costB = b.elixirCost ?? 0;

                    if (costA === costB) {
                        return rarityRank[a.rarity] - rarityRank[b.rarity];
                    }
                    return costA - costB;
                });
            }
            break;
        case "evo-asc":
            for (let levelCards of cardsGroupedByLevel) {
                levelCards.sort((a, b) => {
                    if (a.evolutionLevel || a.maxEvolutionLevel) {
                        return false;
                    }
                    return true;
                });
            }
            break;
    }
    return cardsGroupedByLevel;
}


export const roles = {
    "member": "Member",
    "coLeader": "Co-Leader",
    "leader": "Leader"
}