import {fail, redirect} from "@sveltejs/kit";

export async function delete_project(id) {
    const response = await fetch(`http://localhost:3000/projects/${id}.json`, {
        method: 'DELETE',
        headers: {'Content-type': 'application/json'}
    })
    let projects = await response.json()

    return { projects }
}

export async function create_project(title) {
    const response = await fetch('http://localhost:3000/projects.json', {
        method: 'POST',
        body: JSON.stringify({project: {title: title}}),
        headers: {'Content-type': 'application/json'}
    })
    let projects = await response.json()

    return { projects }
}