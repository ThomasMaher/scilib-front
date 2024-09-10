import { json } from '@sveltejs/kit'

export async function load({ params }) {
    let project;

    const response = await fetch(`http://localhost:3000/projects/${params.id}.json`)
    project = await response.json()

    return { project }
}