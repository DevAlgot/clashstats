<script>
    import { get } from "svelte/store";
    import "$lib/css/global.scss";
    import "$lib/css/card.scss";

    import Card from "$lib/components/cards/Card.svelte";
    import EvoCard from "$lib/components/cards/EvoCard.svelte";
    import { getLevel } from "$lib/utils";

    let { cards } = $props();
</script>

<div>
    {#if getLevel(cards[0]) < 15}
        <h2>Level {getLevel(cards[0])}</h2>
    {:else}
        <h2>Elite</h2>
    {/if}
    <div class="cards">
        {#each cards as card}
            {#key card.id}
                {#if card.evolutionLevel != null}
                    <EvoCard {card}></EvoCard>
                {:else if card.maxEvolutionLevel != null}
                    <Card {card}></Card>
                {:else}
                    <Card {card}></Card>
                {/if}
            {/key}
        {/each}
    </div>
</div>

<style lang="scss">
    .cards {
        display: grid !important;
        grid-template-columns: repeat(12, minmax(0, 1fr));
    }

    h2 {
        margin: 10px 0 5px 0;
    }
</style>
