<script>
    let { player } = $props();
    import { roles, getArena } from "$lib/utils.js";
    import { get } from "svelte/store";

    let arena = getArena(player.arena.id, player.name);

    let arenaUrl = `/src/lib/assets/images/arenas/arena${arena}.png`;
    const playerUrl = `../player/${player.tag.replace("#", "")}`;
</script>

<section id="player">
    <div>
        <h3>
            <a aria-label="Player Profile" href={playerUrl}>{player.name}</a>
        </h3>
        <p>{roles[player.role]}</p>
    </div>
    <div id="arena">
        <img src={arenaUrl} alt="" />
        <p>{player.trophies}</p>
    </div>
</section>

<hr />

<style lang="scss">
    #player {
        display: flex;
        justify-content: space-between;
    }

    div {
    }
    img {
        width: auto;
        height: 80px;
        margin-bottom: 0.5rem;
        position: relative;
    }

    a {
        color: var(--accent-800);
        text-decoration: none;

        &:hover {
            text-decoration: underline;
            color: var(--accent-600);
        }
    }
</style>
