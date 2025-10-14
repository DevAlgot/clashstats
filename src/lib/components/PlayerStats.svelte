<script>
    import { round, getLevel, sortBy, rarityRank, sortCards } from "$lib/utils";

    import Deck from "$lib/components/Deck.svelte";
    import Card from "$lib/components/cards/Card.svelte";
    import EvoCard from "$lib/components/cards/EvoCard.svelte";
    import Level from "$lib/components/Level.svelte";

    let { player } = $props();

    // If you want a flat array of all cards (already in player.cards)
    let allCards = sortBy(player.cards, 0, false);
</script>

<div class="player-stats">
    <section>
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
    </section>
    <section>
        <div id="current-deck">
            <Deck
                style="margin-top: 20px"
                cards={allCards}
                currentDeck={player.currentDeck}
                repeat={8}
                support={player.currentDeckSupportCards[0]}
            />
        </div>
    </section>
    <section>
        <ul>
            <li><h3>General</h3></li>
            <li><h3>Goblin Arena</h3></li>
            <li><h3>Ranked</h3></li>
        </ul>
    </section>
    <section>
        <h2>Badges</h2>

        <ul id="badges">
            {#each player.badges as badge}
                {#if !badge.name.includes("Mastery")}
                    <li>
                        <div class="badge">
                            <div
                                class="badge-image"
                                style=" background-image: url({badge.iconUrls
                                    .large});"
                            ></div>
                            <p>{badge.name}</p>
                            <p class="level">
                                {badge.level}
                            </p>
                        </div>
                    </li>
                {/if}
            {/each}
        </ul>
    </section>
</div>

<style lang="scss">
    @use "src/lib/css/colors.scss" as global;
    @use "src/lib/css/global.scss" as *;

    .player-stats {
        section {
            border-bottom: 1px dotted var(--neutral-300);
        }

        #current-deck {
            @extend .shadow;
            border-radius: 15px;
        }
        ul {
            list-style: none;
            padding: 0;
            width: 100%;
            display: grid;
            grid-template-columns: repeat(6, minmax(0, 1fr));
            gap: 1rem;

            li {
                @extend .shadow;
                color: var(--neutral-800);
                background-size: cover;
                background-image: linear-gradient(
                        rgba(var(--primary-500), 0.85),
                        rgba(var(--primary-500), 1)
                    ),
                    url("$lib/assets/triangles.jpg");
                background-color: var(--neutral-300);

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

    .cards {
        margin-top: 1rem;
        color: var(--neutral-800);

        select {
            background-color: var(--accent-300);
            border: 1px solid var(--accent-600);
            border-top: 1px solid var(--accent-400);
            padding: 0.5rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            font-size: 1rem;
            color: var(--neutral-900);

            &:focus {
                outline: none;
            }

            option {
                background-color: var(--primary-900);
                color: var(--neutral-800);
            }
        }
    }

    #badges {
        grid-template-columns: repeat(6, (minmax(0, 1fr)));

        li {
            padding-top: 0;
            background-image: linear-gradient(
                0deg,
                var(--primary-300) 0%,
                var(--accent-200) 100%
            );
            border: 2px solid var(--primary-300);
        }

        .badge {
            display: flex;
            align-content: center;
            align-items: center;
            align-self: center;
            justify-content: center;
            flex-wrap: wrap;

            .badge-image {
                width: 100%;
                height: 10vw;
                margin-top: -16px;
                background-size: cover;
                background-position: center;
                filter: drop-shadow(0px 4px 3px var(--primary-400));
            }

            .level {
                width: 100%;
                text-align: center;
                backdrop-filter: brightness(0.9);
                box-shadow: 0px 3px 4px var(--primary-200) inset;
                border-radius: 8px;
                border-bottom: 1px solid var(--primary-400);
                color: black;
                text-shadow: 0 0 3px white;
            }

            p {
                @extend .pad0-mar0;
            }
        }
    }
</style>
