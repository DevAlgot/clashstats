<script>
    import { get } from "svelte/store";
    import "$lib/css/global.scss";

    let { currentDeck } = $props();
</script>

<div class="deck-info">
    <div class="deck">
        {#each currentDeck as card}
            <div class="card">
                {#if card == currentDeck[0] || card == currentDeck[1]}
                    <img
                        src="https://cdn.statsroyale.com/v6/cards/small/{card.id +
                            10000000}_active.png"
                        alt=""
                        srcset=""
                    />
                {:else}
                    <img
                        src="https://cdn.statsroyale.com/v6/cards/small/{card.id}.png"
                        alt=""
                        srcset=""
                    />
                {/if}
                <p>Level {card.level + (14 - card.maxLevel)}</p>
            </div>
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

        .card {
            position: relative;
            img {
                width: 100%;
                height: auto;
                border-radius: 8px;
                position: relative;
            }

            p {
                margin: 0;
                position: absolute;
                bottom: -19%;
                left: 50%;
                bottom: 2px;
                transform: translate(-50%, -100%);
                font-size: 12px;
                font-weight: bold;
            }
        }
    }
</style>
