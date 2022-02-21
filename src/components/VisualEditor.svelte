<script>
	export let textEditor = '';
	export let idEditor = 0;
    export let isHtml = true;
    export let isLook = false;
    export let isHeightAuto = false;
    export let buttons = ['viewHtml', 'p', 'b', 'i','q'];
    
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
        panel.push({ name: button, isActive: false });
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
        const idTag = panel.findIndex(tag => tag.name == curentRangeTag.toLowerCase());
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

        //console.log(getCurrentCursorPosition(objEditorID));

        if(range){
            if(panel[i].isActive){
                //Убираем тег <b> у всего жирного текста под курсором
                const posChar = getCurrentCursorPosition(objEditorID);
                const nodeText = document.createTextNode(cutTegs(range.startContainer.parentNode.innerHTML));
                range.selectNode(range.startContainer.parentNode);
                range.deleteContents();
                range.insertNode(nodeText);
                textEditor = objEditor.innerHTML;
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
                textEditor = objEditor.innerHTML;
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
                textEditor = objEditor.innerHTML;
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
                textEditor = objEditor.innerHTML;
                panel[i].isActive = !panel[i].isActive;
                clearSelection();
                setCurrentCursorPosition(posChar);
            }
        }
        else{
            console.log('Нет выделения');
        }
    }

    function quoteText(i) {
        if(range){
            if(panel[i].isActive){
                //const posChar = getCurrentCursorPosition(objEditorID);
                panel[i].isActive = !panel[i].isActive;
                //clearSelection();
                //setCurrentCursorPosition(posChar);
            }else{
                const posChar = getCurrentCursorPosition(objEditorID);
                panel[i].isActive = !panel[i].isActive;


                let newNode = document.createElement('div');
                newNode.className = 'quoteBlock';
                newNode.innerHTML = '<div class="quoteTitle">Заголовок</div><div class="quoteText">Текст заметки</div>';
                range.insertNode(newNode);
                // console.log(range);


                textEditor = objEditor.innerHTML; 


                clearSelection();
                setCurrentCursorPosition(posChar+22);
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
            case 'q':
                quoteText(this.value);
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

<div class="visualEditor" class:height_auto={isHeightAuto}>
    <div class="panel">
        {#each panel as btn, i}
            <button class="btn" class:active={btn.isActive} on:click="{btnClick}" name="{btn.name}" value="{i}">{btn.name}</button>
        {/each}
    </div>
    {#if isHtml}
        <div class="editor" id="editor{idEditor}" contenteditable="true" on:mouseup={onMouseUp} on:keydown={onKeyDown} bind:innerHTML={textEditor}></div>
    {:else}
        <div class="editor" contenteditable="true" spellcheck="false" bind:textContent={textEditor}></div>
    {/if}
</div>
{#if isLook}
    <div class="look">{textEditor}</div>
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
        float: left;
		width: 100%;
    }
    .panel{
        float: left;
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #000;
        border-bottom: 0;
        padding: 5px;
    }
    .btn{
        float: left;
        height: 30px;
        min-width: 30px;
        border: none;
        padding: 0 5px;
        background-color: #fff;
        box-sizing: border-box;
        border: 1px solid #000;
        cursor: pointer;
        margin-right: 5px;
    }
    .btn.active{
        background-color: #000;
        color: #fff;
    }
	.editor{
		float: left;
		width: 100%;
		height: 600px;
		box-sizing: border-box;
		padding: 10px;
		border: 1px solid #000;
		outline: none;
        overflow-y: auto;
	}
	.height_auto .editor{
		height: auto;
	}
	:global(.editor p){
		margin: 0;
        padding: 7px 0;
	}
	:global(.editor .quoteBlock){
        position: relative;
        display: inline-block;
        width: 100%;
        margin: 10px 0;
        box-sizing: border-box;
        padding: 15px 0 15px 110px;
	}
	:global(.editor .quoteBlock::before){
        content: '';
        position: absolute;
        top: 0;
        left: 92px;
        width: 3px;
        height: 100%;
        background-color: #cb442e;
	}
	:global(.editor .quoteBlock::after){
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
    :global(.editor .quoteTitle){
        float: left;
        background-color: rgba(0,0,0,0.7);
        color: #fff;
        padding: 5px 15px;
    }
    :global(.editor .quoteText){
        float: left;
        width: 100%;
        line-height: 1.5em;
        font-size: 16px;
        margin-top: 10px;
    }
    :global(.editor .javascript),
    :global(.editor .sass),
    :global(.editor .html5){
        max-width: 100%;
        overflow-x: auto;
        padding: 2px 5px;
        background-color: rgba(0,0,0,0.05);
        border: 1px solid rgba(0,0,0,0.3);
        box-sizing: border-box;
        tab-size: 1em;
        -o-tab-size: 1em;
        -moz-tab-size: 1em;
    }
	:global(.editor p a){
        color: red;
	}
</style>