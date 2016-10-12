//handlebars -m handlebars/> public/js/templates.js

Handlebars.registerHelper('upper', function(str) {
	return str.toUpperCase()
});

Handlebars.registerHelper('ifEqual', function(a,b, opts){
	if(a==b){
		return opts.fn(this)
	}
	else {
		return opts.inverse(this)
	}
})

Handlebars.registerHelper('ifIn', function(a,b,opts){
	if(b.indexOf(a) > -1){
		return opts.fn(this)
	}
	else {
		return opts.inverse(this)
	}
})

Handlebars.registerHelper('ifDivisible', function(a,b,opts){
	if(a%3==0){
		return opts.fn(this)
	}else{
		return opts.inverse(this)
	}
})

$(document).ready(function(){

	var lastSelectedCategory = 'all'

	$("#carousel").carousel({
		interval: false,
		pause: null,
		wrap: true,
		keyboard: false
	})


	$(".verb").typed({
		strings: ['imagine','make','code','design','invent'],
		typeSpeed: 80,
		backSpeed: 30,
		backDelay: 1500,
		loop: true,
		showCursor: true,
		preStringTyped: function(curStringPos){

			$('#carousel').carousel('next')
			
			if(curStringPos == 2){
				// remove first blank png so that it doesnt show again
				$("#placeholder-slide").remove();
			}
			
		}
	})
	

	

	var list = [{"title":"row1a"},{"title":"row1b"},{"title":"row1c"},{"title":"row2a"},{"title":"row2b"},{"title":"row2c"},{"title":"row3a"}]

	//var html = Handlebars.templates.projectList({list:list})

	//$("#project-list").html(html)

	$("body").on('click', '.project-category', function(event){
		event.preventDefault();

		// save appropriate category to go back to

		lastSelectedCategory = $(this).attr('data-id')
		//load appropriate category

		console.log($(this).attr('data-id'))
	})

	function makeActive(dataId){
		//make all categories inactive
		// add active to clicked category
	}

	$("body").on('click', '.project-item', function(event){
		event.preventDefault();

		//load specific project
	})


})