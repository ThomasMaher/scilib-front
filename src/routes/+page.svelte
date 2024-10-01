<script>
    import { enhance } from '$app/forms'
    import { fly, slide } from 'svelte/transition'
    import { fail } from '@sveltejs/kit'

    import Tab from './Tab.svelte'
    import {delete_project, create_project} from './landing_page_crud_funcs.js'

    export let data;
    export let form;

    let projects = data.projects
    let new_project_title = '';

    const colormap = ['#E6D3AA', '#cebd99', '#b9a987', '#a29475', '#9a8c6e']
    export let current_tab, current_paper, current_color;
    if(projects) {
        current_tab = projects[0].id
        current_paper = projects[0]
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
    let bottom_borders = projects.map(project => {
        if(project.id === current_tab) {
            return 'none'
        } else {
            return 'solid black 1px'
        }
    });
    bottom_borders.push('solid black 1px') // for 'new project' tab

    async function delete_and_remove_project(id) {
        let result = await delete_project(id)
        console.log(result)
        projects = result
        console.log(projects)
    }
</script>

<div class="main">
    <h3>Projects</h3>

    <div class="projects">
        <div class="projects_body">
            <div class="projects_tabs">
                {#if projects}
                    {#each projects as project, i (project.id) }
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
                        <div>Papers</div>
                        <div class="remove_button" on:click={() => projects = delete_and_remove_project(current_tab)}>Remove Project</div>
                    </div>
                    <div class="papers_list">
                        <ul>
                            {#each current_paper.papers as paper, i}
                                <li>
                                    <a href="/papers/{paper.id}" title={paper.content}>
                                        {paper.title} ({paper.year_published})
                                    </a>
                                    <p class="subtext">{paper.publisher}</p>
                                </li>
                            {/each}
                        </ul>
                    </div>
                {:else}
                    <div class="project_face-header">
                        Add a new project
                    </div>
                    <div class="create_form">
                        <input
                            type="text"
                            label="data"
                            placeholder="Project title.."
                            bind:value={new_project_title}
                            />
                        <input type="submit" on:click={() => create_project(new_project_title)} />
                    </div>
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
        padding-bottom: 18px;
    }

    a {
        text-overflow: ellipsis;
        text-decoration: underline;
        color: #0d3888;
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

    .project_face-header {
        margin-top: 20px;
        margin-bottom: 30px;
        font-size: 35px;
        text-align: left;
        padding-left: 40px;
        display: flex;
        justify-content: space-between;
    }

    .remove_button {
        font-size: 16px;
        margin-right: 20px;
        cursor: pointer;
        text-decoriation: underline;
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
        cursor: pointer;
    }

    p {
        margin-top: 6px;
        margin-bottom: 0;
        font-size: 12px;
    }

</style>