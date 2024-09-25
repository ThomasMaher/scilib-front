import {fail} from "@sveltejs/kit";

export async function load({ cookies }) {
    let projects;

    const response = await fetch('http://localhost:3000/projects.json')
    projects = await response.json()

    return { projects }
}