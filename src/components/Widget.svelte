<script>
    //export let title = 'Заголовок';
</script>

<div class="widget">
    <div class="title">
        <slot name="title"></slot>
    </div>
    <div class="content">
        <slot name="content"></slot>
    </div>
</div>

<style>
.widget{
	float: left;
	width: 100%;
	margin-bottom: 20px;
}

.title{
	float: left;
	width: 100%;
	font-weight: bold;
}

.content{
	float: left;
	width: 100%;
	margin-top: 10px;
}

@media only screen and (max-width: 639px){

}
</style>