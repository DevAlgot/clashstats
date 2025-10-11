<script>
    // Sort cards within each level group by rarity and then name
    import { sortBy } from "$lib/utils.js";
    import Deck from "$lib/components/Deck.svelte";
    import Level from "$lib/components/Level.svelte";
    import { rarityRank, getAvrageLevel, round } from "$lib/utils.js";
    import { get } from "svelte/store";

    let { match } = $props();

    let deltaLevel = round(
        getAvrageLevel(match.team[0].cards) -
            getAvrageLevel(match.opponent[0].cards),
        1,
    );
</script>

<div class="match">
    <section class="postTrophies">
        <p class="trophies">
            {match.team[0].startingTrophies + match.team[0].trophyChange}
        </p>

        <div class="deltaTrophies">
            <p>{match.team[0].startingTrophies}</p>

            {#if match.team[0].trophyChange > 0}
                <p>+</p>
            {:else if match.team[0].trophyChange === 0}
                <p>▬</p>
            {/if}
            <p>{match.team[0].trophyChange}</p>
        </div>
    </section>

    <p>&Delta;Lvl: {deltaLevel}</p>
    <div class="info">
    <p>{match.type}</p>
    <p>{match.gameMode.name}</p>
    </div>
    <section class="decks">
        <Deck
            currentDeck={match.team[0].cards}
            support={match.team[0].supportCards[0]}
            title="Your Deck"
            repeat={4}
        />
        <Deck
            currentDeck={match.opponent[0].cards}
            support={match.opponent[0].supportCards[0]}
            title="Opponent's Deck"
            repeat={4}
        />
    </section>
</div>

<style lang="scss">
    @use "src/lib/css/colors.scss" as theme;

    .match {
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1rem;
        background-color: theme.$primary-600;
        .trophies {
            margin: 0;
            font-weight: bold;
            margin-right: 0.5rem !important;
        }

        .postTrophies {
            display: flex;
            align-items: center;

            p {
                margin: 0;
            }

            .deltaTrophies {
                padding: 0.25rem;
                display: flex;
                background-color: theme.$neutral-800;
                border-radius: 3px;
            }
        }

        .info {
            text-align: center;
            gap: 1rem;
            p {
                margin: 0;
            }
        }
    }

    .decks {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        gap: .6rem;

        #separator {
            width: 7px;
            height: inherit;
            background-color: theme.$neutral-700;
            align-self: stretch;
            border-radius: 10px;
        }
    }
</style>
