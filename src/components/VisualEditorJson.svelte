<script>
	export let post;
    export let isHtml = true;
    export let isLook = false;
    export let buttons = ['viewHtml', 'p', 'b', 'i'];

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let selection, range, objEditor, objEditorID, curentRangeTag;

    let panel = [];

    function cutTegs(str) {
        const result = str.replace(/<[^>]+>/g,'');
        return result;
    }

    function viewHtml(i) {
        panel[i].isActive = !panel[i].isActive;
        isHtml = !isHtml;
    }

    buttons.forEach(function(button){
        if (button === 'viewHtml'){
            panel.push({ name: button, isActive: !isHtml });  
        }else{
            panel.push({ name: button, isActive: false });
        }
    });

    function onMouseUp(e) {
        selection = document.getSelection();
        range = selection.getRangeAt(0);
        curentRangeTag = range.startContainer.parentNode.nodeName;
        //всем кнопкам панели снять выделение
        panel.forEach(function(button){
            button.isActive = false;
        });
        //установить выделение кнопке соответствующей тегу где стоит курсор
        let idTag = panel.findIndex(tag => tag.name == curentRangeTag.toLowerCase());
        if(idTag >= 0){
            panel[idTag].isActive = true;
        }else{
            for (name in panel) {
              panel[name].isActive = false;
            }
        }

        objEditor = this;
        objEditorID = this.id;
    }

    function editorFocus() {
        //console.log(range)
    }

    function boldText(i) {

        //console.log(getCurrentCursorPosition('editorr'));

        if(range){
            if(panel[i].isActive){
                //Убираем тег <b> у всего жирного текста под курсором
                const posChar = getCurrentCursorPosition(objEditorID);
                const nodeText = document.createTextNode(cutTegs(range.startContainer.parentNode.innerHTML));
                range.selectNode(range.startContainer.parentNode);
                range.deleteContents();
                range.insertNode(nodeText);
                post.content = objEditor.innerHTML;
                panel[i].isActive = !panel[i].isActive;
                clearSelection();
                setCurrentCursorPosition(posChar);
            }else{
                const posChar = getCurrentCursorPosition(objEditorID);
                //Устанавливаем слово под курсором в тег <b>
                let newNode = document.createElement("b");
                if(range.collapsed){
                    range.expand('word'); //Если установлен только курсор, выделяем слово под ним, иначе будет браться выделение сделанное пользователем
                }
                range.surroundContents(newNode);
                post.content = objEditor.innerHTML;
                panel[i].isActive = !panel[i].isActive;
                clearSelection();
                setCurrentCursorPosition(posChar);
            }
        }
        else{
            console.log('Нет выделения');
        }

    }

    function italicText(i) {
        if(range){
            if(panel[i].isActive){
                //Убираем тег <b> у всего жирного текста под курсором
                const posChar = getCurrentCursorPosition(objEditorID);
                const nodeText = document.createTextNode(cutTegs(range.startContainer.parentNode.innerHTML));
                range.selectNode(range.startContainer.parentNode);
                range.deleteContents();
                range.insertNode(nodeText);
                post.content = objEditor.innerHTML;
                panel[i].isActive = !panel[i].isActive;
                clearSelection();
                setCurrentCursorPosition(posChar);
            }else{
                const posChar = getCurrentCursorPosition(objEditorID);
                //Устанавливаем слово под курсором в тег <b>
                let newNode = document.createElement("i");
                if(range.collapsed){
                    range.expand('word'); //Если установлен только курсор, выделяем слово под ним, иначе будет браться выделение сделанное пользователем
                }
                range.surroundContents(newNode);
                post.content = objEditor.innerHTML;
                panel[i].isActive = !panel[i].isActive;
                clearSelection();
                setCurrentCursorPosition(posChar);
            }
        }
        else{
            console.log('Нет выделения');
        }
    }

    function onKeyDown(e) {
    }

    function btnClick(){
        switch (this.name) {
            case 'viewHtml':
                viewHtml(this.value);
                break;
            case 'b':
                boldText(this.value);
                break;
            case 'i':
                italicText(this.value);
                break;
            case 'p':
                console.log('p');
                break;
            default:
                console.log('Для такой кнопки пока нет события');
        }
    }

    function clearSelection() {
        try {
            document.getSelection().removeAllRanges();
        } catch (e) {
            document.selection.empty();
        }
    }

    function isChildOf(node, parentId) {
        while (node !== null) {
            if (node.id === parentId) {
                return true;
            }
            node = node.parentNode;
        }

        return false;
    };

    function getCurrentCursorPosition(parentId) {
        var selection = window.getSelection(),
            charCount = -1,
            node;

        if (selection.focusNode) {
            if (isChildOf(selection.focusNode, parentId)) {
                node = selection.focusNode; 
                charCount = selection.focusOffset;

                while (node) {
                    if (node.id === parentId) {
                        break;
                    }

                    if (node.previousSibling) {
                        node = node.previousSibling;
                        charCount += node.textContent.length;
                    } else {
                        node = node.parentNode;
                        if (node === null) {
                            break
                        }
                    }
            }
        }
    }

        return charCount;
    };

    function createRange(node, chars, range) {
        if (!range) {
            range = document.createRange()
            range.selectNode(node);
            range.setStart(node, 0);
        }

        if (chars.count === 0) {
            range.setEnd(node, chars.count);
        } else if (node && chars.count >0) {
            if (node.nodeType === Node.TEXT_NODE) {
                if (node.textContent.length < chars.count) {
                    chars.count -= node.textContent.length;
                } else {
                    range.setEnd(node, chars.count);
                    chars.count = 0;
                }
            } else {
            for (var lp = 0; lp < node.childNodes.length; lp++) {
                    range = createRange(node.childNodes[lp], chars, range);

                    if (chars.count === 0) {
                        break;
                    }
                }
            }
        } 

        return range;
    };

    function setCurrentCursorPosition(chars) {
        if (chars >= 0) {
            var selection = window.getSelection();

            range = createRange(document.getElementById(objEditorID), { count: chars });

            if (range) {
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    };

</script>

<div class="visualEditor">
    <div class="panel">
        {#each panel as btn, i}
            <button class="btn" class:active={btn.isActive} on:click="{btnClick}" name="{btn.name}" value="{i}">{btn.name}</button>
        {/each}
        <div class="emptyFlex"></div>
        <button class="btn event add" title="Добавить" on:click={() => dispatch('addPostNode', {idPost: post.id})}></button>
        <button class="btn event up" title="Вверх" on:click={() => dispatch('upPostNode', {idPost: post.id})}></button>
        <button class="btn event down" title="Вниз" on:click={() => dispatch('downPostNode', {idPost: post.id})}></button>
        <button class="btn event remove" title="Удалить" on:click={() => dispatch('delPostNode', {idPost: post.id})}></button>
    </div>
    {#if isHtml}
        <div class="editor" id="editor{post.id}" contenteditable="true" on:mouseup={onMouseUp} on:keydown={onKeyDown} bind:innerHTML={post.content}></div>
    {:else}
        <div class="editor" contenteditable="true" spellcheck="false" bind:textContent={post.content}></div>
    {/if}
</div>
{#if isLook}
    <div class="look">{post.content}</div>
{/if}

<style>
.look{
    float: left;
    width: 100%;
    margin-top: 20px;
    box-sizing: border-box;
    padding: 20px;
    border: 1px solid gray;
}

.visualEditor{
    position: relative;
    width: 100%;
    display: inline-block;
    margin-bottom: 10px;
}

.panel{
    display: flex;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #423232;
    border-bottom: 0;
    padding: 5px;
    background-color: #423232;
}

.btn{
    float: left;
    height: 30px;
    min-width: 30px;
    border: none;
    padding: 0 5px;
    box-sizing: border-box;
    border: 1px solid #423232;
    cursor: pointer;
    margin-right: 5px;
    border-radius: 3px;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: center center;
}

.btn:last-child{
    margin-right: 0;
}
.btn.event:hover{
    background-color: #f68003;
}
.btn.remove{
    background-image: url(/svg/close.svg);
    background-size: 20px 20px;
}
.btn.add{
    background-image: url(/svg/add-black.svg);
    background-size: 20px 20px;
}
.btn.up{
    background-image: url(/svg/down.svg);
    background-size: 18px 18px;
    transform: rotate(180deg);
    transform-origin: center center;
}
.btn.down{
    background-image: url(/svg/down.svg);
    background-size: 20px 20px;
}

.btn.active{
    background-color: #f68003;
    color: #000;
}

.editor{
    float: left;
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #000;
    outline: none;
    overflow-y: auto;
}
</style>