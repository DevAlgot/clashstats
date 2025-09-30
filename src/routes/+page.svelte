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
    <h1>Welcome to Clash Royale Stats</h1>
    <p>This is a basic Svelte page. Customize it as you like!</p>

    <input
        type="text"
        placeholder="Enter player tag..."
        autocomplete="username"
        bind:value={searchTag}
        on:keydown={(e) => {
            if (e.key === "Enter") searchPlayer();
        }}
        style="margin-bottom: 1rem;"
    />
    <button on:click={searchPlayer}>Search</button>

    <a href="/player/89PY22Q89">Check birb's stats</a>
    <a href="/player/2ULJU2RQG">Check out Carlo's stats</a>
    <a href="/player/RV08Y88">Check out Linkan's stats</a>
</main>
