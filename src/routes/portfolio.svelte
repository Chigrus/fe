<script context="module">
	export function preload() {
		const req1 = this.fetch('portfoliodata').then(r => r.json())
		const req2 = this.fetch('token').then(r => r.json())
		return Promise.all([req1, req2])
		.then(([posts, user]) => {
			return { posts, user };
		})
	}
</script>

<script>
	import PortfolioCart from '../components/PortfolioCart.svelte';

	export let posts;
</script>

<svelte:head>
	<title>Портфолио</title>
</svelte:head>

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