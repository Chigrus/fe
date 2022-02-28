<script context="module">
	let cat = 'portfolio';
	export function preload() {
		const req1 = this.fetch('portfoliodata').then(r => r.json())
		const req2 = this.fetch('/opengraph?name=' + cat).then(r => r.json())
		const req3 = this.fetch('token').then(r => r.json())
		return Promise.all([req1, req2, req3])
		.then(([posts, opengraph, user]) => {
			return { posts, opengraph, user };
		})
	}
</script>

<script>
	import PortfolioCart from '../components/PortfolioCart.svelte';
	import OpenGraph from '../components/OpenGraph.svelte';
	import AdminButtons from '../components/AdminButtons.svelte';
	import BtnAdminEdit from '../components/BtnAdminEdit.svelte';
	import OpenGraphEditor from '../components/OpenGraphEditor.svelte';
	import { isAdmin } from '../store.js';

	export let posts;
	export let opengraph;
	//export let user;

	let isOpenGraphEdit = false;

	function openGraphEdit(){
	isOpenGraphEdit = true;
}
</script>

<svelte:head>
	<OpenGraph opengraph={opengraph[0]} />
</svelte:head>

{#if isOpenGraphEdit}
	<OpenGraphEditor bind:dataOpenGraph={opengraph[0]}  bind:isOpenGraphEdit={isOpenGraphEdit} />
{/if}

{#if isAdmin}
<AdminButtons>
	<BtnAdminEdit title="" bg="opengraph" on:click="{openGraphEdit}" />
</AdminButtons>
{/if}

<div class="wrap">
	<div class="work">
		<div class="top">
			<h1 class="title">Портфолио</h1>
			<div class="subtitle">Работы, в которых моя верстка, часть работ от дизайна до реализации мои.</div>
		</div>
	</div>
</div>
<div class="wrap">
	<div class="work">
		<div class="portfolio">
			{#if !posts.er}
				{#each posts as post}
					<PortfolioCart postPortfolio={post} />
				{/each}
			{:else}
				Произошла ошибка соединения с БД
			{/if}	
		</div>
	</div>
</div>

<style>
.top{
	width: 100%;
	border-bottom: 2px solid #423232;
	box-sizing: border-box;
	padding-top: 25px;
	padding-bottom: 15px;
}

.title{
	font-size: 24px;
	color: #ee3f02;
	font-weight: bold;
	line-height: 1em;
}

.subtitle{
	color: #423232;
	font-size: 14px;
	margin-top: 5px;
}

.portfolio{
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	padding: 15px 0;
}

@media only screen and (max-width: 639px){
	.portfolio{
		justify-content: center;
	}	
}
</style>