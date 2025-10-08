<script>
    import { get } from "svelte/store";
    import "$lib/css/global.scss";
    import "$lib/css/card.scss";

    let { card } = $props();
</script>

<a href="../card/{card.name}">
    <div id="card">
        <img
            src="https://cdn.statsroyale.com/v6/cards/full/{card.id}.png"
            alt=""
            srcset=""
        />
        <p>Level {card.level + (14 - card.maxLevel)}</p>
    </div>
</a>
