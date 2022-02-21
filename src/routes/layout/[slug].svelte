<script context="module">
	export function preload({params}) {
		const req1 = this.fetch('/post?slug=' + params.slug).then(r => r.json())
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

	import PostTag from '../../components/PostTag.svelte';
	import Popup from '../../components/Popup.svelte';
	import TagsInsert from '../../components/TagsInsert.svelte';
	import { savePostJson } from '../../requests';

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

	let textPost = post[0].post;
	let isAdminV = false;
	let idPost;
	let idAddNode;
	let isAddNode = false;

	textPost = textPost.sort((a, b) => a.id - b.id);

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
	<title>{post[0].title}</title>
	{#if post[0].includecss != ''}
		<link rel="stylesheet" href="{post[0].includecss}">
	{/if}
</svelte:head>

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
			<div class="content">
				<h1 class="title">
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
				<div class="date">Дата публикации: {datePost[2]}.{datePost[1]}.{datePost[0]}</div>
				<div class="post">
					{#if $isAdmin}
					<div class="btns">
						<div class="btn edit" on:click={editPost}>Редактор</div>
						<div class="btn preview" on:click={previewPost}>Просмотр</div>
						<div class="btn save" on:click={savePostFn}>Сохранить</div>
					</div>
					{/if}
					{#each textPost as post}
						<PostTag 
							bind:post={post} {isAdminV}
							on:addPostNode={(event) => addPost(event.detail.idPost)}
							on:upPostNode={(event) => upPost(event.detail.idPost)}
							on:downPostNode={(event) => downPost(event.detail.idPost)}
							on:delPostNode={(event) => delPost(event.detail.idPost)}
						/>
					{/each}
				</div>
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

.widget{
	float: left;
	width: 100%;
	margin-bottom: 20px;
}

.widget__title{
	float: left;
	width: 100%;
	font-weight: bold;
}

.widget__block{
	float: left;
	width: 100%;
	height: 130px;
	background-color: rgba(0,0,0,0.1);
	margin-top: 15px;
}

.widget__ytblocks{
	float: left;
	width: 100%;
	margin-top: 10px;
}

.widget__ytblock{
	float: left;
	width: calc(100%/2 - 5px);
	margin: 5px 0;
	height: 100px;
	background-color: rgba(0,0,0,0.1);
}

.widget__ytblock:nth-child(2n){
	margin-left: 10px;
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