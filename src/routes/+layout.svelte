<script>
    import { page, navigating, updated } from '$app/stores'
</script>

<nav>
    <a href='/'>Home</a>
    <a href='/papers'>Papers</a>
    <a href='/projects/'>Add a Project</a>
</nav>

<slot></slot>

<style>
    a {
        text-decoration: none;
    }
</style>