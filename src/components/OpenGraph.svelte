<script>
    export let opengraph = {title: 'Frontend Expert', description: 'Сайт фронтенд разработчика'};
</script>

<title>{opengraph.title}</title>
<meta name="description" content="{opengraph.description}" />
<meta property="og:type" content="{opengraph.og_type}" />
<meta property="og:title" content="{opengraph.og_title}" />
<meta property="og:description" content="{opengraph.og_description}" />
<meta property="og:url" content="{opengraph.og_url}">
<meta property="og:image" content="{opengraph.og_image}">
<meta property="og:image:type" content="{opengraph.og_image_type}" />
<meta property="og:image:width" content="{opengraph.og_image_width}">
<meta property="og:image:height" content="{opengraph.og_image_height}">
<meta name="twitter:title" content="{opengraph.og_title}">
<meta name="twitter:description" content="{opengraph.og_twitter_description}">
{#if opengraph.og_type === 'profile'}
<meta property="og:profile:first_name" content="{opengraph.og_profile.first_name}" />
<meta property="og:profile:last_name" content="{opengraph.og_profile.last_name}" />
<meta property="og:profile:username" content="{opengraph.og_profile.username}" />
<meta property="og:profile:gender" content="{opengraph.og_profile.gender}" />
{/if}