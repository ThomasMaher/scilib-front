<script>
    export let title;
    export let color;
    export let index;
</script>

<div class="tab" style="--color:{color};z-index:{index}">
    <p>{title}</p>
</div>

<style>
    .tab {
        background: var(--color);
        border-radius: 5px 5px 0 0;
        height: 100%;
        width: 12%;
        z-index: var(--index);
        border: solid black 1px;
        border-bottom: none;
    }

    p {
        margin-top: 6px;
        margin-bottom: 0;
        font-size: 12px;
    }
</style>