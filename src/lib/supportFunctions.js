function round(num, decimals = 2) {
    let decimalsNum = Math.pow(10, decimals);
    num *= decimalsNum;

    return Math.round(num) / decimalsNum;
}

function getLevel(card) {
    return card.level + (14 - card.maxLevel);
}

function sortBy(list, type, ascending) {
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