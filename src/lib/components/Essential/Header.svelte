<script>
    let isDark =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    function toggleDark() {
        isDark = !isDark;
        console.log(isDark);
        document.body.classList.toggle("dark", isDark);
    }
</script>

<header>
    <h2><a href="./">Royalty Statistics</a></h2>
    <button on:click={() => toggleDark()}>Dark mode</button>
</header>

<style lang="scss">
    header {
        position: sticky;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: var(--static-primary-700);
        border-radius: 8px 8px 0 0;
        color: var(--static-neutral-100);

        h2 {
            margin: 0;
        }

        button {
            background-color: var(--static-primary-500);
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            color: var(--static-neutral-100);
            cursor: pointer;

            &:hover {
                background-color: var(--static-primary-400);
            }
        }
    }
</style>
