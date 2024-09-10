export const actions = {
    create: async ({ request }) => {
        const data = await request.formData()
        console.log('HELLO FROM CREATE')
        const note = {
            note: data.get('note'),
            quote: data.get('quote'),
            paper_id: data.get('paper_id'),
            category: ''
        }

        const response = await fetch('http://localhost:3000/notes.json', {
            method: 'POST',
            body: JSON.stringify({ note }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json()
        return { result }
    }
}