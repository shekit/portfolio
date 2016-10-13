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

Handlebars.registerHelper('ifMoreThanOne', function(a,opts){
	if(a.length>1){
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
	var projectListContainer = $("#project-list")
	var projectDetailContainer = $("#project-detail-wrapper")

	$("#carousel").carousel({
		interval: false,
		pause: null,
		wrap: true,
		keyboard: false
	})

	$("#carousel-project-detail").carousel({
		interval: false,
		pause: true,
		wrap: true,
		keyboard: false
	})

	$(".verb").typed({
		//place space before strings otherwise doesnt render with html tags properly
		strings: [' <span class="question">question</span>',' <span class="make">make</span>',' <span class="code">code</span>',' <span class="design">design</span>',' <span class="invent">invent</span>'],
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

	function showProjects(projects){
		var listHtml = Handlebars.templates.projectList({projects:projects})
		projectListContainer.html(listHtml)
	}
	// SHOW ALL PROJECTS
	/*
	
	showProjects(projects);
	

	// SHOW PARTICULAR PROJECT

	$("body").on('click','.project-item-link', function(event){
		event.preventDefault();

		var projectSlug = $(this).data('id')
		var project = null;

		for(var i in projects){
			if(projects[i].slug == projectSlug){
				project = projects[i];
			}
		}

		var projectHtml = Handlebars.templates.projectDetail({project:project});
		projectDetailContainer.html(projectHtml)

		scrollToPlace();
	})
	

	function scrollToPlace(){
		$('html, body').animate({
			scrollTop: projectDetailContainer.offset().top
		},'fast')
	}

	// CLOSE PROJECT

	$("body").on('click','.project-detail-close', function(event){
		event.preventDefault();

		$(this).parent('#project-detail').remove();
	})
	*/

	$("body").on('click', '.project-category', function(event){
		event.preventDefault();

		// save appropriate category to go back to
		var category = $(this).data('id');

		makeActive(category);
		console.log(category)
		lastSelectedCategory = category;
		//load appropriate category

		var selectedProjects = null;

		for(var i in projects){
			if(projects[i].category.indexOf(category)>-1){
				selectedProjects.push(projects[i])
			}
		}

		showProjects(selectedProjects);

	})

	function makeActive(dataId){
		//make all categories inactive
		// add active to clicked category
		$(".project-category").removeClass('active');
		$('*[data-id="'+dataId+'"').addClass('active');
	}



})