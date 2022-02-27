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
	import AdminButtons from '../../components/AdminButtons.svelte';
	import BtnAdminEdit from '../../components/BtnAdminEdit.svelte';
	import Popup from '../../components/Popup.svelte';
	import VisualEditor from '../../components/VisualEditor.svelte';
	import { isAdmin } from '../../store.js';
	import Cropper from "svelte-easy-crop";

	export let posts;
	export let opengraph;
	export let user;

	let masspopup = {
		popup: false,
		fields: [],
		data: []
	};

	let id, newPost;

	let cropData;

	let isOpenGraphEdit = false;

	function openGraphEdit(){
		isOpenGraphEdit = true;
	}
</script>

<svelte:head>
	<OpenGraph opengraph={opengraph[0]} />
</svelte:head>

{#if isOpenGraphEdit}
<Popup bind:isOpen="{isOpenGraphEdit}">
	<div slot="title">Редактировать Open Graph</div>
	<div class="og_content" slot="content">
		<div class="line">
			<VisualEditor textEditor="{opengraph[0].title}" idEditor="{opengraph[0].id}" isHeightAuto="true" isCounter="{{isShow: true, min: 40, max: 60}}" buttons={[]} title="<b>title</b> - длина от 40 до 60 символов" />
		</div>
		<div class="line">
			<VisualEditor textEditor="{opengraph[0].description}" idEditor="{opengraph[0].id}" isHeightAuto="true" isCounter="{{isShow: true, min: 120, max: 220}}" buttons={[]} title="<b>description</b> - длина от 120 до 220 символов" />
		</div>
		<div class="line">
			<VisualEditor textEditor="{opengraph[0].og_type}" idEditor="{opengraph[0].id}" isHeightAuto="true" buttons={[]} title="<b>og:type</b> - тип объекта (website, article, profile)" />
		</div>
		<div class="line">
			<VisualEditor textEditor="{opengraph[0].og_title}" idEditor="{opengraph[0].id}" isHeightAuto="true" isCounter="{{isShow: true, min: 40, max: 60}}" buttons={[]} title="<b>og:title</b> - тег заголовка для микроразметки" />
		</div>
		<div class="line">
			<VisualEditor textEditor="{opengraph[0].og_description}" idEditor="{opengraph[0].id}" isHeightAuto="true" isCounter="{{isShow: true, min: 40, max: 60}}" buttons={[]} title="<b>og:description</b> - тег описание объекта на странице" />
		</div>
		<div class="line">
			<VisualEditor textEditor="{opengraph[0].og_url}" idEditor="{opengraph[0].id}" isHeightAuto="true" buttons={[]} title="<b>og:url</b> - каноническая ссылка" />
		</div>
		<div class="line">
			<div class="cropper">
				<Cropper 
					image={opengraph[0].og_image}
					crop={{ x: 0, y: 0 }}
					zoom={1}
					minZoom={0.8}
					maxZoom={2}
					cropSize = {{ width: 250, height: 250 }}
					zoomSpeed={0.1}
					restrictPosition={false}
					on:cropcomplete={(event) => cropData = event.detail.pixels}
				/>
			</div>
		</div>
	</div>
</Popup>
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
		<TitleContainer title="Верстка" />
		<Catalog {posts} category="layout" cat="layout" {user} on:getData={(event) => { masspopup = event.detail; }} on:addData={(event) => { masspopup = event.detail; }} />
	</div>
</div>

<style>
.og_content{
	display: inline-block;
	max-width: 640px;
	max-height: 60vh;
	overflow-y: auto;
}

.line{
	width: 100%;
	display: inline-block;
	margin-bottom: 10px;
}

.line:last-child{
	margin-bottom: 0;
}

.cropper{
    position: relative;
    float: left;
    width: 100%;
    height: 250px;
    overflow: hidden;
    margin-bottom: 5px;
}
</style>