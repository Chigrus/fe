<script>
	import { isAdmin } from '../store.js';
	import BtnEdit from '../components/BtnEdit.svelte';
	import AddBlock from '../components/AddBlock.svelte';

	export let posts = {};
	export let user = {};
	export let category = '';
	export let cat = '';

	isAdmin.set(user.isAdmin);
</script>

<div class="list">
    {#each posts as post}
        <div class="item">
			{#if $isAdmin}
			<BtnEdit 
				on:getData 
				dataEdit={post}
				typeEvent='Update'
				fields={[
					{field: 'title', type: 'input'},
					{field: 'slug', type: 'input'},
					{field: 'image', type: 'image', alt: post.image_alt, cropSize: {width: 400, height: 200}}
				]} 
			/>
			{/if}
            <a rel="prefetch" class="link" href="{category}/{post.slug}">
                <div class="image" style="background-image: url({post.image})"></div>
                <div class="titleblock">
                    {post.title}
                </div>
                <div class="linkbtn">Читать далее</div>
            </a>
        </div>
    {/each}
	{#if $isAdmin}
		<AddBlock 
			on:addData
			typeEvent='Add'
			category={cat}
			fields={[
				{field: 'title', type: 'input', placeHolder: 'Название поста', Required: {isRequired: true, isError: false}},
				{field: 'slug', type: 'input', placeHolder: 'URL поста', Required: {isRequired: true, isError: false}},
				{field: 'image', type: 'image', alt: '', cropSize: {width: 400, height: 200}}
			]}
		>
			<div class="addPost"></div>
		</AddBlock>
	{/if}
</div>


<style>
.list{
	float: left;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	list-style-type: none;
	margin: 0;
	padding: 0;
}

.item{
	position: relative;
	width: calc(100%/3 - 30px);
	margin: 15px;
	border: 1px solid #423232;
	background-color: #fefdfa;
	box-sizing: border-box;
}

.link{
	position: relative;
	display: block;
	height: 100%;
	text-decoration: none;
}

.titleblock{
	position: relative;
	width: 100%;
	box-sizing: border-box;
	padding: 15px;
	padding-bottom: 25px;
	font-size: 18px;
	line-height: 1.2em;
	color: #423232;
	border-top: 1px solid #423232;
}

.image{
	width: 100%;
	height: 170px;
	background-color: #fff;
	background-repeat: no-repeat;
	background-position: center center;
	background-size: contain;
}

.linkbtn{
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	right: -15px;
	bottom: -15px;
	width: 122px;
	height: 34px;
	background-color: #423232;
	color: #fff;
	text-transform: uppercase;
	font-size: 13px;
	cursor: pointer;
}

.item:hover .linkbtn{
	background-color: #ee3f02;
}

:global(.addblock){
	width: calc(100%/3 - 30px);
	margin: 15px;
}

.addPost{
	position: relative;
	width: 100%;
	height: 100%;
	border: 1px solid #423232;
	background-color: #423232;
	box-sizing: border-box;
	cursor: pointer;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	padding-bottom: 50px;
	color: #fff;
}

.addPost:hover{
	border: 1px solid #ee3f02;
	background-color: #ee3f02;
}

.addPost::before{
	content: '';
	position: absolute;
	top: 50%;
	left: 50%;
	width: 80px;
	height: 80px;
	margin-top: -40px;
	margin-left: -40px;
	background-image: url(/svg/add.svg);
	background-position: center center;
	background-repeat: no-repeat;
	background-size: contain;
}

@media only screen and (max-width: 1199px){
	.item{
		width: calc(100%/2 - 30px);
	}
}

@media only screen and (max-width: 639px){
	.item{
		width: calc(100% - 30px);
	}
}
</style>