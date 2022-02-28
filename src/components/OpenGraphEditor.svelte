<script>
	import Popup from '../components/Popup.svelte';
	import VisualEditor from '../components/VisualEditor.svelte';
	import Button from '../components/Button.svelte';
	import Cropper from "svelte-easy-crop";
	import ButtonUploadFile from '../components/ButtonUploadFile.svelte';
	import { cropImage } from '../domain';
	import { saveOpenGraph, uploadImage } from '../requests';

    export let dataOpenGraph = {};
    export let isOpenGraphEdit = false;

    let cropData;
	let isUploadImage;
	let isEditOgImage = false;

	let cropSize = {width: 1200, height: 630};

    function clickEditOgImage(){
		isEditOgImage = true;
	}

	async function openGraphSave(){
		if (isUploadImage){
			const blob = await cropImage(dataOpenGraph.og_image, cropData, cropSize, 'image/jpeg', 1);
			dataOpenGraph.og_image = await uploadImage('image/jpeg', blob);
			dataOpenGraph.og_image = 'https://frontend-expert.ru' + dataOpenGraph.og_image;
		}
		saveOpenGraph(dataOpenGraph);
		isOpenGraphEdit = false;
	}
</script>

<Popup bind:isOpen="{isOpenGraphEdit}">
	<div slot="title">Редактировать Open Graph</div>
	<div class="og_content" slot="content">
		<div class="og_inner">
			<div class="line">
				<VisualEditor bind:textEditor="{dataOpenGraph.title}" idEditor="{dataOpenGraph.id}" isHeightAuto="true" isCounter="{{isShow: true, min: 40, max: 60}}" buttons={[]} title="<b>title</b> - длина от 40 до 60 символов" />
			</div>
			<div class="line">
				<VisualEditor bind:textEditor="{dataOpenGraph.description}" idEditor="{dataOpenGraph.id}" isHeightAuto="true" isCounter="{{isShow: true, min: 120, max: 135}}" buttons={[]} title="<b>description</b> - длина от 120 до 135 символов" />
			</div>
			<div class="line">
				<VisualEditor bind:textEditor="{dataOpenGraph.og_type}" idEditor="{dataOpenGraph.id}" isHeightAuto="true" buttons={[]} title="<b>og:type</b> - тип объекта (website, article, profile)" />
			</div>
			<div class="line">
				<VisualEditor bind:textEditor="{dataOpenGraph.og_title}" idEditor="{dataOpenGraph.id}" isHeightAuto="true" isCounter="{{isShow: true, min: 40, max: 60}}" buttons={[]} title="<b>og:title</b> - тег заголовка для микроразметки" />
			</div>
			<div class="line">
				<VisualEditor bind:textEditor="{dataOpenGraph.og_description}" idEditor="{dataOpenGraph.id}" isHeightAuto="true" isCounter="{{isShow: true, min: 120, max: 135}}" buttons={[]} title="<b>og:description</b> - тег описание объекта на странице" />
			</div>
			<div class="line">
				<VisualEditor bind:textEditor="{dataOpenGraph.og_url}" idEditor="{dataOpenGraph.id}" isHeightAuto="true" buttons={[]} title="<b>og:url</b> - каноническая ссылка" />
			</div>
			<div class="line">
				<div class="og_image_title">
					<b>og:image</b> - изображение поста
					<span class="btnEditOgImage" class:hide={isEditOgImage} on:click="{clickEditOgImage}"></span>
				</div>
				{#if isEditOgImage}
				<div class="cropper">
					<Cropper 
						image={dataOpenGraph.og_image}
						crop={{ x: 0, y: 0 }}
						zoom={1}
						minZoom={0.8}
						maxZoom={2}
						aspect = {1200/630}
						zoomSpeed={0.1}
						restrictPosition={false}
						on:cropcomplete={(event) => cropData = event.detail.pixels}
					/>
				</div>
				<div class="imgInfo">
					<ButtonUploadFile bind:imgFile={dataOpenGraph.og_image} bind:imgUpload={isUploadImage} />
				</div>
				{:else}
				<img src="{dataOpenGraph.og_image}" alt="" />
				{/if}
			</div>
		</div>
	</div>
	<div slot="bottom">
		<div class="lineSave">
			<Button title="Сохранить" on:click="{openGraphSave}" />
		</div>
	</div>
</Popup>

<style>
    .og_content{
        display: inline-block;
        padding-right: 10px;
        max-height: 60vh;
        overflow-y: auto;
    }
    
    .og_inner{
        width: 600px;
    }
    
    .line{
        width: 100%;
        display: inline-block;
        margin-bottom: 10px;
    }
    
    .line img{
        max-width: 100%;
        height: auto;
    }
    
    .line:last-child{
        margin-bottom: 0;
    }
    
    .og_image_title{
        position: relative;
        float: left;
        width: 100%;
        box-sizing: border-box;
        background-color: rgba(66, 50, 50, 0.1);
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-image: initial;
        padding: 5px;
    }
    
    .cropper{
        position: relative;
        float: left;
        width: 100%;
        height: 380px;
        overflow: hidden;
        margin-bottom: 5px;
        box-sizing: border-box;
    }
    
    .lineSave{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        border-top: 1px solid #423232;
        padding: 10px;
        box-sizing: border-box;
    }
    
    .btnEditOgImage{
        position: absolute;
        top: 2px;
        right: 2px;
        display: flex;
        width: 30px;
        height: 30px;
        cursor: pointer;
        background-image: url(/svg/edit.svg);
        background-size: 80%;
        background-position: center center;
        background-repeat: no-repeat;
    }
    
    .btnEditOgImage.hide{
        display: none;
    }
    </style>