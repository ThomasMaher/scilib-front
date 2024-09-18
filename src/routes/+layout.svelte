<script>
    import { page, navigating, updated } from '$app/stores'
</script>

<nav>
    <a href='/'>Scilib</a>
</nav>

<slot></slot>

<style>
    nav {
        font-weight: bold;
        font-size: 28px;
    }
</style>