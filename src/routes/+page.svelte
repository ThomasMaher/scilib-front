<script>
    import { enhance } from '$app/forms'
    import { fly, slide } from 'svelte/transition'

    import Tab from './Tab.svelte'

    export let data;

    const colormap = ['#E6D3AA', '#cebd99', '#b9a987', '#a29475', '#9a8c6e']
    export let current_tab, current_paper, current_color;
    if(data.projects) {
        current_tab = data.projects[0].id
        current_paper = data.projects[0]
        current_color = colormap[0]
    }
    function set_current_tab(project, color, i) {
        bottom_borders = bottom_borders.map((_x => 'solid black 1px'))
        if(!project) {
          current_tab = null
          current_paper = null
          current_color = 'white'
          bottom_borders[-1] = 'none'
        } else {
            if(project.id === current_tab) { return }

            current_tab = project.id
            current_paper = project
            current_color = color
            bottom_borders[i] = 'none'
        }
    }
    let bottom_borders = data.projects.map(project => {
        if(project.id === current_tab) {
            return 'none'
        } else {
            return 'solid black 1px'
        }
    });
    console.log(bottom_borders)
    bottom_borders.push('solid black 1px') // for 'new project' tab
</script>

<div class="main">
    <h3>Projects</h3>

    <div class="projects">
        <div class="projects_body">
            <div class="projects_tabs">
                {#if data.projects}
                    {#each data.projects as project, i (project.id) }
                        <div
                            class="tab"
                            style="--color:{colormap[i%colormap.length]};border-bottom:{bottom_borders[i]}"
                            on:click={() => set_current_tab(project, colormap[i%colormap.length], i)}
                        >
                            <p>{project.title}</p>
                        </div>

                    {/each}
                {/if}

                <Tab
                    title='Create New Project'
                    color='white'
                    clicked={() => set_current_tab(null, 'white', -1)}
                    border_bottom={'none'} />
            </div>

            <div class="projects_face" style="--current_color:{current_color}">
                {#if current_tab}
                    <div class="project_face-header">
                    </div>
                    <div class="papers_list">
                        <ul>
                            {#each current_paper.papers as paper, i}
                                <li><a href="/papers/{paper.id}">{paper.title}</a></li>
                            {/each}
                        </ul>
                    </div>
                {:else}
                    Add a new project
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    ul {
        list-style: none;
    }

    li {
        padding-bottom: 24px;
    }

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
        background: var(--current_color);
        border: solid black 1px;
    }

    .projects_face-header {
        hieght: 80px;
    }

    .papers_list {
        text-align: left;
    }

    .tab {
        background: var(--color);
        border-radius: 5px 5px 0 0;
        height: 100%;
        width: 12%;
        border: solid black 1px;
    }

    p {
        margin-top: 6px;
        margin-bottom: 0;
        font-size: 12px;
    }

</style>