<script>
    import { get } from "svelte/store";
    import "$lib/css/global.scss";
    import "$lib/css/card.scss";

    import Card from "./cards/Card.svelte";
    import EvoCard from "./cards/EvoCard.svelte";

    let { cards } = $props();
</script>

<div>
    <h2>Level {cards[0].level + (14- cards[0].maxLevel)}</h2>
    <div class="cards">
        {#each cards as card}
            <Card {card}></Card>
        {/each}
    </div>
</div>