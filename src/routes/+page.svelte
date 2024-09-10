<script>
    import { enhance } from '$app/forms'
    import { fly, slide } from 'svelte/transition'

    export let data;
</script>

<h1>Welcome to Scilib</h1>

<h3>Projects:</h3>

<ul>
    {#if data.projects}
        {#each data.projects as project}
            <li><a href="/projects/{project.id}" in:fly={{ y: 20 }} out:slide>
                {project.title}
            </a></li>
            <form method="POST" action="projects/?/delete" use:enhance>
                <input type="hidden" name="id" value={project.id} />
                <button value="Delete">Delete</button>
            </form>
        {/each}
    {/if}
</ul>