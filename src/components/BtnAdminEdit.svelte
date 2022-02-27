<script>
    export let title = 'Кнопка';
    export let bg = '';
</script>

<button class="btn {bg}" on:click>{title}</button>

<style>
.btn{
    width: 40px;
    height: 40px;
    border: none;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 4px;
    background-color: #423232;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 80% 80%;
}

.btn:hover{
    background-color: #ee3f02;
}

.btn.opengraph{
    background-image: url(/svg/openGraph.svg);
}
</style>