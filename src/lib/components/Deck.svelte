<script>
    import { get } from "svelte/store";
    import { getLevel, round } from "$lib/utils.js";

    import "$lib/css/global.scss";

    import Card from "$lib/components/cards/Card.svelte";
    import EvoCard from "$lib/components/cards/EvoCard.svelte";

    let { currentDeck, cards, repeat, support } = $props();

    console.log(support);

    //support cards, defiened to easier get the image.
    let supporters = {
        159000000:
            "https://game-assets.clashroyaleapp.com/97e7e4f5da14075417226853ec2c43591232cb64/image/chr_support_cards/support_card_hires_princess.png",
        159000001:
            "https://game-assets.clashroyaleapp.com/97e7e4f5da14075417226853ec2c43591232cb64/image/chr_support_cards/support_card_hires_cannoneer.png",
        159000002:
            "https://game-assets.clashroyaleapp.com/97e7e4f5da14075417226853ec2c43591232cb64/image/chr_support_cards/support_card_hires_knives_thrower.png",
        159000003:
            "https://game-assets.clashroyaleapp.com/97e7e4f5da14075417226853ec2c43591232cb64/image/chr_support_cards/support_card_hires_royal_chef.png",
    };

    let sum = $state(0);
    let elixir = $state(0);

    for (let i = 0; i < currentDeck.length; i++) {
        sum += getLevel(currentDeck[i]); //grab the level of the card
        elixir += currentDeck[i].elixirCost; // and the elixir cost
    }

    // svelte-ignore state_referenced_locally
    let avgLevel = round(sum / currentDeck.length, 1);
    // svelte-ignore state_referenced_locally
    let avgElixir = round(elixir / currentDeck.length, 1);
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
        <p>Avrage Level: {avgLevel}</p>
        <p>Avrage Elixir: {avgElixir}</p>
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
        background-image: linear-gradient(#331347d2, global.$primary-500),
            url("$lib/assets/wallpaper.jpg");

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
                mask-image: linear-gradient(black 67%, transparent 86%);
            }
        }
    }
</style>
