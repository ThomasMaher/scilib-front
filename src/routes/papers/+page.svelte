<script>
    import { navigating } from '$app/stores'

    export let data;
    </script>

<ul>
    {#if data.papers}
        {#each data.papers as { id, title}}
            <li><a href="/papers/{id}">{title}</a></li>
        {/each}
    {/if}
</ul>