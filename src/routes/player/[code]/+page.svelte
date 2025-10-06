<script>
    import { page } from "$app/state";
    import { get } from "svelte/store";

    import "$lib/css/global.scss";
    import "$lib/css/player.scss";
    import Deck from "$lib/components/Deck.svelte";
    import Card from "$lib/components/cards/Card.svelte";
    import EvoCard from "$lib/components/cards/EvoCard.svelte";
    import Level from "$lib/components/Level.svelte";

    const rarityRank = {
        common: 1,
        rare: 2,
        epic: 3,
        legendary: 4,
        champion: 5,
    };

    let { data } = $props();
    data = data.data;
    console.log(data);
    

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

    let cardsByLevel = {};

    // Group cards by their level
    for (let card of data.cards) {
        const level = getLevel(card);
        if (!cardsByLevel[level]) {
            cardsByLevel[level] = [];
        }
        cardsByLevel[level].push(card);
    }

    // If you want an array of arrays (one array per level):
    let cardsGroupedByLevel = Object.values(cardsByLevel).reverse();
    // If you want a flat array of all cards (already in data.cards)
    let allCards = sortBy(data.cards, 0, false);
</script>

<svelte:head>
    <title
        >{data.name} {data.tag} Clash Royale profile | Royalty Statistics</title
    >
</svelte:head>

<main class="player">
    <h1>{data.name}'s statistics</h1>
    <div id="upper">
        <div class="player-stats">
            <ul>
                <li>
                    <strong>Name:</strong>
                    <div class="spacer"></div>
                    {data.name}
                </li>
                <li>
                    <strong>Tag:</strong>
                    <div class="spacer"></div>
                    {data.tag}
                </li>
                <li>
                    <strong>Trophies:</strong>
                    <div class="spacer"></div>
                    {data.trophies}
                </li>
                <li>
                    <strong>Clan:</strong>
                    <div class="spacer"></div>
                    {data.clan ? data.clan.name : "No clan"}
                </li>
                <li>
                    <strong>Level:</strong>
                    <div class="spacer"></div>
                    {data.expLevel}
                </li>
                <li>
                    <strong>Wins:</strong>
                    <div class="spacer"></div>
                    {data.wins}
                </li>
                <li>
                    <strong>Losses:</strong>
                    <div class="spacer"></div>
                    {data.losses}
                </li>
                <li>
                    <strong>Win ratio:</strong>
                    <div class="spacer"></div>

                    {round(round(data.wins / data.battleCount, 4) * 100, 2)}% <!---->
                </li>
            </ul>
            <div id="current-deck">
                <Deck
                    cards={allCards}
                    currentDeck={data.currentDeck}
                    repeat={8}
                    support={data.currentDeckSupportCards[0]}
                />
            </div>
        </div>
        <section class="cards">
            {#each cardsGroupedByLevel as levelCards}
                <Level cards={levelCards}></Level>
            {/each}
        </section>
    </div>
</main>

<style lang="scss">
</style>
