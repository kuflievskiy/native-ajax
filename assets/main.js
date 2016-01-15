document.addEventListener("DOMContentLoaded", start);

function start(){
	
	document.getElementById("click-me").addEventListener("click", function(e) {
		
		loaderElement = document.getElementsByClassName("cssload-thecube")[0];
		loaderElement.style.display = 'block';
		
		ajax.send( 'response.php',
			{
				'name':document.getElementById('name').value
			},
			{
				'onSuccess' : function(response){
					var responseHolderElement = document.getElementById('ajax-response'),
						loaderElement = document.getElementsByClassName("cssload-thecube")[0];

					responseHolderElement.innerHTML = response;
					loaderElement.style.display = 'none';
				},
				'onFailed':function(response){
					// @todo : here you can show somethin in case of fail
				},
				'onSend':function(){
					var loaderElement = document.getElementsByClassName("cssload-thecube")[0];
					loaderElement.style.display = 'block';
				}
			}
		);
	});
}