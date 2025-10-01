<script>
    import { get } from "svelte/store";
    import "$lib/css/global.scss";
    import "$lib/css/card.scss";

    let { card } = $props();
</script>

<div id="card">
    <img
        src="https://cdn.statsroyale.com/v6/cards/full/{card.id +
            10000000}_active.png"
        alt=""
        srcset=""
    />
    <p>Level {card.level + (14 - card.maxLevel)}</p>
</div>

<style lange="scss">
    #card {
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
            left: 50%;
            bottom: 13.5%;
            transform: translate(-50%, 0);
            font-size: 12px;
            font-weight: bold;
            width: 100%;
            text-align: center;
        }
    }
</style>
