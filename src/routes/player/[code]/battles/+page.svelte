<script>
    import { page } from "$app/state";
    import { get } from "svelte/store";
    import { round, getLevel, sortBy, rarityRank } from "$lib/utils";

    import "$lib/css/global.scss";
    import "$lib/css/player.scss";

    import PlayerStats from "$lib/components/PlayerStats.svelte";
    import PlayerHead from "$lib/components/PlayerHead.svelte";
    import Match from "$lib/components/Match.svelte";

    export let data;
    export let params;

    // Now you can access data returned from +page.server.js via the `data` prop
    // For example:
    let player = data.profile;
    let battlelog = data.battlelog;

    let currentPage = params.page;
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
        <h2>Battle Log</h2>
        {#each battlelog as battle, index (battle.battleTime)}
            <p>{index}</p>
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
            background-color: var(--neutral-200);
            color: var(--neutral-900);
        }
    }
</style>
