<script>
	export let segment;

	let isOpenMenu = false;

	function openMobMenu(){
		isOpenMenu = !isOpenMenu;
	}

	function clickLink(){
		isOpenMenu = false;
	}
</script>

<div class="wrap wrap__mainmenu">
	<div class="work">
		<div class="mainmenu__container">
			<a class="logo" href="/"><span>frontend-expert</span>.ru</a>
			<nav class="mainmenu">
				<div class="mobmenu" class:open={isOpenMenu} on:click={openMobMenu}></div>
				<div class="container" class:open={isOpenMenu}>
					<ul class="list">
						<li class="item"><a class="link {segment === undefined ? 'curent' : undefined}" on:click={clickLink} href=".">Главная</a></li>
						<li class="item"><a class="link {segment === 'layout' ? 'curent' : undefined}" rel=prefetch on:click={clickLink} href="layout">Верстка</a></li>
						<li class="item"><a class="link {segment === 'js' ? 'curent' : undefined}" rel=prefetch on:click={clickLink} href="js">JS</a></li>
						<li class="item"><a class="link {segment === 'portfolio' ? 'curent' : undefined}" on:click={clickLink} href="portfolio">Портфолио</a></li>
						<li class="item"><a class="link {segment === 'about' ? 'curent' : undefined}" on:click={clickLink} href="about">О себе</a></li>
					</ul>
				</div>
			</nav>
		</div>
	</div>
</div>

<style>
.wrap__mainmenu{
	position: fixed;
	z-index: 100;
	top: 0;
	left: 0;
	background-color: #423232;
	border-bottom: 4px solid #ee3f02
}

.mainmenu__container{
	display: flex;
	width: 100%;
	height: 60px;
	align-items: center;
	justify-content: space-between;
}

.logo{
	color: #fff;
	font-size: 24px;
	text-decoration: none;
}

.logo span{
	text-transform: uppercase;
}

.list{
	margin: 0;
	padding: 0;
}

.item{
	display: block;
	float: left;
}

.link{
	display: flex;
	align-items: center;
	height: 60px;
	text-decoration: none;
	color: #fff;
	padding: 0 20px;
}

.link.curent{
	background-color: #ee3f02;
}

.mobmenu{
	display: none;
}

@media only screen and (max-width: 1023px){
	.mobmenu{
		display: flex;
		width: 40px;
		height: 40px;
		background-image: url(/svg/menu.svg);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 36px 36px;
	}

	.mobmenu.open{
		background-image: url(/svg/close-white.svg);
		background-size: 40px 40px;
	}

	.container{
		position: fixed;
		z-index: 10;
		top: 64px;
		left: -100%;
		width: 100%;
		height: calc(100vh - 64px);
		background: #ee3f02;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		transition-duration: .5s;
		transition-property: left;
	}

	.container.open{
		left: 0;
		transition-duration: .5s;
		transition-property: left;
	}

	.list{
		max-width: 400px;
	}

	.item{
		width: 100%;
	}

	.link{
		width: 100%;
		height: 50px;
		justify-content: center;
		box-sizing: border-box;
		text-transform: uppercase;
	}
}

@media only screen and (max-width: 339px){
	.logo{
		font-size: 20px;
	}
}
</style>