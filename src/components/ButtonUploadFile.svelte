<script>
    export let title="Загрузить";
    export let imgFile;
    export let imgName = '';
    export let imgUpload = false;
    
    let  fileinput;

    function wertt(e){
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
            imgFile = e.target.result;
            imgName = image.name;
        };
        imgUpload = true;
    }
</script>

<style>
.btn{
    height: 34px;
    padding: 0 15px;
    background-color: #ee3f02;
    color: #fff;
    font-size: 14px;
    border: none;
    cursor: pointer;
    outline: none;
}

.btn:hover{
    background-color: #423232;
}

#btnUpload{
   display: none;
}
</style>

<button class="btn" on:click={()=>{fileinput.click();}}>{title}</button>
<input id="btnUpload" type="file" accept=".jpg, .jpeg, .png" on:change={wertt} bind:this={fileinput} />