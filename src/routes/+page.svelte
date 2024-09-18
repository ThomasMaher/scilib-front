<script>
    import { enhance } from '$app/forms'
    import { fly, slide } from 'svelte/transition'

    import Tab from './Tab.svelte'

    export let data;

    const colormap = ['#E6D3AA', '#cebd99', '#b9a987', '#a29475', '#9a8c6e']
</script>

<div class="main">
    <h3>Projects</h3>

    <div class="projects">
        <div class="projects_body">
            <div class="projects_tabs">
                {#if data.projects}
                    {#each data.projects as project, i}
                        <Tab title={project.title} color={colormap[i%colormap.length]} index={i*-1} />
                    {/each}
                {/if}

                <Tab title='Create New Project' color='white' index={-1*(1+colormap.length)} />
            </div>

            <div class="projects_face">
            </div>
        </div>
    </div>

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
</div>

<style>
    .main {
        text-align: center;
    }

    .projects {
        margin-top: 25px;
    }

    .projects_body {
        display: inline-block;
    }

    .projects_tabs {
        width: 850px;
        height: 45px;
        display: flex;
    }

    .projects_face {
        height: 500px;
        width: 850px;
        background: #E6D3AA;
        border: solid black 1px;
    }
</style>