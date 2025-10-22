<script>
    // Sort cards within each level group by rarity and then name
    import { sortBy } from "$lib/utils.js";
    import Deck from "$lib/components/Deck.svelte";
    import Level from "$lib/components/Level.svelte";
    import PlayerMatch from "$lib/components/PlayerMatch.svelte";
    import {
        rarityRank,
        getAvrageLevel,
        round,
        getTimeAgo,
    } from "$lib/utils.js";
    import { get } from "svelte/store";

    import redCrown from "$lib/assets/red-crown.png";
    import blueCrown from "$lib/assets/blue-crown.png";

    let { match } = $props();

    const now = new Date();

    let deltaLevel = round(
        getAvrageLevel(match.team[0].cards) -
            getAvrageLevel(match.opponent[0].cards),
        1,
    );

    let year = match.battleTime.substring(0, 4);
    let month = match.battleTime.substring(4, 6);
    let day = match.battleTime.substring(6, 8);

    let hour = parseInt(match.battleTime.substring(9, 11)) + 2;
    let minute = match.battleTime.substring(11, 13);
    let second = match.battleTime.substring(13, 15);

    const battleTime = new Date(year, month, day, hour, minute, second);

    let date =
        year +
        "-" +
        month +
        "-" +
        day +
        "  " +
        hour +
        ":" +
        minute +
        ":" +
        second;
</script>

<div class="match">
    <div class="info">
        <h3>{match.gameMode.name}</h3>
        <div>
            <img src={blueCrown} alt="" />
            <p>{match.team[0].crowns} - {match.opponent[0].crowns}</p>
            <img src={redCrown} alt="" />
        </div>
    </div>

    <section class="decks">
        <section class="team">
            <PlayerMatch player={match.team[0]}></PlayerMatch>
            <Deck
                currentDeck={match.team[0].cards}
                support={match.team[0].supportCards[0]}
                title="Your Deck"
                repeat={4}
            />
        </section>
        <div id="middle">
            <p>vs</p>
            <div id="separator"></div>
        </div>
        <section class="opponent">
            <PlayerMatch player={match.opponent[0]} opponent={true}
            ></PlayerMatch>
            <Deck
                currentDeck={match.opponent[0].cards}
                support={match.opponent[0].supportCards[0]}
                title="Opponent's Deck"
                repeat={4}
                opponent={true}
            />
        </section>
    </section>
    <div id="bottom">
        <p>&Delta;Lvl: {deltaLevel}</p>
        <section id="time">
            <p>{getTimeAgo(match.battleTime)}</p>
            <div id="tooltip">{date}</div>
        </section>
    </div>
</div>

<style lang="scss">
    @use "src/lib/css/colors.scss" as *;
    @use "src/lib/css/global.scss" as *;

    .match {
        @extend .shadow;
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1rem;
        background-color: var(--neutral-100);
        .trophies {
            margin: 0;
            font-weight: bold;
            margin-right: 0.5rem !important;
        }

        p {
            margin: 0;
        }
    }

    .decks {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        gap: 0.6rem;

        #middle {
            display: flex;
            flex-direction: column;
            align-self: stretch;
            align-items: center;
            color: var(--neutral-600);

            #separator {
                width: 1px;
                height: 100%;
                background-color: var(--neutral-400);
                align-self: stretch;
                border-radius: 10px;
                margin: auto;
            }
        }
    }
    .info {
        text-align: center;
        gap: 1rem;
        p {
            margin: 0;
        }

        div{
            display: flex;
            align-items: center;
            justify-content: center;

            img{
                width: 50px;
            }
        }


    }

    #bottom {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: var(--neutral-700);

        #time {
            #tooltip {
                opacity: 0;
                position: absolute;
                top: -120%;
                right: 0;
                transform: translate(25%, -50%) scale(0.6);
                background-color: var(--neutral-200);
                box-shadow: 0 0 3px 0 var(--neutral-500);
                padding: 0.75rem;
                border-radius: 5px;
                transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
                pointer-events: none;
            }

            &:hover #tooltip {
                opacity: 1;
                transform: scale(1) translate(25%, -50%);
                pointer-events: all;
            }
        }
    }
</style>
