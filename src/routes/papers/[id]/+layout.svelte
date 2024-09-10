<div class="layout">
    <slot></slot>
</div>

<style>
    @media (min-width: 640px) {
        .layout {
            display: grid;
            gap: 1rem;
            grid-template-columns: 14em 64rem 1fr;
        }
    }
</style>