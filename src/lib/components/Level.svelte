<script>
    import { get } from "svelte/store";
    import "$lib/css/global.scss";
    import "$lib/css/card.scss";

    import Card from "./cards/Card.svelte";
    import EvoCard from "./cards/EvoCard.svelte";

    let { cards } = $props();
</script>

<div>
    <h2>Level {cards[0].level + (14 - cards[0].maxLevel)}</h2>
    <div class="cards">
        {#each cards as card}
            {#if card.evolutionLevel != null}
                <EvoCard {card}></EvoCard>
            {:else}
                <Card {card}></Card>
            {/if}
        {/each}
    </div>
</div>

<style lang="scss">
    .cards {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
    }
</style>
