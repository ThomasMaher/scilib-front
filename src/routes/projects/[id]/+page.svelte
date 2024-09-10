<script>
    export let data;
    console.log(data)
</script>

<div>
    {#if data.project}
        <h1>{data.project.title}</h1>
    {:else}
        <h1>No paper found</h1>
    {/if}

    <ul>
        {#each data.project?.papers as paper}
            <li>
                <a href="/papers/{paper.id}">{paper.title}</a> {paper.year_published}
            </li>
        {/each}
    </ul>
</div>