<script>
    import "$lib/css/global.scss";
    let searchTag = "";

    function searchPlayer() {
        if (searchTag.trim()) {
            window.location.href = `/player/${searchTag.trim().toUpperCase()}`;
        }
    }
</script>

<main>
    <section>
        <h1>Clash Royale Stats</h1>
        <canvas id="starfield"></canvas>

        <div id="search">
            <input
                type="text"
                placeholder="Enter player tag..."
                autocomplete="on"
                list="player-tags"
                bind:value={searchTag}
                on:keydown={(e) => {
                    if (e.key === "Enter") searchPlayer();
                }}
            />
            <button on:click={searchPlayer}>Search</button>
        </div>
        <br />
        <a href="/player/89PY22Q89">Check birb's stats</a>
        <a href="/player/2ULJU2RQG">Check out Carlo's stats</a>
        <a href="/player/RV08Y88">Check out Linkan's stats</a>
    </section>
</main>
