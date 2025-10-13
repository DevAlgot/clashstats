<script>
    import { round, getLevel, sortBy, rarityRank, sortCards } from "$lib/utils";

    import Deck from "$lib/components/Deck.svelte";
    import Card from "$lib/components/cards/Card.svelte";
    import EvoCard from "$lib/components/cards/EvoCard.svelte";
    import Level from "$lib/components/Level.svelte";

    let { player } = $props();

    let cardsByLevel = {};

    // Group cards by their level
    for (let card of player.cards) {
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

    // If you want a flat array of all cards (already in player.cards)
    let allCards = sortBy(player.cards, 0, false);
</script>

<div class="player-stats">
    <ul>
        <li>
            <h2><strong>Trophies:</strong></h2>
            <p>{player.trophies}</p>
        </li>
        <li>
            <h2><strong>Clan:</strong></h2>
            <p>{player.clan ? player.clan.name : "No clan"}</p>
        </li>
        <li>
            <h2><strong>Level:</strong></h2>
            <p>{player.expLevel}</p>
        </li>
        <li>
            <h2><strong>Wins:</strong></h2>
            <p>{player.wins}</p>
        </li>
        <li>
            <h2><strong>Losses:</strong></h2>
            <p>{player.losses}</p>
        </li>
        <li>
            <h2><strong>Favorite card:</strong></h2>
            <p>
                {player.currentFavouriteCard.name}
            </p>
            <!---->
        </li>
    </ul>
    <div id="current-deck">
        <Deck
            cards={allCards}
            currentDeck={player.currentDeck}
            repeat={8}
            support={player.currentDeckSupportCards[0]}
        />
    </div>
</div>
<select name="sort" id="" onchange={(e) => sortCards(e, cardsGroupedByLevel)}>
    <option value="rarity-asc">Rarity Ascending</option>
    <option value="rarity-desc">Rarity Descending</option>
    <option value="elixir-asc">Elixir Ascending</option>
    <option value="elixir-desc">Elixir Descending</option>
    <option value="evo-asc">Evolution Ascending</option>
    <option value="evo-desc">Evolution Descending</option>
</select>
<section class="cards">
    {#each cardsGroupedByLevel as levelCards}
        <Level cards={levelCards}></Level>
    {/each}
</section>

<style lang="scss">
    @use "src/lib/css/colors.scss" as global;
    .player-stats {
        ul {
            list-style: none;
            padding: 0;
            width: 100%;
            display: grid;
            grid-template-columns: repeat(6, minmax(0, 1fr));
            gap: 1rem;

            li {
                color: var(--neutral-100);
                background-size: cover;
                background-image: linear-gradient(
                        rgba(var(--primary-500), 0.85),
                        rgba(var(--primary-500), 1)
                    ),
                    url("$lib/assets/triangles.jpg");
                background-color: var(--primary-500);

                border: var(--primary-400 1px solid);
                border-top: var(--primary-300 1px solid);
                aspect-ratio: 1/1;
                border-radius: 15px;
                padding: 1rem;

                .spacer {
                    border-bottom: 1px solid var(--neutral-600);
                    width: 100%;
                    flex: 1;
                    margin: 0 5px 5px 5px;
                }
            }
        }
    }
</style>
