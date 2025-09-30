<script>
    import { page } from "$app/state";
    import { get } from "svelte/store";
    import "$lib/css/global.scss";
    import Deck from "$lib/components/Deck.svelte";

    let { data } = $props();
    data = data.data;
    console.log(data);
</script>

<h1>{data.name}'s statistics</h1>
<div class="player-stats">
    <ul>
        <li><strong>Name:</strong> {data.name}</li>
        <li><strong>Tag:</strong> {data.tag}</li>
        <li><strong>Trophies:</strong> {data.trophies}</li>
        <li><strong>Clan:</strong> {data.clan.name}</li>
        <li><strong>Level:</strong> {data.level}</li>
        <li><strong>Wins:</strong> {data.wins}</li>
        <li><strong>Losses:</strong> {data.losses}</li>
    </ul>
    <div id="current-deck">
        <Deck currentDeck={data.currentDeck} />
    </div>
</div>

<style>
    .player-stats {
        background: #f4f4f4;
        padding: 1rem;
        border-radius: 8px;
        max-width: 60vw;
        margin: auto;
        display: flex;
        justify-content: space-between;

        ul {
            list-style: none;
            padding: 0;
            max-width: 45%;
            display: inline-block;
        }
    }
    .player-stats p {
        margin: 0.5rem 0;
    }

    #current-deck {
        max-width: 45%;
    }
</style>
