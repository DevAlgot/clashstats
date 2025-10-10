<script>
    import { page } from "$app/state";
    import { get } from "svelte/store";
    import { round, getLevel, sortBy, rarityRank } from "$lib/utils";

    import "$lib/css/global.scss";
    import "$lib/css/player.scss";

    import PlayerStats from "$lib/components/PlayerStats.svelte";
    import PlayerHead from "$lib/components/PlayerHead.svelte";

    let { data } = $props();
    data = data.data;
    console.log(data);
</script>

<svelte:head>
    <title
        >{data.name} {data.tag} Clash Royale profile | Royalty Statistics</title
    >
</svelte:head>

<main class="player">
    <br />
    <br />
    <PlayerHead {data} />
    <PlayerStats {data} />
</main>

<style lang="scss">
    @use "src/lib/css/colors.scss" as theme;
    main.player {
        display: block !important;
        color: theme.$neutral-100;
    }
</style>
