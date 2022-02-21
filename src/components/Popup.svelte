<script>
    export let isOpen = false;

    function closePopup(){
        isOpen = false;
    }
</script>

<div class="glass" class:open={isOpen}>
    <div class="popup">
        <div class="title">
            <slot name="title"></slot>
            <span class="close" on:click={closePopup}></span>
        </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</div>

<style>
.glass{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: none;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.5);
}

.glass.open{
    display: flex;
}

.popup{
    width: max-content;
    max-width: calc(100% - 40px);
    height: max-content;
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    background-color: #fff;
}

.title{
    position: relative;
    width: 100%;
    min-height: 40px;
    display: flex;
    align-items: center;
    background-color: #423232;
    box-sizing: border-box;
    padding: 0 10px;
    color: #fff;
    font-size: 14px;
}

.close{
    position: absolute;
    top: 5px;
    right: 5px;
    width: 30px;
    height: 30px;
    background-image: url(/svg/close-white.svg);
    background-position: center center;
    background-repeat: no-repeat;
    cursor: pointer;
}

.content{
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
}

.content:empty{
    padding: 0;
}

@media only screen and (max-width: 639px){

}
</style>