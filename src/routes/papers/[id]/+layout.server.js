import { error } from '@sveltejs/kit'

export async function load({ params }) {
    const response = await fetch(`http://localhost:3000/papers/${params.id}.json`)
    const result = await response.json()
    const { projects, unassigned_notes, ...paper } = result

    if (!paper) throw error(404)
    return { paper, paper_projects: projects, unassigned_annotations: unassigned_notes }
}