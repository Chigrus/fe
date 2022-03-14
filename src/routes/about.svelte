<script context="module">
	let catAbout = 'about';
	let catEducation = 'education';
	let catCareer = 'career';
	export function preload() {
		const req1 = this.fetch('/posts?cat=' + catAbout).then(r => r.json())
		const req2 = this.fetch('/posts?cat=' + catEducation).then(r => r.json())
		const req3 = this.fetch('/posts?cat=' + catCareer).then(r => r.json())
		const req4 = this.fetch('/opengraph?name=' + catAbout).then(r => r.json())
		const req5 = this.fetch('token').then(r => r.json())
		return 	Promise.all([
			req1, req2, req3, req4, req5
		])
		.then(([postsAbout, postsEducation, postsCareer, opengraph, user]) => {
			return { postsAbout, postsEducation, postsCareer, opengraph, user };
		})
	}
</script>

<script>
	import { isAdmin } from '../store.js';
	import Chronology from '../components/Chronology.svelte';
	import BtnEdit from '../components/BtnEdit.svelte';
	import PopupAddContent from '../components/PopupAddContent.svelte';
	import AdminButtons from '../components/AdminButtons.svelte';
	import BtnAdminEdit from '../components/BtnAdminEdit.svelte';
	import OpenGraphEditor from '../components/OpenGraphEditor.svelte';
	
	export let user;
	isAdmin.set(user.isAdmin);
	export let postsAbout;
	export let postsEducation;
	export let postsCareer;
	export let opengraph;

	let masspopup = {
		popup: false,
		fields: [],
		data: []
	};
	
	let id;

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
		bind:content={masspopup.data}
		on:updateData={(event) => { 
			id = event.detail;
			postsAbout[postsAbout.forEach(function(post, i){if(post.id === id.id){return i}})] = masspopup.data;
			postsEducation[postsEducation.forEach(function(post, i){if(post.id === id.id){return i}})] = masspopup.data;
			postsCareer[postsCareer.forEach(function(post, i){if(post.id === id.id){return i}})] = masspopup.data;
	 	}}
	/>
{/if}

<div itemscope itemtype="http://schema.org/Person">
	<div class="wrap white">
		<div class="work">
			<div class="about">
				{#each postsAbout as post}
					<div class="photoBlock">
						<div class="photo">
							{#if $isAdmin}
							<BtnEdit 
								on:getData={(event) => { masspopup = event.detail; }} 
								dataEdit={post}
								typeEvent='Update'
								fields={[
									{field: 'image', type: 'image', alt: post.image_alt, cropSize: {width: 400, height: 400}}
								]} 
							/>
							{/if}
							<img src="{post.image}" alt="{post.image_alt}" itemprop="image" />
						</div>
					</div>
					<div class="about__content">
						<h1 class="about__title" itemprop="name">
							{post.title}
							{#if $isAdmin}
							<BtnEdit 
								on:getData={(event) => { masspopup = event.detail; }} 
								dataEdit={post} 
								typeEvent='Update'
								fields={[
									{field: 'title', type: 'input'}, 
									{field: 'subtitle', type: 'input'}, 
									{field: 'text', type: 'textarea'}
								]} 
							/>
							{/if}
						</h1>
						<div class="about__subtitle" itemprop="jobTitle">{post.subtitle}</div>
						<ul class="about__soclist">
							<li class="about__socitem">
								<a href="/" class="about__soclink in">1</a>
							</li>
							<li class="about__socitem">
								<a href="/" class="about__soclink fb">1</a>
							</li>
							<li class="about__socitem">
								<a href="/" class="about__soclink yt">1</a>
							</li>
						</ul>
						<div class="about__text" itemprop="description">{@html post.text}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div class="wrap">
		<div class="work">
			<Chronology title='Образование' catName='education' data={postsEducation} on:getData={(event) => { masspopup = event.detail; }}  />
		</div>
	</div>
	<div class="wrap white">
		<div class="work">
			<Chronology title='Карьера' catName='career' data={postsCareer} on:getData={(event) => { masspopup = event.detail; }} />
		</div>
	</div>
</div>

<style>
.about{
	float: left;
	width: 100%;
	margin: 40px 0;
}

.photoBlock{
	float: left;
	width: 480px;
	box-sizing: border-box;
	padding-left: 40px;
}

.photo{
	position: relative;
	width: 400px;
	height: 400px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(0,0,0,0.1);
}

.photo img{
	max-width: 100%;
	height: auto;
}

.about__content{
	float: left;
	width: calc(100% - 480px);
	box-sizing: border-box;
	padding-left: 40px;
	padding-top: 35px;
}

.about__title{
	position: relative;
	float: left;
	width: 100%;
	font-size: 48px;
	font-weight: bold;
	line-height: 1em;
}

.about__subtitle{
	float: left;
	width: 100%;
	font-size: 18px;
	font-weight: bold;
	color: #423232;
	text-transform: uppercase;
	margin-top: 4px;
	margin-bottom: 10px;
}

.about__soclist{
	list-style-type: none;
	padding: 0;
	margin: 0;
}

.about__socitem{
	float: left;
	margin-right: 10px;
}

.about__soclink{
	display: block;
	width: 40px;
	height: 40px;
	background-color: #423232;
	background-repeat: no-repeat;
	background-position: center center;
	background-size: 60% auto;
}

.about__soclink.in{
	background-image: url(/svg/instagramm.svg);
}

.about__soclink.fb{
	background-image: url(/svg/facebook.svg);
}

.about__soclink.yt{
	background-image: url(/svg/youtube.svg);
	background-size: 70% auto;
}

.about__text{
	float: left;
	width: 100%;
	margin-top: 10px;
}

@media only screen and (max-width: 940px){
	.about__content{
		width: 100%;
		padding-top: 30px;
		padding-left: 0;
	}

	.photoBlock{
		padding-left: 0;
	}

	.photo{
		width: 300px;
		height: 300px;
	}

	.about__title{
		font-size: 36px;
	}
}

@media only screen and (max-width: 539px){
	.photoBlock{
		width: auto;
	}
}

@media only screen and (max-width: 420px){
	.photo{
		width: 100%;
		height: auto;
	}
}
</style>