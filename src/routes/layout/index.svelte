<script context="module">
	let cat = 'layout';
	export function preload() {
		const req1 = this.fetch('/posts?cat=' + cat).then(r => r.json())
		const req2 = this.fetch('/opengraph?name=' + cat).then(r => r.json())
		const req3 = this.fetch('token').then(r => r.json())
		return 	Promise.all([
			req1, req2, req3
		])
		.then(([posts, opengraph, user]) => {
			return { posts, opengraph, user };
		})
	}
</script>

<script>
	import TitleContainer from '../../components/TitleContainer.svelte';
	import Catalog from '../../components/Catalog.svelte';
	import PopupAddContent from '../../components/PopupAddContent.svelte';
	import OpenGraph from '../../components/OpenGraph.svelte';

	export let posts;
	export let opengraph;
	export let user;

	let masspopup = {
		popup: false,
		fields: [],
		data: []
	};

	let id, newPost;
</script>

<svelte:head>
	<OpenGraph opengraph={opengraph[0]} />
</svelte:head>

{#if masspopup.popup}
	<PopupAddContent 
		bind:isOpen={masspopup.popup} 
		fields={masspopup.fields} 
		typeEvent={masspopup.typeEvent}
		category={masspopup.category}
		bind:content={masspopup.data}
		on:updateData={(event) => { 
			id = event.detail;
			posts[posts.forEach(function(post, i){if(post.id === id.id){return i}})] = masspopup.data;
	 	}}
		on:insertData={(event) => { 
			newPost = event.detail;
			posts = [...posts, newPost.newPost];
	 	}}
	/>
{/if}

<div class="wrap">
	<div class="work">
		<TitleContainer title="Верстка" />
		<Catalog {posts} category="layout" cat="layout" {user} on:getData={(event) => { masspopup = event.detail; }} on:addData={(event) => { masspopup = event.detail; }} />
	</div>
</div>

<style>

</style>