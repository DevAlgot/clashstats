<script>
    let { player, opponent } = $props();

    let badgeId = $state(0);
    if (player.clan != null) badgeId = player.clan.badgeId;
</script>

<section class="{opponent ? 'opponent' : 'team'} stats">
    <h2>
        <a href="/player/{player.tag.replace('#', '')}">{player.name}</a>
    </h2>
    <h3>
        <img
            src="https://cdn.statsroyale.com/images/badges/{badgeId}.png"
            alt=""
        />
        <a href="/clan/{player?.clan?.tag}">
            {player?.clan?.name ? player.clan.name : "No clan"}
        </a>
    </h3>
    <section class="postTrophies">
        <p class="trophies">
            {player.startingTrophies + player.trophyChange}
        </p>

        <div class="deltaTrophies {player.trophyChange > 0 ? 'win' : 'lose'}">
            <p>{player.startingTrophies}</p>

            {#if player.trophyChange > 0}
                <p>+</p>
            {:else if player.trophyChange === 0}
                <p>▬</p>
            {/if}
            <p>{player.trophyChange}</p>
        </div>
    </section>
</section>

<style lang="scss">
    .stats {
        margin-bottom: 0.6rem;
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
    }

    .opponent {
        align-items: end;

        h3 {
            flex-direction: row-reverse;
        }
    }

    a {
        color: var(--neutral-900);

        &:hover {
            color: var(--primary-400);
        }
    }

    h3 {
        display: flex;
        align-items: center;
        font-size: smaller;
        font-weight: 500;
        gap: 0.4rem;

        img {
            width: 20px;
        }
    }

    .postTrophies {
        display: flex;
        align-items: center;
        gap: 0.2rem;
        font-size: small;

        p {
            margin: 0;
        }

        .deltaTrophies {
            padding: 0.2rem;
            display: flex;
            border-radius: 4px;
            &.win {
                border: 2px solid var(--accent-400);
            }
            &.lose {
                border: 2px solid red;
            }
        }
    }
</style>
