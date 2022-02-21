<script>
    export let title = 'Кнопка';
    export let bg = '';
</script>

<button class="btn {bg}" on:click>{title}</button>

<style>
.btn{
    height: 34px;
    padding: 0 15px;
    cursor: pointer;
    outline: none;
    border: none;
    font-size: 14px;
    color: #fff;
    background-color: #423232;
}
.btn:hover{
    background-color: #ee3f02;
}
.btn.red{
    background-color: #ee3f02;
}
.btn.red:hover{
    background-color: #423232;
}
.btn.green{
    background-color: green;
}
</style>