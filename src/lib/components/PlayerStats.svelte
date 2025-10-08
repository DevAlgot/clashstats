<script>
    import { round, getLevel, sortBy, rarityRank } from "$lib/utils";

    import Deck from "$lib/components/Deck.svelte";
    import Card from "$lib/components/cards/Card.svelte";
    import EvoCard from "$lib/components/cards/EvoCard.svelte";
    import Level from "$lib/components/Level.svelte";

    let { data } = $props();

    console.log(data);

    let cardsByLevel = {};

    // Group cards by their level
    for (let card of data.cards) {
        const level = getLevel(card);
        if (!cardsByLevel[level]) {
            cardsByLevel[level] = [];
        }
        cardsByLevel[level].push(card);
    }

    // The card by level, a "2d" array
    let cardsGroupedByLevel = $state(Object.values(cardsByLevel).reverse());

    for (let levelCards of cardsGroupedByLevel) {
        // Sort each level group by rarity and then name
        levelCards.sort((a, b) => {
            if (rarityRank[a.rarity] === rarityRank[b.rarity]) {
                return b.elixirCost - a.elixirCost;
            }
            return rarityRank[b.rarity] - rarityRank[a.rarity];
        });
    }

    // If you want a flat array of all cards (already in data.cards)
    let allCards = sortBy(data.cards, 0, false);
</script>

<div class="player-stats">
    <ul>
        <li>
            <h2><strong>Trophies:</strong></h2>
            <p>{data.trophies}</p>
        </li>
        <li>
            <h2><strong>Clan:</strong></h2>
            <p>{data.clan ? data.clan.name : "No clan"}</p>
        </li>
        <li>
            <h2><strong>Level:</strong></h2>
            <p>{data.expLevel}</p>
        </li>
        <li>
            <h2><strong>Wins:</strong></h2>
            <p>{data.wins}</p>
        </li>
        <li>
            <h2><strong>Losses:</strong></h2>
            <p>{data.losses}</p>
        </li>
        <li>
            <h2><strong>Favorite card:</strong></h2>
            <p>
                {data.currentFavouriteCard.name}
            </p>
            <!---->
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

<!-- svelte-ignore a11y_consider_explicit_label -->
<button
    onclick={() => {
        for (let levelCards of cardsGroupedByLevel) {
            // Sort each level group by rarity and then name
            levelCards.sort((a, b) => {
                if (rarityRank[a.rarity] === rarityRank[b.rarity]) {
                    return a.elixirCost - b.elixirCost;
                }
                return rarityRank[b.rarity] - rarityRank[a.rarity];
            });
        }
    }}
    type="button"
></button>
