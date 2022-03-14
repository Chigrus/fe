<script context="module">
	let cat = 'js';
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
	import AdminButtons from '../../components/AdminButtons.svelte';
	import BtnAdminEdit from '../../components/BtnAdminEdit.svelte';
	import OpenGraphEditor from '../../components/OpenGraphEditor.svelte';
	import { isAdmin } from '../../store.js';

	export let posts;
	export let opengraph;
	export let user;

	let masspopup = {
		popup: false,
		fields: [],
		data: []
	};

	let id, newPost;

	let isOpenGraphEdit = false;

	function openGraphEdit(){
		isOpenGraphEdit = true;
	}
</script>

<svelte:head>
	<title>{opengraph[0].title}</title>
	<meta name="description" content="{opengraph[0].description}" />
	<meta property="og:type" content="{opengraph[0].og_type}" />
	<meta property="og:title" content="{opengraph[0].og_title}" />
	<meta property="og:description" content="{opengraph[0].og_description}" />
	<meta property="og:url" content="{opengraph[0].og_url}">
	<meta property="og:image" content="{opengraph[0].og_image}">
	<meta property="og:image:type" content="{opengraph[0].og_image_type}" />
	<meta property="og:image:width" content="{opengraph[0].og_image_width}">
	<meta property="og:image:height" content="{opengraph[0].og_image_height}">
	<meta name="twitter:title" content="{opengraph[0].og_title}">
	<meta name="twitter:description" content="{opengraph[0].og_description}">
	{#if opengraph[0].og_type === 'profile'}
	<meta property="og:profile:first_name" content="{opengraph[0].og_profile.first_name}" />
	<meta property="og:profile:last_name" content="{opengraph[0].og_profile.last_name}" />
	<meta property="og:profile:username" content="{opengraph[0].og_profile.username}" />
	<meta property="og:profile:gender" content="{opengraph[0].og_profile.gender}" />
	{/if}
</svelte:head>

{#if isOpenGraphEdit}
	<OpenGraphEditor bind:dataOpenGraph={opengraph[0]}  bind:isOpenGraphEdit={isOpenGraphEdit} />
{/if}

{#if $isAdmin}
<AdminButtons>
	<BtnAdminEdit title="" bg="opengraph" on:click="{openGraphEdit}" />
</AdminButtons>
{/if}

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
		<TitleContainer title="JS" />
		<Catalog {posts} category="js" cat="js" {user} on:getData={(event) => { masspopup = event.detail; }} on:addData={(event) => { masspopup = event.detail; }} />
	</div>
</div>

<style>
	
</style>