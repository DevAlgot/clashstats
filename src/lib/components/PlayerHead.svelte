<script>
    let { data, code, player, params } = $props();
    import { roles } from "$lib/utils";
    import { page } from "$app/state";

    let urlToFavorite = player.currentFavouriteCard.name
        .replace(/\s+/g, "_")
        .toLowerCase();

    let arena = player.arena.id - (54000000 - 3);
    let style = $state("");
    if (player.arena.id == 54000031) {
        arena = 24;
        style = `
            width: 169px;
            right: -1px;
            bottom: 0;
        `;
    }
    if (player.arena.id == 54000020) {
        style = `
            width: 141px;
            right: -1px;
            bottom: 0;
        `;
    }

    console.log(page.url.pathname === "/player/" + code + "/cards");
    let arenaUrl = `/src/lib/assets/images/arenas/arena${arena}.png`;
</script>

<section class="header">
    <section id="player-info">
        <h1 class="name">{player.name}</h1>
        <p class="tag">{player.tag}</p>
        <div id="clan">
            <img
                src="https://cdn.statsroyale.com/images/badges/{player?.clan
                    ?.badgeId}.png"
                alt=""
            />
            <p>
                <a href="">{player?.clan?.name ?? "No clan"}</a> | {roles?.[
                    player?.role
                ] ?? ""}
            </p>
        </div>
    </section>

    <img id="arena" src={arenaUrl} {style} alt="" />
</section>
<div id="nav">
    {#if page.url.pathname == "/player/" + code}
        <a href="./">Profile</a><a href="{code}/battles">Battles</a><a
            href="{code}/cards">Cards</a
        >
    {:else if page.url.pathname == "/player/" + code + "/battles"}
        <a href="./">Profile</a><a href="./">Battles</a><a href="cards">Cards</a
        >
    {:else if page.url.pathname == "/player/" + code + "/cards"}
        <a href="./">Profile</a><a href="battles">Battles</a><a href="">Cards</a
        >
    {/if}
</div>

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
        margin-bottom: -1rem;
        border-radius: 8px 8px 0 0;
        padding: 1rem;
        margin-bottom: 1rem;
        background-color: var(--primary-800);
        height: 160px;
        color: var(--neutral-100);

        #favorite,
        #arena {
            width: 362px;
            height: auto;
            float: right;
            margin: 0 auto;
            bottom: -25px;
            position: absolute;
        }

        #arena {
            width: 200px;
            right: -18px;
            bottom: -0;
        }

        #favorite {
            display: none;
            right: 50%;
            transform: translateX(50%);
        }

        #player-info {
            #clan {
                display: flex;
                align-items: center;
                gap: 0.5rem;

                p {
                    color: var(--accent-100);
                    a {
                        color: var(--accent-300);
                        text-decoration: none;
                    }
                }
                img {
                    height: 40px;
                    width: auto;
                }
            }
        }
    }

    #nav {
        margin: -1rem;
        background-color: var(--primary-700);
        border-top: 1px solid var(--primary-400);
        border-right: 0;
        border-left: 0;
        padding: 1rem 0 1rem 0;
        white-space: nowrap;

        a {
            display: inline;
            text-decoration: none;

            padding: 1rem;
            cursor: pointer;

            color: var(--neutral-200);
            border-right: 1px solid var(--primary-200);

            &:hover {
                background-color: var(--primary-400);
                color: var(--neutral-100);
            }
        }
    }
</style>
