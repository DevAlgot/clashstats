<script>
    import "$lib/css/global.scss";
    let searchTag = "";

    function searchPlayer() {
        if (searchTag.trim()) {
            window.location.href = `/player/${searchTag.trim().toUpperCase()}/profile`;
        }
    }
</script>

<main>
    <section>
        <h1>Clash Royale Stats</h1>
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
        <a href="/player/89PY22Q89/profile">Check birb's stats</a>
        <a href="/player/2ULJU2RQG/profile">Check out Carlo's stats</a>
        <a href="/player/RV08Y88/profile">Check out Linkan's stats</a>
    </section>
</main>

<style lang="scss">
    @use "src/lib/css/colors.scss" as *;
    @use "src/lib/css/global.scss" as *;

    main {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    section {
        h1 {
            font-size: 3rem;
            margin-bottom: 0.5rem;
            color: var(--neutral-200);
            text-shadow: 0 0 25px var(--primary-400);

            span {
                font-size: 1.5rem;
                color: gray;
            }
        }

        a {
            color: $primary-300;
        }
    }

    #search {
        @extend .pad0-mar0;
        display: flex;
        justify-content: center;
        width: 100%;
        box-shadow: 0 0 50px 0 #313180a8;
        overflow: hidden;
        border-radius: 0.5rem;

        input {
            @extend .border-none;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem 0 0 0.5rem;
            background: rgba(255, 255, 255, 0.1);
            color: $neutral-100;
            font-size: 1.1rem;
            transition: background 0.2s;

            &::placeholder {
                color: #ccc;
                opacity: 1;
            }

            flex-grow: 1;

            &:focus {
                outline: none;
            }
        }

        button {
            @extend .border-none;
            padding: 0.75rem 1.2rem;
            border-radius: 0 0.5rem 0.5rem 0;
            background: rgba(255, 255, 255, 0.18);
            color: white;
            font-size: 1.1rem;
            cursor: pointer;
            transition: background 0.2s;

            &:hover,
            &:focus {
                background: rgba(255, 255, 255, 0.28);
                outline: none;
            }
        }
    }
</style>
