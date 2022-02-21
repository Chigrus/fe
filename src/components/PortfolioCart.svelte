<script>
    export let postPortfolio = {};
</script>

<div class="block {postPortfolio.type}">
    <div class="image">
        <img src="{postPortfolio.image}" alt="{postPortfolio.title}" />
        <span class="icon"></span>
    </div>
    <div class="subtitle">{postPortfolio.type}</div>
    <div class="title">{@html postPortfolio.title}</div>
    <!-- <div class="more">Подробнее</div> -->
    <div class="bottom">
        <div class="list">{postPortfolio.subtitle}</div>
        <a href="{postPortfolio.link}" class="link" target="_blank">Перейти на сайт</a>
    </div>
</div>

<style>
.block{
    width: calc(100%/3 - 30px);
    margin: 15px;
    background-color: #fff;
    box-sizing: border-box;
    padding: 2px;
}

.image{
    position: relative;
}

.image img{
    max-width: 100%;
    height: auto;
    vertical-align: bottom;
}

.icon{
    position: absolute;
    left: 50%;
    bottom: -20px;
    width: 40px;
    height: 40px;
    background-color: #ff835f;
    margin-left: -20px;
    transform: rotate(45deg);
    transform-origin: center center;
}

.icon::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(-45deg);
    transform-origin: center center;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 24px 24px;
}

.block.svelte .icon::before{
    background-image: url(/svg/iSvelte.svg);
}

.block.html .icon::before{
    background-image: url(/svg/iHtml.svg);
}

.block.bitrix .icon::before{
    background-image: url(/svg/iBitrix.svg);
}

.block.wordpress .icon::before{
    background-image: url(/svg/iWordpress.svg);
}

.subtitle{
    width: 100%;
    text-align: center;
    margin-top: 35px;
    font-size: 14px;
    text-transform: uppercase;
}

.title{
    width: 100%;
    text-align: center;
    margin-top: 20px;
    font-size: 18px;
    line-height: 22px;
    font-weight: bold;
    box-sizing: border-box;
    padding: 0 20px;
    margin-bottom: 30px;
}

/* .more{
    width: 100%;
    text-align: center;
    color: #ee3f02;
    font-size: 14px;
    margin-top: 15px;
    margin-bottom: 20px;
} */

.bottom{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 36px;
    background-color: #f4f4f4;
    box-sizing: border-box;
    padding: 0 15px;
    font-size: 12px;
}

.list{
    display: flex;
}

@media only screen and (max-width: 1023px){
    .block{
        width: calc(100%/2 - 30px);
    }
}

@media only screen and (max-width: 767px){
    .block{
        width: calc(100%/2 - 20px);
        margin: 10px;
    }
    .bottom{
        font-size: 11px;
    }
}

@media only screen and (max-width: 639px){
    .block{
        width: calc(100%);
        max-width: 400px;
        margin: 15px 0;
    }
    .bottom{
        font-size: 12px;
    }
}
</style>