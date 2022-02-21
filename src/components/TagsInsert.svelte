<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function addNodeClick(tag) {
        let contentNode;
        if(tag === 'ul' || tag === 'ol'){
            contentNode = '<li>Пункт списка</li>';
        }else if(tag === 'quote'){
            contentNode = {
                title: 'Заголовок', text: 'Текст'
            };
        }else{
            contentNode = '';
        }
        dispatch('onSelectNode', {
            typeNode: tag,
            contentInner: contentNode
        });
    }

    let tags = [
        {type: 'h1', title: "Заголовок"},
        {type: 'h2', title: "Заголовок"},
        {type: 'h3', title: "Заголовок"},
        {type: 'h4', title: "Заголовок"},
        {type: 'p', title: "Абзац"},
        {type: 'ul', title: "Список"},
        {type: 'ol', title: "Список"},
        {type: 'code', title: "Код"},
        {type: 'noindex', title: "Пример"},
        {type: 'quote', title: "Цитата"},
    ];
</script>

<div class="tags">
    {#each tags as tag}
        <div class="tag {tag.type}" on:click={() => addNodeClick(tag.type)}>
            {tag.title}
        </div>
    {/each}
</div>

<style>
.tags{
    display: flex;
    flex-wrap: wrap;
    max-width: 440px;
}

.tag{
    position: relative;
    width: 100px;
    margin: 5px;
    text-align: center;
    font-size: 14px;
    color: #000;
    border: 1px solid rgba(0,0,0,0.05);
    border-radius: 3px;
    box-sizing: border-box;
    padding: 60px 5px 5px 5px;
    cursor: pointer;
}

.tag:hover{
    border: 1px solid rgba(0,0,0,0.3); 
}

.tag:before{
    content: '';
    position: absolute;
    top: 5px;
    left: 50%;
    width: 50px;
    height: 50px;
    margin-left: -25px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
}

.tag.h1:before{
    background-image: url(/svg/tag-h1.svg);
}

.tag.h2:before{
    background-image: url(/svg/tag-h2.svg);
}

.tag.h3:before{
    background-image: url(/svg/tag-h3.svg);
}

.tag.h4:before{
    background-image: url(/svg/tag-h4.svg);
}

.tag.p:before{
    background-image: url(/svg/tag-p.svg);
}

.tag.ul:before{
    background-image: url(/svg/tag-ul.svg);
}

.tag.ol:before{
    background-image: url(/svg/tag-ol.svg);
}

.tag.code:before{
    background-image: url(/svg/tag-code.svg);
}

.tag.noindex:before{
    background-image: url(/svg/tag-noindex.svg);
}

.tag.quote:before{
    background-image: url(/svg/tag-quote.svg);
}
</style>