<script>
    import { createEventDispatcher } from 'svelte';

	export let title = '';
	export let className = 'dafault';
	export let dataEdit = {};
	export let fields = [];
    export let typeEvent;

    const dispatch = createEventDispatcher();

    function clickEdit() {
        //console.log(fields, dataEdit);
        dispatch('getData', {
            popup: true,
            fields: fields,
            typeEvent: typeEvent,
            data: dataEdit
        });
    }
</script>

<span class="edit {className}" on:click="{clickEdit}">{title}</span>

<style>
    .edit{
        cursor: pointer;
        display: flex;
    }

    .edit.dafault{
        position: absolute;
        z-index: 5;
        top: 0;
        right: 0;
        float: right;
        width: 30px;
        height: 30px;
        font-size: 14px;
        background-image: url(/svg/edit.svg);
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 80% auto;
    }
    .edit.mini{
        float: right;
        width: 30px;
        height: 40px;
        background: red;
        font-size: 14px;
    }
    .edit.max{
        float: right;
        width: 40px;
        height: 40px;
        background: green;
        font-size: 14px;
    }
</style>