<script>
    import { enhance } from '$app/forms'
    import { fly, slide } from 'svelte/transition'
    import { fail } from '@sveltejs/kit'

    import Tab from './Tab.svelte'
    import {delete_project, create_project} from './landing_page_crud_funcs.js'

    export let data;

    let new_project_title = '';

    const colormap = ['#E6D3AA', '#cebd99', '#b9a987', '#a29475', '#9a8c6e']
    const border_setting = 'solid black 1px'
    let current_tab, current_project;
    let projects = [];
    if(data.projects) {
        data.projects.forEach((project, i) => {
            projects.push({ ...project, 'color': colormap[i%colormap.length], 'bottom_border': border_setting })
        })
        current_tab = projects[0].id
        current_project = projects[0]
        current_project['bottom_border'] = 'none'
    }
    projects = projects

    function set_current_tab(project) {
        if(!project) {
          current_tab = null
          current_project = null
        } else {
            if(project.id === current_tab) { return }

            if(current_project) { current_project['bottom_border'] = border_setting }
            project['bottom_border'] = 'none'
            current_tab = project.id
            current_project = project
        }
        projects = projects
    }

    function delete_and_remove_project(id) {
        let new_projects = []
        delete_project(id).then(result => {
            result.projects.forEach((project, i) => {
                new_projects.push({ ...project, 'color': colormap[i%colormap.length], 'bottom_border': border_setting })
            })
            projects = new_projects
            current_tab = projects[0].id
            current_project = projects[0]
            current_project['bottom_border'] = 'none'
        })
    }

    function create_project_and_set(new_project_title) {
        let new_projects = []
        create_project(new_project_title).then(result => {
            result.projects.forEach((project, i) => {
                new_projects.push({ ...project, 'color': colormap[i%colormap.length], 'bottom_border': border_setting })
            })
            projects = new_projects
            current_tab = projects[projects.length-1].id
            current_project = projects[projects.length-1]
            current_project['bottom_border'] = 'none'
        })
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
                            style="--color:{project['color']};border-bottom:{project['bottom_border']}"
                            on:click={() => set_current_tab(project)}
                        >
                            <p>{project.title}</p>
                        </div>

                    {/each}
                {/if}

                <Tab
                    title='Create New Project'
                    color='white'
                    clicked={() => set_current_tab(null)}
                    border_bottom={'none'} />
            </div>

            {#if current_tab}
                <div class="projects_face" style="--current_color:{current_project['color']}">
                    <div class="project_face-header">
                        <div>Papers</div>
                        <div
                            class="remove_button"
                            on:click={() => delete_and_remove_project(current_tab)}>
                            Remove Project
                        </div>
                    </div>
                    <div class="papers_list">
                        <ul>
                            {#each current_project.papers as paper, i}
                                <li>
                                    <a href="/papers/{paper.id}" title={paper.content}>
                                        {paper.title} ({paper.year_published})
                                    </a>
                                    <p class="subtext">{paper.publisher}</p>
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
            {:else}
                <div class="projects_face" style="--current_color:white">
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
                        <input type="submit" on:click={() => create_project_and_set(new_project_title)} />
                    </div>
               </div>
            {/if}
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