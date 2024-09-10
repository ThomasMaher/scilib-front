import { json } from '@sveltejs/kit'

export async function load() {
    let papers;
    const response = await fetch(`http://localhost:3000/papers.json`)
    papers = await response.json()

    return { papers }
}