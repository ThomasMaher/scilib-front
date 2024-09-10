import { fail, redirect } from '@sveltejs/kit'

export const actions = {
    create: async({ cookies, request }) => {
        const data = await request.formData();
        try {
            db.createProject(cookies.get('userid'), data.get('description'));
        } catch (error) {
            return fail(422, {
                description: data.get('description'),
                error: error.message
            })
        }
        throw redirect(303, '/')
    },
    delete: async({ cookies, request }) => {
        await new Promise((fulfil) => setTimeout(fulfil, 1000));
        const data = await request.formData();
        db.deleteProject(cookies.get('userid'), data.get('id'))
    }
}