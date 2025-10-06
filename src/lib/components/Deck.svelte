<script>
    import { get } from "svelte/store";
    import "$lib/css/global.scss";
    import Card from "$lib/components/cards/Card.svelte";
    import EvoCard from "$lib/components/cards/EvoCard.svelte";

    let { currentDeck, cards, repeat, support } = $props();

    console.log(support);

    let supporters = {
        159000000:
            "https://game-assets.clashroyaleapp.com/97e7e4f5da14075417226853ec2c43591232cb64/image/chr_support_cards/support_card_hires_princess.png",
        159000001: "null",
        159000002:
            "https://game-assets.clashroyaleapp.com/97e7e4f5da14075417226853ec2c43591232cb64/image/chr_support_cards/support_card_hires_knives_thrower.png",
        159000003:
            "https://game-assets.clashroyaleapp.com/97e7e4f5da14075417226853ec2c43591232cb64/image/chr_support_cards/support_card_hires_royal_chef.png",
    };
</script>

<div class="deck-info">
    <div class="deck repeat{repeat}">
        <div class="support">
            <img src={supporters[support.id]} alt="" />
        </div>
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
        background-color: global.$primary-500;
        background-image: url("$lib/assets/wallpaper.jpg");
        background-size: cover;
        background-image:linear-gradient(#331347d2, global.$primary-500),url("$lib/assets/wallpaper.jpg");
    
        &.repeat8 {
            grid-template-columns: repeat(8, minmax(0, 1fr));
        }
        &.repeat4 {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .support {
            grid-column: 1 / span 8;
            margin-bottom: 10px;
            position: relative;
            height: 67px;

            img {
                height: 130px;
            }
        }
    }
</style>
