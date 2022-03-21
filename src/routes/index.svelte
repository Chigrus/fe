<script context="module">
	const responseHandler = (defaultResponse = null) => res => {
		if (res.status !== 200) {
			return null;
		}
		return res.json();
	};
	export function preload({params}){
		const req1 = this.fetch('/opengraph?name=homepage').then(responseHandler([]))
		const req2 = this.fetch('token').then(responseHandler({}))
		return 	Promise.all([
			req1, req2
		])
		.then(([opengraph, user]) => {
			return { opengraph, user };
		})
	}
</script>

<script>
	export let opengraph;
	export let user;

	import { isAdmin } from '../store.js';
	import AdminButtons from '../components/AdminButtons.svelte';
	import BtnAdminEdit from '../components/BtnAdminEdit.svelte';
	import OpenGraphEditor from '../components/OpenGraphEditor.svelte';

	isAdmin.set(user.isAdmin);

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
	{#if opengraph[0].id != 0}
		<BtnAdminEdit title="" bg="opengraph" on:click="{openGraphEdit}" />
	{/if}
</AdminButtons>
{/if}

<style>
	
</style>