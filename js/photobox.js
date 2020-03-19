import * as gallery from './gallery.js';
import * as LB from './lightbox.js';

window.addEventListener("onLoad", init());

function init() {
	let url = "https://webetu.iutnc.univ-lorraine.fr"
	let uri = "/www/canals5/photobox/photos/?offset=82&size=10";
	gallery.init({
		"url": url,
		"uri": uri
	});

	LB.setURL(url);

	// document.querySelector("#load_gallery").addEventListener("click", gallery.chargeInsert(uri));

	gallery.chargeInsert(uri)

	document.querySelector("#previous").addEventListener("click", gallery.prevPage);
	document.querySelector("#next").addEventListener("click", gallery.nextPage);

	document.querySelector("#lightbox_close").addEventListener("click", LB.close);
	document.querySelector("#taille").addEventListener("input", function () { 
		gallery.changeTaille(document.querySelector("#taille").value) 
	});
	
	document.querySelector("#theme").addEventListener("click", gallery.changeTheme);
	document.querySelector("#theme").addEventListener("click", LB.changeTheme);



}
