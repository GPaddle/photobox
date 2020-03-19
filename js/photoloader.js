import * as LB from "./lightbox.js"

let url;

export function init(tab) {
	if (url === undefined) {
		url = tab["url"];
	}
}

export function getData(uri) {
	//	console.log("uri : "+uri+"\n\nget data : "+url + uri)

	return axios.get(url + uri, {
		withCredentials: true,
		responseType: "json"
	})

}

export function postComment(p_uri, p_data) {

	console.log(p_data);


	if (!p_data.titre) {
		console.log("Champs manquant titre");
		return;
	}
	if (!p_data.content) {
		console.log("Champs manquant content")
		return;
	}
	if (!p_data.pseudo) {
		console.log("Champs manquant pseudo")
		return;
	}

	console.log(url + p_uri)

	let data = {
		"titre": p_data.titre,
		"content": p_data.content,
		"pseudo": p_data.pseudo
	}

	// console.log(url+p_uri);

	axios.post(url + p_uri, data)
		.then(function (res) {

			console.log(res)
			getData(`/www/canals5/photobox/photos/${p_data.id}/comments`)
				.then(function (response) {

					LB.chargeInsertCommentaire(response);
				})
				.catch(function (error) {
					console.log('Erreur dans le chargement : ' + error);
				})

		})
		.catch(function (err) {
			console.log(err);
			console.log(err.message);
		});
}