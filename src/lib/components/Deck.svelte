<script>
    import { get } from "svelte/store";
    import "$lib/css/global.scss";
    import Card from "$lib/components/cards/Card.svelte";
    import EvoCard from "$lib/components/cards/EvoCard.svelte";

    let { currentDeck } = $props();
</script>

<div class="deck-info">
    <div class="deck">
        {#each currentDeck as card}
            {#if currentDeck[0] == card || currentDeck[1] == card}
                <EvoCard {card}></EvoCard>
            {:else}
                <Card {card}></Card>
            {/if}
        {/each}
    </div>
</div>

<style lang="scss">
    .deck-info {
        text-align: center;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: inherit;
    }

    .deck {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        box-shadow: inset #a4a4a4 0 0 8px 0;
        border-radius: 15px;
        padding: 0 9px;
    }
</style>
