<script>
    import "$lib/css/global.scss";
    import "$lib/css/player.scss";

    let { data } = $props();
    console.log(data.data);
</script>

<main class="player">
    <br />
    <br />
    <div id="upper">
        <section class="header">
            <h1 class="name"></h1>
            <p class="tag"></p>
        </section>
        <div id="nav">
            <a href="profile">Profile</a><a href="battles">Battles</a><a
                href="cards">Cards</a
            >
        </div>
    </div>
</main>

<style lang="scss">
    @use "src/lib/css/colors.scss" as theme;
    .name {
        margin: 0;
        font-size: xx-large;
    }
    .tag {
        font-family: monospace;
        margin: 0;
        margin-top: 0;
    }
    .header {
        position: relative;
        margin: -1rem;
        border-radius: 8px 8px 0 0;
        padding: 1rem;
        margin-bottom: 1rem;
        background-color: theme.$primary-500;
        height: 160px;

        img {
            width: 362px;
            height: auto;
            float: right;
            margin: 0 auto;
            bottom: -16%;
            position: absolute;
            right: -16px;
        }
    }

    #nav {
        margin: -1rem;

        background-color: theme.$primary-500;
        border: 1px solid theme.$primary-400;
        border-top: 1px solid theme.$primary-300;

        border-right: 0;
        border-left: 0;

        margin-bottom: 2rem;
        padding: 1rem 0 1rem 0;

        white-space: nowrap;

        a {
            display: inline;
            text-decoration: none;

            padding: 1rem;
            cursor: pointer;

            color: theme.$neutral-100;
            border-right: 1px solid theme.$primary-300;

            &:hover {
                background-color: theme.$primary-400;
            }
        }
    }
</style>
