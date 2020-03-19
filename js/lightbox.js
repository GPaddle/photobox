import * as PL from "./photoloader.js"
import * as gallery from "./gallery.js"


let lightbox_container = document.querySelector("#lightbox_container")
let body = document.querySelector("body");
let details = document.querySelector("#details");
let lightBox = document.querySelector("#lightbox_full_img")

// let gallery = document.querySelector("#gallery");

let currentPic;
let prevPic;
let nextPic;

let allPics;

let url;


export function setURL(p_url) {
	url = p_url;
}

export function afficher() {
	document.querySelector("#lightbox_title").innerHTML = this.title;

	let img = document.querySelector("#lightbox_full_img");
	img.src = this.data_image;
	img.addEventListener("load", close);
}

function afficherInterne(objet) {

	// console.log(objet.photo)
	document.querySelector("#lightbox_title").innerHTML = objet.photo.titre;

	let img = document.querySelector("#lightbox_full_img");
	img.src = url + objet.photo.original.href;
	img.addEventListener("load", close);


}

export function close() {
	lightbox_container.classList.toggle("hidden");
	lightbox_container.classList.toggle("scroll");
	body.classList.toggle("noScroll");
}

export function detail(element) {
	let idPhoto = element.photo.id;
	PL.init({
		"url": "https://webetu.iutnc.univ-lorraine.fr"
	})
	PL.getData("/www/canals5/photobox/photos/" + idPhoto)
		.then(function (response) {
			chargeInsert(response);

			PL.getData("/www/canals5/photobox/photos/" + idPhoto + "/comments")
				.then(function (response) {
					chargeInsertCommentaire(response);
				})
				.catch(function (error) {
					console.log('Erreur dans le chargement : ' + error);
				})

		})
		.catch(function (error) {
			console.log('Erreur dans le chargement : ' + error);
		})


}

function chargeInsert(response) {

	insertDatas(response.data);
}

let nextPage;
let prevPage;

export function setPrevNextPage(p_next, p_prev) {
	nextPage = p_next;
	prevPage = p_prev;
}

function insertDatas(d) {
	document.querySelector("#titre").innerHTML = "<div class='Description'>Titre :</div> " + d.photo.titre;
	document.querySelector("#descr").innerHTML = "<div class='Description'>Description :</div> " + d.photo.descr;
	document.querySelector("#format").innerHTML = "<div class='Description'>Format :</div> " + d.photo.format;
	document.querySelector("#type").innerHTML = "<div class='Description'><i class='fas fa-paint-brush'></i> Type :</div> " + d.photo.type;
	document.querySelector("#size").innerHTML = "<div class='Description'><i class='fas fa-weight'></i> Taille :</div> " + d.photo.size + " octets";
	document.querySelector("#width").innerHTML = "<div class='Description'><i class='fas fa-ruler-horizontal'></i> Largeur :</div> " + d.photo.width + " px";
	document.querySelector("#height").innerHTML = "<div class='Description'><i class='fas fa-ruler-vertical'></i> Hauteur :</div> " + d.photo.height + " px";


	let ajoutCommentaire = document.querySelector("#ajoutCommentaire");

	ajoutCommentaire.innerHTML = `
	<div id="form">
                    <form>
                        <div>
                            <input type="text" placeholder="Votre pseudo" id="formPseudo">
                        </div>

                        <div>
                            <input type="text" placeholder="Titre de votre message" id="formTitre">
                        </div>
                        <div>
                            <input type="text" placeholder="Contenu de votre message" id="formTxt">
                        </div>
                        <div>
                            <button type="button" id="formButton">Envoyer</button>
                        </div>
                    </form>
                </div>
	`;

	document.querySelector("#formButton").addEventListener("click", function () {
		let data = {
			"titre": document.querySelector("#formTitre").value,
			"content": document.querySelector("#formTxt").value,
			"pseudo": document.querySelector("#formPseudo").value,
			"id": d.photo.id
		}


		PL.postComment(`/www/canals5/photobox/photos/${d.photo.id}/comments`, data);

		document.querySelector("#formTitre").value = "";
		document.querySelector("#formTxt").value = "";
		document.querySelector("#formPseudo").value = "";

	})

}

export function chargeInsertCommentaire(response) {

	let commentaires = response.data.comments;
	let commentairesHTML = document.querySelector("#ListeCommentaires");
	commentairesHTML.innerHTML = "";


	commentaires.forEach(element => {
		commentairesHTML.innerHTML += `
		<div class="commentaire">
			<div class='TitreCommentaire'>${element.titre}</div>
			<div class='PseudoCommentaire'><i class="far fa-user"></i> ${element.pseudo}</div>
			<div class='DateCommentaire'>${element.date}</div>
			<div class='ContentCommentaire'>${element.content}</div>

		</div>` ;

	});

}

function page(objetPage) {
	close();
	insertDatas(objetPage);

	//	console.log(objetPage)

	document.querySelector("#lightbox_title").innerHTML = objetPage.photo.titre;
	let img = document.querySelector("#lightbox_full_img");
	//	console.log(url + objetPage.photo.original.href);
	img.src = url + objetPage.photo.original.href;
	//	img.addEventListener("load", close);


	PL.getData("/www/canals5/photobox/photos/" + objetPage.photo.id + "/comments")
		.then(function (response) {
			chargeInsertCommentaire(response);
		})
		.catch(function (error) {
			console.log('Erreur dans le chargement : ' + error);
		})


	detail(objetPage);


	setPrevNext(objetPage, allPics);
}

export function fPrevPic() {
	if (prevPic) {
		page(prevPic);
	} else {
		if (prevPage) {
			transformationPage(prevPage);
		} else {
			console.error("Pb prev");
		}
	}
}

export function fNextPic() {
	if (nextPic) {
		page(nextPic);
	} else {
		if (nextPage) {
			transformationPage(nextPage);
		} else {
			console.error("Pb next");
		}
	}
}

export function setListe(tab) {
	allPics = tab;
}

function transformationPage(p_page) {
	gallery.chargeInsert(p_page);

	let begin = nextPage == p_page ? false : true;

	close();
	PL.getData(p_page)
		.then(function (response) {
			let tmp = begin ? response.data.photos[response.data.photos.length - 1] : response.data.photos[0];
			afficherInterne(tmp)
			detail(tmp);
			setPrevNext(tmp, response.data.photos);
		})
		.catch(function (error) {
			console.log('Erreur dans le chargement : ' + error);
		});
}



export function setPrevNext(element, tableau) {

	// console.log("element");
	// console.log(element);
	// console.log(tableau);
	// console.log("tableau");

	allPics = tableau;

	for (let i = 0; i < tableau.length; i++) {
		const element2 = tableau[i];

		if (element2 == element) {
			currentPic = element;
			if (i > 0) {
				prevPic = tableau[i - 1];
			} else {
				// prevPic = tableau[tableau.length-1];		
				prevPic = null;
			}

			if (i < tableau.length - 1) {
				nextPic = tableau[i + 1];
			} else {
				// nextPic = tableau[0];
				nextPic = null;
			}

			document.querySelector("#changeLeft").addEventListener("click", fPrevPic);
			document.querySelector("#changeRight").addEventListener("click", fNextPic);

			break;
		}
	}
}


export function changeTheme() {

	document.querySelector("#lightbox").classList.toggle("darkTheme");

}