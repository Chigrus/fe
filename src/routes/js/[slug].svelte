<script context="module">
	const responseHandler = (defaultResponse = null) => res => {
		if (res.status !== 200) {
			return null;
		}
		return res.json();
	};
	export function preload({params}){
		const datapar = {cat: 'layout', slug: params.slug, amount: 2};
		const req1 = this.fetch('/post?slug=' + params.slug).then(responseHandler({}))
		const req2 = this.fetch('/opengraph?name=' + params.slug).then(responseHandler([]))
		const req3 = this.fetch('/latest-posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				datapar,
			}),
		}).then(responseHandler([]))
		const req4 = this.fetch('token').then(responseHandler({}))
		return 	Promise.all([
			req1, req2, req3, req4
		])
		.then(([post, opengraph, latestsposts, user]) => {
			return { post, opengraph, latestsposts, user };
		})
	}
</script>


<script>
	import { isAdmin } from '../../store.js';
	import BtnEdit from '../../components/BtnEdit.svelte';
	import PopupAddContent from '../../components/PopupAddContent.svelte';
	import AdminButtons from '../../components/AdminButtons.svelte';
	import BtnAdminEdit from '../../components/BtnAdminEdit.svelte';
	import OpenGraphEditor from '../../components/OpenGraphEditor.svelte';
	import Widget from '../../components/Widget.svelte';
	import WidgetPost from '../../components/WidgetPost.svelte';
	import WidgetYoutube from '../../components/WidgetYoutube.svelte';

	import PostTag from '../../components/PostTag.svelte';
	import Popup from '../../components/Popup.svelte';
	import TagsInsert from '../../components/TagsInsert.svelte';
	import { savePostJson } from '../../requests';

	export let user;
	export let post;
	export let latestsposts;
	export let opengraph;
	isAdmin.set(user.isAdmin);

	let masspopup = {
		popup: false,
		fields: [],
		data: []
	};
	
	let id;

	$: datePost = post[0].date.substring(0, 10).split('-');

	let isAdminV = false;
	let idPost;
	let idAddNode;
	let isAddNode = false;
	
	$: textPost = post[0].post.sort((a, b) => a.id - b.id);

	let isOpenGraphEdit = false;

	function openGraphEdit(){
		isOpenGraphEdit = true;
	}

	function editPost(){
		isAdminV = true;
	}

	function previewPost(){
		isAdminV = false;
	}

	async function savePostFn(){
		savePostJson(textPost, {tableName: 'posts', id: post[0].id});
	}

	function delPost(id){
		textPost = textPost.filter((item) => item.id !== id);
		for (var key in textPost) {
			if (key >= id-1 ){
				textPost[key].id = textPost[key].id - 1;
			}
		}
	}

	function upPost(id){
		if(id != 1){
			textPost[id-1].id = id-1;
			textPost[id-2].id = id;
			textPost.sort((a, b) => a.id - b.id);
		};
	}

	function downPost(id){
		if(id != textPost.length){
			textPost[id-1].id = id+1;
			textPost[id].id = id;
			textPost.sort((a, b) => a.id - b.id);
		};
	}

	function addPost(id){
		isAddNode = true;
		idAddNode = id;
	}

	function addNode(typeNode, contentInner){
		if(idAddNode === textPost.length){
			textPost = [...textPost, {id: idAddNode+1, type: typeNode, content: contentInner}];
		}else{
			for (var key in textPost) {
				if (key >= idAddNode && key != textPost.length){
					textPost[key].id = textPost[key].id + 1;
				}
			}
			textPost = [...textPost, {id: idAddNode+1, type: typeNode, content: contentInner}];
			textPost.sort((a, b) => a.id - b.id);
		}
		isAddNode = false;
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

	{#if post[0].includecss}
		<link rel="stylesheet" href="{post[0].includecss}">
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

<Popup bind:isOpen={isAddNode}>
	<slot slot="title">
		Добавить новый блок
	</slot>
	<slot slot="content">
		<TagsInsert on:onSelectNode={(event) => addNode(event.detail.typeNode, event.detail.contentInner)} />
	</slot>
</Popup>

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
			<div class="content" itemscope itemtype="//schema.org/Article">
				<h1 class="title" itemprop="headline">
					{#if $isAdmin}
						<BtnEdit 
							on:getData={(event) => { masspopup = event.detail; }} 
							typeEvent='Update'
							dataEdit={post[0]} 
							fields={[
								{field: 'title', type: 'input'},
							]} 
						/>
					{/if}
					{post[0].title}
				</h1>
				<div class="date" itemprop="datePublished">Дата публикации: {datePost[2]}.{datePost[1]}.{datePost[0]}</div>
				<div class="post" itemprop="description">
					{#if $isAdmin}
					<div class="btns">
						<div class="btn edit" on:click={editPost}>Редактор</div>
						<div class="btn preview" on:click={previewPost}>Просмотр</div>
						<div class="btn save" on:click={savePostFn}>Сохранить</div>
					</div>
					{/if}
					{#each textPost as post}
						<PostTag 
							post={post} 
							isAdminV={isAdminV}
							on:addPostNode={(event) => addPost(event.detail.idPost)}
							on:upPostNode={(event) => upPost(event.detail.idPost)}
							on:downPostNode={(event) => downPost(event.detail.idPost)}
							on:delPostNode={(event) => delPost(event.detail.idPost)}
						/>
					{/each}
				</div>
				<div class="author">Автор статьи: <span itemprop="author">Иван Чернов</span></div>
			</div>
			<div class="sidebar">
				<Widget>
					<div slot="title">Свежие публикации:</div>
					<div slot="content">
						{#each latestsposts as latestpost}
							<WidgetPost bind:latestpost={latestpost} />
						{/each}
					</div>
				</Widget>
				<Widget>
					<div slot="title">Мои ролики на ютубе:</div>
					<div slot="content">
						<WidgetYoutube />
						<WidgetYoutube />
					</div>
				</Widget>
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
	float: left;
	width: calc(100% - 300px);
}

.title{
	position: relative;
	float: left;
	width: 100%;
	text-transform: uppercase;
	font-size: 22px;
}

.post{
	float: left;
	width: 100%;
}

.btns{
	width: 100%;
	margin-bottom: 20px;
	display: flex;
	justify-content: flex-end;
}

.btn{
	padding: 5px 10px;
	background-color: green;
	color: #fff;
	margin-left: 10px;
	cursor: pointer;
	font-size: 12px;
}

.btn:first-child{
	margin-left: 0;
}

.sidebar{
	float: left;
	width: 300px;
	box-sizing: border-box;
	padding-left: 40px;
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