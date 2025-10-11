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
        >{player.name} {player.tag} Clash Royale profile | Royalty Statistics</title
    >
</svelte:head>

<main class="player">
    <br />
    <br />
    <div class="upper">
    <PlayerHead player = {player} code = {params.code} /></div>
    <div class="upper">
    {#if currentPage === "battles"}
        <h2>Battle Log</h2>
        {#each battlelog as battle}
            <Match match={battle} />
        {/each}
    {:else if currentPage === "cards"}
        <h2>Cards</h2>
        <p>Card collection coming soon...</p>
    {:else}
        <PlayerStats {player} />
    {/if}
    </div>
</main>

<style lang="scss">
    @use "src/lib/css/colors.scss" as theme;
    main.player {
        display: block !important;
        color: theme.$neutral-100;
    }
        .upper {
        border: 2px solid theme.$primary-400;
        border-top: 2px solid theme.$primary-300;
        padding: 1rem;
        border-radius: 8px;
        width: 60vw;
        margin: auto;
        background-color: theme.$primary-700;
    }
</style>
