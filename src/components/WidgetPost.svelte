<script>
    export let latestpost = {};
</script>

<a class="inner" href="/{latestpost.category}/{latestpost.slug}" rel="prefetch">
	<div class="preview">
		<img src="{latestpost.image}" alt="{latestpost.title}" />
	</div>
	<div class="title">{latestpost.title}</div>
</a>

<style>
.inner{
	display: block;
	width: 100%;
	margin-bottom: 15px;
	box-sizing: border-box;
	border: 1px solid rgba(0,0,0,0.1);
	cursor: pointer;
	text-decoration: none;
}

.inner:last-child{
	margin-bottom: 0;
}

.inner:hover{
	background-color: #cb442e;
}

.preview{
	width: 100%;
	box-sizing: border-box;
	border-bottom: 1px solid rgba(0,0,0,0.1);
}

.preview img{
	max-width: 100%;
	height: auto;
	vertical-align: bottom;
}

.title{
	width: 100%;
	font-size: 14px;
	box-sizing: border-box;
	padding: 10px;
	line-height: 1.2em;
}

.inner:hover .title{
	color: #fff;
}

@media only screen and (max-width: 639px){

}
</style>