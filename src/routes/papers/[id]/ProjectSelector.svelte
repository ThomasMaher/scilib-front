<script>
    export let paper_projects;
    export let toggleProject;
</script>

<aside>
    <h3>Select annotations to see:</h3>
        <ul>
            <li>
                <label>
                    <input value='unassigned' type="checkbox" on:click={toggleProject} checked/>
                    Unassigned Annotations
                </label>
            </li>
            {#if paper_projects.length}
                {#each paper_projects as { id, title, checked }}
                    <li>
                        <label>
                            <input
                                type="checkbox"
                                value={id}
                                on:click={toggleProject}
                            />
                            {title}
                        </label>
                    </li>
                {/each}
            {:else}
                <p>this paper has not been added to any specific projects yet.</p>
            {/if}
        </ul>
</aside>

<style>
    aside {
        margin-top: 5rem;
    }

    ul {
        padding-left: 15px;
    }

    li {
        list-style: none;
    }
</style>