<script>
    export let title;
    export let color;
    export let border_bottom;
    export let clicked;
</script>

<div class="tab" style="--color:{color};--border_bottom:{border_bottom}" on:click={clicked}>
    <p>{title}</p>
</div>

<style>
    .tab {
        background: var(--color);
        border-radius: 5px 5px 0 0;
        height: 100%;
        width: 12%;
        border: solid black 1px;
        border-bottom: var(--border_bottom);
        cursor: pointer;
    }

    p {
        margin-top: 6px;
        margin-bottom: 0;
        font-size: 12px;
    }
</style>
