<script>
    import { page } from "$app/state";
    import { get } from "svelte/store";
    import { round, getLevel, sortBy, rarityRank } from "$lib/utils";

    import "$lib/css/global.scss";
    import "$lib/css/player.scss";

    import PlayerStats from "$lib/components/Player/PlayerStats.svelte";
    import PlayerHead from "$lib/components/Player/PlayerHead.svelte";
    import Match from "$lib/components/Player/Match.svelte";

    export let data;
    export let params;

    // Now you can access data returned from +page.server.js via the `data` prop
    // For example:
    let player = data.profile;
    let battlelog = data.battlelog;

    let currentPage = params.page;

    console.log(player);

    //loss streak
    for (let battle of battlelog) {
        if (battle.team[0].crowns < battle.opponent[0].crowns) {
            //lost
        } else {
            //won
        }
    }
</script>

<svelte:head>
    <title
        >{player.name}
        {player.tag} Clash Royale profile | Royalty Statistics</title
    >
</svelte:head>

<main class="player">
    <br />
    <br />
    <div class="upper head">
        <PlayerHead {player} code={params.code} />
    </div>

    <div class="upper stats">
        <section id="overview">
            {#each battlelog as battle}
                {#if battle.team[0].crowns > battle.opponent[0].crowns}
                    <div class="win"></div>
                {:else if battle.team[0].crowns < battle.opponent[0].crowns}
                    <div class="lose"></div>
                {:else}
                    <div class="draw"></div>
                {/if}
            {/each}
        </section>
        {#each battlelog as battle, index (battle.battleTime)}
            <Match match={battle} />
        {/each}
    </div>
</main>

<style lang="scss">
    @use "src/lib/css/colors.scss" as theme;
    main.player {
        display: block !important;
        color: var(--neutral-100);
    }
    .upper {
        padding: 1rem;

        border-radius: 8px;
        width: 60vw;
        margin: auto;
        background-color: var(--primary-700);

        &.head {
            border-bottom: 0;
            border-radius: 8px 8px 0 0;
        }

        &.stats {
            border-bottom: 0;
            border-top: 0;
            border-radius: 0 0 8px 8px;
            background-color: var(--neutral-100);
            color: var(--neutral-900);
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1rem;
        }
    }

    #overview {
        display: inherit;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        flex-wrap: wrap;
        gap: 0.75rem;
        div {
            width: auto;
            aspect-ratio: 1/1;
            background-color: var(--accent-600);
            border-radius: 8px;
        }

        .lose {
            background-color: var(--lose-color);
        }

        .win {
            background-color: var(--win-color);
        }

        .draw {
            background-color: var(--neutral-400);
        }
    }

    @media (max-width: 1920px) {
        .upper {
            &.stats {
                grid-template-columns: repeat(1, minmax(0, 1fr));
            }
        }

        #overview {
            grid-template-columns: repeat(14, minmax(0, 1fr));
        }
    }
</style>
