import getData from "../dal.js"
//
const dataPath = "data.json";
const params = (new URL(window.location.href)).searchParams;

const app = {
    data: {},
    page: params.get('page') || "preview",
    async run(){
        this.data = await getData(dataPath);
        console.log(this.data);
        console.log(this.page);
        view(this.data[this.page]);
       // console.log(this.data[this.page]);
    }
}

function view(page){
    const article = document.createElement('article');
    const h1 = document.createElement('h1');
    h1.textContent = page.title;
    const img = document.createElement('img');
    img.src = page.img;
    const audio = document.createElement('audio');
    audio.src = page.audio;
    audio.controls = true;
    const as = [];
    let a = null;
    for(let opt in page.options){
        a = document.createElement('a');
        a.textContent = opt;
        a.setAttribute('href',`?page=${page.options[opt]}`);
        as.push(a);
    }
    article.append(h1, img, audio, ...as);
    document.body.append(article);
}

try {
    app.run();
} catch (ex){
    console.log(ex);
} 