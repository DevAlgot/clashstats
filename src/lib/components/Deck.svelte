<script>
    import { get } from "svelte/store";
    import "$lib/css/global.scss";
    import Card from "$lib/components/cards/Card.svelte";
    import EvoCard from "$lib/components/cards/EvoCard.svelte";

    let { currentDeck, cards, repeat } = $props();
</script>

<div class="deck-info">
    <div class="deck repeat{repeat}">
        {#each currentDeck as card}
            {#if currentDeck[0] == card || currentDeck[1] == card}
                {#if card.evolutionLevel != null}
                    <EvoCard {card}></EvoCard>
                {:else}
                    <Card {card}></Card>
                {/if}
            {:else}
                <Card {card}></Card>
            {/if}
        {/each}
    </div>
</div>

<style lang="scss" global>
    @use "src/lib/css/global.scss" as global;

    .deck-info {
        text-align: center;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: inherit;
    }

    .deck {
        display: grid;
        border: 1px solid global.$primary-400;
        border-top: 1px solid global.$primary-300;
        border-radius: 15px;
        padding: 15px 9px 0px 9px;
        &.repeat8 {
            grid-template-columns: repeat(8, minmax(0, 1fr));
        }
        &.repeat4 {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }
    }
</style>
