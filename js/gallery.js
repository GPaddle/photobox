import * as PL from './photoloader.js'
import * as LB from './lightbox.js'

let idGalerie;
let url;
let listePhotos;
let currentPic;

export function init(tab) {

	PL.init(tab)
	url = tab["url"];
	idGalerie = tab["idGalerie"];

}


function resContent() {
	document.querySelector("#photobox-gallery").innerHTML = "";
}


export function nextPage() {
	let href = this.href;
	PL.getData(href)
		.then(function (response) {
			resContent();
			chargeInsert(href);
		})
		.catch(function (error) {
			console.log('Erreur dans le chargement : ' + error);
		})
}
export function prevPage() {
	let href = this.href;
	PL.getData(href)
		.then(function (response) {
			resContent();
			chargeInsert(href);
		})
		.catch(function (error) {
			console.log('Erreur dans le chargement : ' + error);
		})
}

export function chargeInsert(p_url) {
	PL.getData(p_url)
		.then(function (response) {

			listePhotos = response.data.photos;
			let data = response.data;
			genereEtInsert(response.data);


		})
		.catch(function (error) {
			console.log('Erreur dans le chargement : ' + error);
		});
}

function genereEtInsert(datas) {
	let gContent = document.querySelector("#photobox-gallery");

	gContent.innerHTML = "";

	let next = datas.links.next.href;
	let prev = datas.links.prev.href;
	let first = datas.links.first.href;
	let last = datas.links.last.href;

	LB.setPrevNextPage(next, prev);
	LB.setListe(listePhotos);
	document.querySelector("#next").href = next
	document.querySelector("#previous").href = prev

	// console.log(datas);

	datas.photos.forEach(element => {
		let content = `
		<div class="vignette">
			<img data-img="${url + element["photo"]["original"]["href"]}"
				data-uri="${url + element["links"]["self"]["href"]}"
				src="${url + element["photo"]["thumbnail"]["href"]}">
			<div>${element["photo"]["titre"]}</div>

		</div>
		
		`;


		let p = document.createElement("div");
		p.innerHTML = content;
		p.data_image = url + element["photo"]["original"]["href"];
		p.data_uri = url + element["links"]["self"]["href"];
		p.src = url + element["photo"]["thumbnail"]["href"];
		p.title = element["photo"]["titre"];

		p.addEventListener("click", LB.afficher)
		p.addEventListener("click", function () { LB.detail(element) });
		p.addEventListener("click", function () { LB.setPrevNext(element, listePhotos) });


		gContent.append(p);
	});

}

export function changeTaille(size) {
	let vignettes = document.querySelectorAll(".vignette");

	vignettes.forEach(element => {
		// console.log(size);
		element.style.maxWidth = size + "px";
		element.style.width = size + "px";
	});
}

export function changeTheme() {
	
	let body = document.querySelector("body");

	body.classList.toggle("darkTheme");

	if (body.classList.contains("darkTheme")) {
		this.innerHTML = `<i class="far fa-sun"></i>`;
	}else{
		this.innerHTML = `<i class="far fa-moon"></i>`;
	}

}