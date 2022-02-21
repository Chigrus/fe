<script>
    import ButtonUploadFile from '../components/ButtonUploadFile.svelte';

    let dataFile = {
        imgFile: '',
        imgName: ''
    }

    function saveFile(){
        // fetch('/savefile', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         data: dataFile
        //     })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     //console.log(data)                
        // });

        getD();

    }

    // async function f1(){
    //     const res = await fetch('blog/posts.json?cat=about')
    //     fetch('blog/posts.json?cat=about');
    //     return res;
    // }
    // function f2(){
    //     console.log(2);
    // }
    // function f3(){
    //     console.log(3);
    // }

    // async function getD(){
    //     let dat = await f1();
    //     console.log(dat);
    //     f2();
    //     f3();
    // }



    function f2(){
        console.log(2);
    }
    function f3(){
        console.log(3);
    }

    async function getD(){
        let a = new Promise((resolve, reject) => {
            fetch('blog/posts.json?cat=about')
            .then(data => {
                resolve(data.json());
            })
        });

        const werd = await a.then(data => {
            return data;
        });
        
        console.log(werd);

        f2();
        f3();

        

        // Promise.all([a]).then(data => {
        //     console.log(data[0]);
        // })
    }
</script>

<div class="wrap">
	<div class="work">
        <div class="uploader">
		    <ButtonUploadFile bind:imgName={dataFile.imgName} bind:imgFile={dataFile.imgName} /><br><br>
            {dataFile.imgFile}<br><br>
            {dataFile.imgName}
            <div class="upload" on:click={saveFile}>Сохранить</div>
        </div>
	</div>
</div>

<style>
.uploader{
    width: 100%;
    margin-top: 50px;
}

.upload{
    display: inline-block;
    background-color: aqua;
    padding: 5px 15px;
    border-radius: 5px;
    cursor: pointer;
}
</style>