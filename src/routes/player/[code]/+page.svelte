<script>
    import { page } from "$app/state";
    import { get } from "svelte/store";

    import "$lib/css/global.scss";
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
    let cardsGroupedByLevel = Object.values(cardsByLevel);

    // If you want a flat array of all cards (already in data.cards)
    let allCards = sortBy(data.cards, 0, false);

    console.log(cardsGroupedByLevel.reverse());
    console.log(allCards);
</script>

<h1>{data.name}'s statistics</h1>
<div id="upper">
    <div class="player-stats">
        <ul>
            <li><strong>Name:</strong> {data.name}</li>
            <li><strong>Tag:</strong> {data.tag}</li>
            <li><strong>Trophies:</strong> {data.trophies}</li>
            <li><strong>Clan:</strong> {data.clan.name}</li>
            <li><strong>Level:</strong> {data.level}</li>
            <li><strong>Wins:</strong> {data.wins}</li>
            <li><strong>Losses:</strong> {data.losses}</li>
            <li>
                <strong>Win ratio:</strong>
                {round(round(data.wins / data.battleCount, 4) * 100, 2)}% <!---->
            </li>
        </ul>
        <div id="current-deck">
            <Deck currentDeck={data.currentDeck} />
        </div>
    </div>
    <section class="cards">
        {#each cardsGroupedByLevel as levelCards}
            <Level cards={levelCards}></Level>
        {/each}
    </section>
</div>

<style lang="scss">
    #upper {
        background: inherit;
        border: 2px dotted #1e19ad;
        padding: 1rem;
        border-radius: 8px;
        max-width: 60vw;
        margin: auto;

        .cards {
            display: flex;
            flex-direction: column;
        }
    }

    .player-stats {
        display: flex;
        justify-content: space-between;

        ul {
            list-style: none;
            padding: 0;
            max-width: 45%;
            display: inline-block;
        }
    }

    #current-deck {
        max-width: 45%;
    }
</style>
