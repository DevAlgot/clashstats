<script>
    import { get } from "svelte/store";
    import "$lib/css/global.scss";
    import "$lib/css/card.scss";
    import { getLevel } from "$lib/utils";

    let { card } = $props();

    let cardImage = `/src/lib/assets/images/cards/card${card.id + 10000000}_evo.png`;
</script>

<a href="../card/{card.name}">
    <div id="card">
        <img src={cardImage} alt="" srcset="" />
        <p>Level {getLevel(card)}</p>
    </div>
</a>

<style lange="scss">
</style>
