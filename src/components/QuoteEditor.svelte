<script>
	export let post;

    import VisualEditor from '../components/VisualEditor.svelte';
</script>


<div class="quote">
    <VisualEditor 
        bind:textEditor={post.content.title}
        idEditor={1}
        buttons={['b', 'i']}
        isHeightAuto={true}
    />
    <VisualEditor 
        bind:textEditor={post.content.text}
        idEditor={2}
        buttons={['b', 'i']}
        isHeightAuto={true}
    />
</div>


<style>
.quote{
    position: relative;
    width: 100%;
    display: inline-block;
    box-sizing: border-box;
    padding: 10px;
    padding-left: 45px;
}

.quote::before{
    content: '';
    position: absolute;
    top: 10px;
    left: 20px;
    width: 5px;
    height: calc(100% - 20px);
    background-color: #cb442e;
}

:global(.quote .visualEditor){
    margin-bottom: 20px;
}

:global(.quote .visualEditor:last-child){
    margin-bottom: 0;
}

@media only screen and (max-width: 639px){

}
</style>