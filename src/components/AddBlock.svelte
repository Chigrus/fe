<script>
    import { createEventDispatcher } from 'svelte';

    export let fields = [];
    export let dataEdit = {};
    export let typeEvent;
    export let category;

  const dispatch = createEventDispatcher();

  function clickAdd() {
      //console.log(category);
      dispatch('addData', {
        popup: true,
        fields: fields,
        typeEvent: typeEvent,
        category: category,
        data: dataEdit
      });
  }
</script>

<div class="addblock" on:click="{clickAdd}">
  <slot></slot>
</div>

<style>
.addblock{
  position: relative;
  min-height: 240px;
}
</style>