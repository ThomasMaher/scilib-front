<script>
    import NoteForm from './NoteForm.svelte'
    import ProjectSelector from './ProjectSelector.svelte'

    export let data;

    let annotations = [];
    if (data.unassigned_annotations?.length) {
        annotations = data.unassigned_annotations
    }

    function setAnnotations(event) {
        let project_id = event.target.value
        if (project_id == 'unassigned') {
            if (event.target.checked) {
                annotations = [...data.unassigned_annotations, ...annotations]
            } else {
                annotations = annotations.filter(ann => ann.project_paper_id != null)
            }
        } else {

        }
    }
</script>


<ProjectSelector paper_projects={data.paper_projects} toggleProject={setAnnotations} />
<main>
    <h2>{data.paper.title}</h2>
    <div class="paper">
        <div class="annotations-header">
            <h4>Highlights</h4>
            <h4>Notes</h4>
        </div>
        <div>
            {#each annotations as {quote, note}}
                <div>
                    <div class="annotations-body">
                        <div class="highlights">
                            <input type="text" value={quote}/>
                        </div>

                        <div class="notes">
                            <input type="text" value={note}/>
                        </div>
                    </div>
                </div>
            {/each}
            <div>
                <form method="POST" action="?/create">
                    <div class="annotations-body">
                        <div class="highlights">
                            <input type="text" name="quote" />
                        </div>

                        <div class="notes">
                            <input type="text" name="note" />
                        </div>
                        <input type="hidden" value={data.paper.id} name="paper_id" />
                    </div>
                    <div>
                        <NoteForm />
                    </div>
                </form>
            </div>
        </div>
    </div>
</main>

<style>
    .annotations-body {
        display: grid;
        gap: 2em 4em;
        grid-template-columns: repeat(2, 1fr);
        margin-top: 40px;
    }

    .annotations-header {
        display: grid;
        gap: 2em 4em;
        grid-template-columns: repeat(2, 1fr);
    }

    h4, h2 {
        text-align: center;
        margin-bottom: 0
    }

    input[type=text] {
        margin: auto;
        display: block;
        width: 94%;
        min-height: 4rem;
    }
</style>