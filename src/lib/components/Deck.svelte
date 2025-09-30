<script>
    import { get } from "svelte/store";
    import "$lib/css/global.scss";

    let { currentDeck } = $props();
</script>

<div class="deck-info">
    <div class="deck">
        {#each currentDeck as card}
            <img src={card.iconUrls.medium} alt="" srcset="" />
        {/each}
    </div>
</div>

<style lang="scss">
    .deck-info {
        text-align: center;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }

    .deck {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        box-shadow: inset #a4a4a4 0 0 8px 0;
        border-radius: 15px;
        padding: 0 9px;

        img {
            width: 100%;
            height: auto;
            border-radius: 8px;
        }
    }
</style>
