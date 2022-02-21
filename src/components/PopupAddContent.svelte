<script>
    import { createEventDispatcher } from 'svelte';

    import VisualEditor from '../components/VisualEditor.svelte';
    import BtnClose from '../components/BtnClose.svelte';
    import Button from '../components/Button.svelte';
    import ButtonUploadFile from '../components/ButtonUploadFile.svelte';
    import Cropper from "svelte-easy-crop";
    import { addPost, savePost, uploadImage } from '../requests';
    import { cropImage } from '../domain';

    export let isOpen = false;
    export let fields = [];
    export let content = [];
    export let typeEvent = '';
    export let category = '';
    export let extClass = '';

    const dispatch = createEventDispatcher();

    let data = [];

    let cropData;
    let isUploadImage;

    fields.forEach(function(item){
        if(item.type == 'image'){
            data.push({ 
                field: item.field, 
                type: item.type, 
                value: content[item.field], 
                alt: item.alt ? item.alt : '', 
                cropSize: item.cropSize ? item.cropSize : {width: 400, height: 400}, 
                Required: item.Required ? item.Required : {isRequired: false, isError: false} 
            });
        }else{
            data.push({ 
                field: item.field, 
                type: item.type, 
                value: content[item.field],
                placeHolder: item.placeHolder ? item.placeHolder : '',
                Required: item.Required ? item.Required : {isRequired: false, isError: false} 
            }); 
        }
    });

    function closePopup(){
        isOpen = !isOpen;
    }

    function inputFocus(i){
        data[i].Required.isError = false;
    }

    async function saveData(){
        for (const item of data) {
            if (item.type !== 'image') {
                content[item.field] = item.value;
                continue;
            }
            content['image_alt'] = item.alt;
            if (!isUploadImage && item.cropSize.width === cropData.width && item.cropSize.height === cropData.height) {
                content['image'] = item.value;
                continue;
            }
            const blob = await cropImage(item.value, cropData, item.cropSize, 'image/jpeg');
            content['image'] = await uploadImage('image/jpeg', blob);
        }

        savePost(content);

        dispatch('updateData', {
            id: content.id
        });

        isOpen = !isOpen;
    }

    async function addData() {
        const contentAdd = {};
        let errorsData = 0;

        data.forEach(function(item, index){
            if(item.Required.isRequired){
                if(item.value == undefined || item.value == ''){
                    data[index].Required.isError = true;
                    errorsData++;
                }else{
                    data[index].Required.isError = false;
                }
            }
        });

        if (errorsData !== 0) return;

        for (const item of data) {
            if (item.type !== 'image') {
                contentAdd[item.field] = item.value;
                continue;
            }
            contentAdd['image_alt'] = item.alt;
            if (!item.value) {
                contentAdd['image'] = '';
                continue;
            }
            const blob = await cropImage(item.value, cropData, item.cropSize, 'image/jpeg');
            contentAdd['image'] = await uploadImage('image/jpeg', blob);
        }

        const newPostID = await addPost(contentAdd, {cat : category});

        contentAdd["id"] = newPostID;

        dispatch('insertData', {
            newPost: contentAdd
        });

        isOpen = !isOpen;
    }
</script>
<div class="glass" class:open={isOpen}>
    <div class="popup {extClass}">
        <BtnClose on:click={closePopup}/>
        <div class="content">
            {#each data as line, index}
                <div class="line {line.Required.isError ? 'error' : ''}">
                    {#if line.type == 'input'}
                        <input class="input" on:focus={() => inputFocus(index)} type="text" bind:value="{line.value}" placeholder="{line.placeHolder}" />
                    {/if}
                    {#if line.type == 'textarea'}
                        <VisualEditor bind:textEditor={line.value} />
                    {/if}
                    {#if line.type == 'image'}
                        <div class="cropper">
                            <Cropper 
                                image={line.value}
                                crop={{ x: 0, y: 0 }}
                                zoom={1}
                                minZoom={0.8}
                                maxZoom={2}
                                cropSize = {{ width: line.cropSize.width, height: line.cropSize.height }}
                                zoomSpeed={0.1}
                                restrictPosition={false}
                                on:cropcomplete={(event) => cropData = event.detail.pixels}
                            />
                        </div>
                        <div class="imgInfo">
                            <ButtonUploadFile bind:imgFile={line.value} bind:imgUpload={isUploadImage} />
                            <input class="imgName" bind:value={line.alt} placeholder="Название картинки" />
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
        {#if typeEvent == 'Update'}
        <div class="controlsline">
            <Button title="Сохранить" on:click={saveData} />
        </div>
        {/if}
        {#if typeEvent == 'Add'}
        <div class="controlsline">
            <Button title="Добавить" on:click={addData} />
        </div>
        {/if}
    </div>
</div>

<style>
.glass{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    display: none;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
}

.glass.open{
    display: flex;
}

.popup{
    position: relative;
    width: calc(100% - 40px);
    max-width: 640px;
    box-sizing: border-box;
    padding: 50px 20px 20px 20px;
    background-color: #fff;
}

.popup.big{
    max-width: 1024px;
}

.content{
    float: left;
    width: 100%;
    padding-top: 10px;
}

.line{
    float: left;
    width: 100%;
    margin-bottom: 15px;
}

.line:last-child{
    margin-bottom: 0;
}

.input{
    float: left;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding: 0 10px;
    outline: none;
}

.line.error .input{
    border: 1px solid red;
}

.controlsline{
    float: left;
    width: 100%;
    margin-top: 15px;
    text-align: right;
}

.cropper{
    position: relative;
    float: left;
    width: 100%;
    height: 460px;
    overflow: hidden;
    margin-bottom: 5px;
}

.imgInfo{
    float: left;
    width: 100%;
    display: flex;
    align-items: center;
}

.imgName{
    flex-grow: 1;
    height: 34px;
    box-sizing: border-box;
    margin-left: 15px;
    padding: 0 10px;
    outline: none;
    border: 1px solid rgba(0,0,0,0.5);
}
</style>