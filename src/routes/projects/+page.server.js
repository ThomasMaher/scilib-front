import { fail, redirect } from '@sveltejs/kit'

export const actions = {
    create: async({ cookies, request }) => {
        const data = await request.formData();
        try {
            const response = await fetch('http://localhost:3000/projects.json', {
                method: 'POST',
                body: JSON.stringify({project: {title: data.get('description')}}),
                headers: {'Content-type': 'application/json'}
            })
            redirect(201, '/')
        } catch (error) {
            return fail(422, {
                description: data.get('description'),
                error: error.error
            })
        }
        throw redirect(303, '/')
    },
    // delete: async({ cookies, request }) => {
    //     await new Promise((fulfil) => setTimeout(fulfil, 1000));
    //     const data = await request.formData();
    //     db.deleteProject(cookies.get('userid'), data.get('id'))
    // }
}