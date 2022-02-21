<script>
    export let post;
    export let isAdminV;

    import VisualEditorJson from '../components/VisualEditorJson.svelte';
    import BlocksEditor from '../components/BlocksEditor.svelte';
    import QuoteEditor from '../components/QuoteEditor.svelte';
</script>

{#if post.type === 'h1'}
    {#if isAdminV}
        <VisualEditorJson 
            bind:post={post} buttons={['b', 'i']}
            on:addPostNode
            on:upPostNode
            on:downPostNode
            on:delPostNode
        />
    {:else}
        <h1>{@html post.content}</h1>
    {/if}
{/if}

{#if post.type === 'h2'}
    {#if isAdminV}
        <VisualEditorJson 
            bind:post={post} buttons={['b', 'i']}
            on:addPostNode
            on:upPostNode
            on:downPostNode
            on:delPostNode
        />
    {:else}
        <h2>{@html post.content}</h2>
    {/if}
{/if}

{#if post.type === 'h3'}
    {#if isAdminV}
        <VisualEditorJson 
            bind:post={post} buttons={['b', 'i']}
            on:addPostNode
            on:upPostNode
            on:downPostNode
            on:delPostNode
        />
    {:else}
        <h3>{@html post.content}</h3>
    {/if}
{/if}

{#if post.type === 'h4'}
    {#if isAdminV}
        <VisualEditorJson 
            bind:post={post} buttons={['b', 'i']}
            on:addPostNode
            on:upPostNode
            on:downPostNode
            on:delPostNode
        />
    {:else}
        <h4>{@html post.content}</h4>
    {/if}
{/if}

{#if post.type === 'p'}
    {#if isAdminV}
        <VisualEditorJson 
            bind:post={post} buttons={['b', 'i']}
            on:addPostNode
            on:upPostNode
            on:downPostNode
            on:delPostNode
        />
    {:else}
        <p>{@html post.content}</p>
    {/if}
{/if}

{#if post.type === 'ul'}
    {#if isAdminV}
        <VisualEditorJson 
            bind:post={post} buttons={['viewHtml','b', 'i']}
            on:addPostNode
            on:upPostNode
            on:downPostNode
            on:delPostNode
        />
    {:else}
        <ul>{@html post.content}</ul>
    {/if}
{/if}

{#if post.type === 'ol'}
    {#if isAdminV}
        <VisualEditorJson 
            bind:post={post} buttons={['viewHtml','b', 'i']}
            on:addPostNode
            on:upPostNode
            on:downPostNode
            on:delPostNode
        />
    {:else}
        <ol>{@html post.content}</ol>
    {/if}
{/if}

{#if post.type === 'code'}
    {#if isAdminV}
        <VisualEditorJson 
            bind:post={post} buttons={['viewHtml']}
            isHtml={false}
            on:addPostNode
            on:upPostNode
            on:downPostNode
            on:delPostNode
        />
    {:else}
        <div class="code">{@html post.content}</div>
    {/if}
{/if}

{#if post.type === 'noindex'}
    {#if isAdminV}
        <VisualEditorJson 
            bind:post={post} buttons={['viewHtml']}
            isHtml={false}
            on:addPostNode
            on:upPostNode
            on:downPostNode
            on:delPostNode
        />
    {:else}
        <noindex>{@html post.content}</noindex>
    {/if}
{/if}

{#if post.type === 'quote'}
    {#if isAdminV}
        <BlocksEditor bind:post={post} on:addPostNode on:upPostNode on:downPostNode on:delPostNode>
            <slot slot="content">
                <QuoteEditor bind:post={post} />
            </slot>
        </BlocksEditor>
    {:else}
    <div class="quoteBlock">
        <div class="quoteTitle">{@html post.content.title}</div>
        <div class="quoteText">{@html post.content.text}</div>
    </div>
    {/if}
{/if}

<style>
.code{
    max-width: 100%;
    max-height: 350px;
    overflow: auto;
    padding: 2px 5px;
    background-color: rgba(0,0,0,0.05);
    border: 1px solid rgba(0,0,0,0.3);
    box-sizing: border-box;
    tab-size: 1em;
    font-size: 14px;
}

.quoteBlock{
    position: relative;
    display: inline-block;
    width: 100%;
    margin: 10px 0;
    box-sizing: border-box;
    padding: 15px 0 15px 110px;
}

.quoteBlock::before{
    content: '';
    position: absolute;
    top: 0;
    left: 92px;
    width: 3px;
    height: 100%;
    background-color: #cb442e;
}

.quoteBlock::after{
    content: '';
    position: absolute;
    top: 50%;
    left: 15px;
    width: 64px;
    height: 64px;
    margin-top: -32px;
    background-image: url(/svg/quoteBlock.svg);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}

.quoteTitle{
    display: inline-block;
    background-color: rgba(0,0,0,0.7);
    color: #fff;
    padding: 5px 15px;
}

.quoteText{
    display: inline-block;
    width: 100%;
    line-height: 1.5em;
    font-size: 16px;
    margin-top: 10px;
}
</style>
