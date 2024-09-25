<script>
    import { enhance } from '$app/forms'
    import { fly, slide } from 'svelte/transition'

    export let data;
    export let form;

    let creating = false;
    let deleting = [];
</script>

<div class="centered">
    <h1>Add Project</h1>

    {#if form?.error}
        <p class="error">{form.error}</p>
    {/if}

    <form method="POST"
          action="?/create"
          use:enhance={() => {
            creating = true;

            return async ({ update }) => {
                await update();
                creating = false
            }
         }}>
        <label>
            Add Project:
            <input
                name="description"
                disabled={creating}
                value={form?.description ?? ''}
                autocomplete="off" />
        </label>
    </form>

    {#if creating}
        <span class="saving">saving...</span>
    {/if}
</div>


<style>
    ul:has(li):has(form) {
        list-style: none;
        padding: 0;
    }

    li form {
        flex-direction: row;
        gap: 0.5rem;
        margin: 0.5rem 0;
    }

	.centered {
		max-width: 20em;
		margin: 0 auto;
	}

	label {
		width: 100%;
	}

	input {
		flex: 1;
	}

	span {
		flex: 1;
	}

	button {
		border: none;
		background-size: 1rem 1rem;
		cursor: pointer;
		height: 100%;
		aspect-ratio: 1;
		opacity: 0.5;
		transition: opacity 0.2s;
	}

	button:hover {
		opacity: 1;
	}

	.saving {
		opacity: 0.5;
	}
</style>