<script context="module">
	export function preload({params}) {
		const req1 = this.fetch('post?slug=' + params.slug).then(r => r.json())
		const req2 = this.fetch('token').then(r => r.json())
		return 	Promise.all([
			req1, req2
		])
		.then(([post, user]) => {
			return { post, user };
		})
	}
</script>


<script>
	import { isAdmin } from '../../store.js';
	import BtnEdit from '../../components/BtnEdit.svelte';
	import PopupAddContent from '../../components/PopupAddContent.svelte';

	export let user;
	isAdmin.set(user.isAdmin);
	export let post;

	let masspopup = {
		popup: false,
		fields: [],
		data: []
	};
	
	let id;

	const datePost = post[0].date.substring(0, 10).split('-');

</script>

<svelte:head>
	<title>{post[0].title}</title>
	{#if post[0].includecss != ''}
		<link rel="stylesheet" href="{post[0].includecss}">
	{/if}
</svelte:head>

{#if masspopup.popup}
	<PopupAddContent 
		extClass='big'
		bind:isOpen={masspopup.popup} 
		fields={masspopup.fields} 
		typeEvent={masspopup.typeEvent}
		bind:content={masspopup.data}
		on:updateData={(event) => { 
			id = event.detail;
			post[post.forEach(function(post, i){if(post.id === id.id){return i}})] = masspopup.data;
	 	}}
	/>
{/if}

<div class="wrap">
	<div class="work">
		<div class="container">
			<div class="content">
				{#if $isAdmin}
					<BtnEdit 
						on:getData={(event) => { masspopup = event.detail; }} 
						typeEvent='Update'
						dataEdit={post[0]} 
						fields={[
							{field: 'title', type: 'input'},
							{field: 'text', type: 'textarea'}
						]} 
					/>
					{/if}
				<h1 class="title">{post[0].title}</h1>
				<div class="date">Дата публикации: {datePost[2]}.{datePost[1]}.{datePost[0]}</div>
				<div class="post">{@html post[0].text}</div>
			</div>
			<div class="sidebar">
				<div class="widget">
					<div class="widget__title">Свежие публикации</div>
					<div class="widget__block"></div>
					<div class="widget__block"></div>
					<div class="widget__block"></div>
				</div>
				<div class="widget">
					<div class="widget__title">Мои ролики на ютубе</div>
					<div class="widget__ytblocks">
						<div class="widget__ytblock"></div>
						<div class="widget__ytblock"></div>
						<div class="widget__ytblock"></div>
						<div class="widget__ytblock"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
.container{
	float: left;
	width: 100%;
	padding: 50px 0;
}	
.content{
	position: relative;
	float: left;
	width: calc(100% - 300px);
}
.title{
	float: left;
	width: 100%;
	text-transform: uppercase;
	font-size: 22px;
}
.post{
	float: left;
	width: 100%;
}

:global(.post .quoteBlock){
	position: relative;
	display: inline-block;
	width: 100%;
	margin: 10px 0;
	box-sizing: border-box;
	padding: 15px 0 15px 110px;
}

:global(.post .quoteBlock::before){
	content: '';
	position: absolute;
	top: 0;
	left: 92px;
	width: 3px;
	height: 100%;
	background-color: #cb442e;
}

:global(.post .quoteBlock::after){
	content: '';
	position: absolute;
	top: 50%;
	left: 15px;
	width: 64px;
	height: 64px;
	margin-top: -32px;
	background-image: url(/svg/quoteBlock.svg);
	background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;
}

:global(.post .quoteTitle){
	display: inline-block;
	background-color: rgba(0,0,0,0.7);
    color: #fff;
    padding: 5px 15px;
}

:global(.post .javascript),
:global(.post .sass),
:global(.post .html5){
	max-width: 100%;
    overflow-x: auto;
	padding: 2px 5px;
	background-color: rgba(0,0,0,0.05);
	border: 1px solid rgba(0,0,0,0.3);
	box-sizing: border-box;
	tab-size: 1em;
}

:global(.post .quoteText){
	display: inline-block;
    width: 100%;
    line-height: 1.5em;
    font-size: 16px;
	margin-top: 10px;
}

@media only screen and (max-width: 1199px){
	.sidebar{
		display: none;
	}

	.content{
		width: 100%;
	}
}
</style>