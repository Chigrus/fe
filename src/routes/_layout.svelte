<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
	//console.log($$slots);
</script>

<main>
	{#if segment != 'admin'}
		<Nav {segment}/>
	{/if}
	<slot></slot>
</main>

<style>
main {
	padding: 0;
}

:global(.wrap){
	position: relative;
	float: left;
	width: 100%;
}

:global(.wrap.white){
	background-color: #fff;
}

:global(.work){
	max-width: 1200px;
	margin: auto;
}

@media only screen and (max-width: 1200px){
	:global(.work){
		max-width: calc(100% - 20px);
	}
}
</style>