// Hide the alert message on top of the form initially.
$("#submission-alert").hide();

function addComment(hash, date, name, url, message) {
    var template = document.getElementById('template--new-comment').innerHTML;

    template = template.replace('@hash', hash)
                       .replace('@date', date)
                       .replace('@name', name)
                       .replace('@message', message);

    if (url != '') {
        template = template.replace('@url', url);
    }

    console.log(template);
    $(template).insertBefore('.comments__description');
};

$('#comments-form').submit(function () {
    var formData = $(this).serializeArray();
   	var fieldsWithErrors = [];

   	$(formData).each((function (index, element) {
		var required = $(this).find('[name="' + element.name + '"]').attr('required');
   		var empty = (element.value.trim().length === 0);

    	if (required && empty) {
    		fieldsWithErrors.push(element.name);
    	}
   	}).bind(this));

	if (fieldsWithErrors.length === 0) {
   		var postUrl = $(this).attr('action');
   		var payload = $.param(formData);
        var name = $(this).find('[name="name"]').val().trim();

   		$.ajax({
   			type: 'POST',
   			url: postUrl,
   			data: payload,
   			success: function (response) {
                response = JSON.parse(response);
                response.name = name;

   				var comment = getComment(response);

				addComment(comment);
   			},
   			error: function (response) {
   				console.log('** ERROR!');
   				console.log(response);
   			}
   		});
    
   		$(this).get(0).reset();
	}

	return false;
});

function getComment(data) {
	var template = $('#template--new-comment').text();
	data.index = $('.js-comment').length;

	for (var variable in data) {
		var exp = '@' + variable;
		template = template.replace(exp, data[variable]);
	}
	return template;
}
function addComment(comment) {
    $("#submission-alert").fadeTo(5000, 500).slideUp(500, function() {
      $("#submission-alert").slideUp(500);
    });
}
