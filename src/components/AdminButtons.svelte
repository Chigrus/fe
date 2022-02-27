<script>
    //export let title = 'Кнопка';
</script>

<div class="adminButtons">
    <slot></slot>
</div>

<style>
.adminButtons{
    position: fixed;
    z-index: 10;
    top: 100px;
    left: 0;
    display: flex;
    flex-wrap: wrap;
    width: 40px;
    height: auto;
}
</style>