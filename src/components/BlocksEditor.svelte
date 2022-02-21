<script>
	export let post;

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
</script>


<div class="editor">
    <div class="rules">
        <div class="emptyFlex"></div>
        <button class="btn event add" title="Добавить" on:click={() => dispatch('addPostNode', {idPost: post.id})}></button>
        <button class="btn event up" title="Вверх" on:click={() => dispatch('upPostNode', {idPost: post.id})}></button>
        <button class="btn event down" title="Вниз" on:click={() => dispatch('downPostNode', {idPost: post.id})}></button>
        <button class="btn event remove" title="Удалить" on:click={() => dispatch('delPostNode', {idPost: post.id})}></button>
    </div>
    <div class="content">
        <slot name="content"></slot>
    </div>
</div>


<style>
.editor{
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0,0,0,1);
    margin-bottom: 10px;
}

.rules{
    display: flex;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #423232;
    border-bottom: 0;
    padding: 5px;
    background-color: #423232;
}

.content{
    display: flex;
    width: 100%;
}

.btn{
    float: left;
    height: 30px;
    min-width: 30px;
    border: none;
    padding: 0 5px;
    box-sizing: border-box;
    border: 1px solid #423232;
    cursor: pointer;
    margin-right: 5px;
    border-radius: 3px;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: center center;
}

.btn:last-child{
    margin-right: 0;
}
.btn.event:hover{
    background-color: #f68003;
}
.btn.remove{
    background-image: url(/svg/close.svg);
    background-size: 20px 20px;
}
.btn.add{
    background-image: url(/svg/add-black.svg);
    background-size: 20px 20px;
}
.btn.up{
    background-image: url(/svg/down.svg);
    background-size: 18px 18px;
    transform: rotate(180deg);
    transform-origin: center center;
}
.btn.down{
    background-image: url(/svg/down.svg);
    background-size: 20px 20px;
}
@media only screen and (max-width: 639px){

}
</style>