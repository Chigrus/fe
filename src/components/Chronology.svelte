<script>
    import { isAdmin } from '../store.js';
	import BtnEdit from '../components/BtnEdit.svelte';

    export let title = 'Заголовок';
    export let catName = '';
    export let data = [];
</script>

<div class="chronology">
    <div class="title {catName}">{title}</div>
    <div class="content">
        {#each data as post}
            <div  class="item">
                {#if $isAdmin}
                <BtnEdit 
                    on:getData 
                    dataEdit={post} 
                    typeEvent='Update'
                    fields={[
                        {field: 'title', type: 'input'}, 
                        {field: 'subtitle', type: 'input'},
                        {field: 'text', type: 'textarea'}
                    ]} 
                />
                {/if}
                <span class="date">{post.subtitle}</span>
                <h2 class="itemTitle">{post.title}</h2>
                <div class="itemText">{@html post.text}</div>
            </div>
        {/each}
    </div>
</div>

<style>
.chronology{
    float: left;
    width: 100%;
    padding: 50px 0;
}

.title{
    position: relative;
    display: flex;
    align-items: flex-end;
    min-height: 100px;
    font-size: 48px;
    color: #010101;
    font-weight: bold;
    padding-left: 110px;
}

.title::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    box-sizing: border-box;
    border: 1px solid #423232;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 80% auto;
}

.title.education::before{
    background-image: url(/svg/educationIcon.svg);
}

.title.career::before{
    background-image: url(/svg/realmen.svg);
}

.content{
    position: relative;
    float: left;
    width: 100%;
    margin-top: 60px;
    box-sizing: border-box;
    padding-left: 110px;
}

.item{
    position: relative;
    float: left;
    width: calc(100% - 120px);
    box-sizing: border-box;
    margin-left: 120px;
    border-left: 2px solid #423232;
    padding-left: 30px;
    padding-bottom: 20px;
}

.item:last-child{
    padding-bottom: 0;
}

.item::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    background-color: #423232;
    border-radius: 50%;
    margin-left: -11px;
}

.date{
    position: absolute;
    top: -3px;
    left: -120px;
    font-size: 18px;
    font-weight: bold;
}

.itemTitle{
    max-width: 450px;
    font-size: 20px;
    line-height: 1.3em;
    font-weight: bold;
}

.itemText{
    float: left;
    width: 100%;
}

:global(.itemText h3){
    font-size: 18px;
    font-weight: bold;
}

@media only screen and (max-width: 940px){
    .content{
        padding-left: 0px;
    }
}

@media only screen and (max-width: 539px){
    .title{
        font-size: 40px;
    }

    .item{
        width: 100%;
        margin-left: 0;
        border-top: 2px solid #423232;
        border-left: none;
        padding-top: 30px;
        margin-top: 50px;
    }

    .item::before{
        top: -10px;
        left: 50%;
        margin-left: -10px;
    }

    .date{
        top: -50px;
        left: 0;
        font-size: 24px;
    }
}

@media only screen and (max-width: 479px){
    .title{
        font-size: 36px;
    }
}

@media only screen and (max-width: 360px){
    .title{
        font-size: 28px;
    }
}
</style>