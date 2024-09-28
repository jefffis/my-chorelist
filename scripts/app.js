var header = document.querySelector('.header'),
	chores_list = document.querySelector('.chores'),
	chores = document.querySelectorAll('.cb'),
	done = document.querySelector('.done'),
	date_text = document.querySelector('.date-text'),
	running_count = 0,
	date = new Date(),
	options = {
	  weekday: "long",
	  // year: "numeric",
	  month: "long",
	  day: "numeric",
	},
	onboarding_step,
	onboarding_step_screen1 = document.querySelector('#intro--1'),
	onboarding_step_screen2 = document.querySelector('#intro--2'),
	my_name,
	my_name_field = document.querySelector('.intro--name'),
	show_my_name = document.querySelector('.personal-name'),
	show_my_name_header = document.querySelector('.personalize'),
	set_name = document.querySelector('.js--set-name'),
	app_icon = document.querySelectorAll('.app-icon'),
	my_app_icon,
	set_icon = document.querySelector('.js--set-icon'),
	current_logo = document.querySelector('.logo'),
	current_app_icon = document.querySelector('.app-icon-markup'),
	current_favicon = document.querySelector('.favicon-markup'),
	most_recent_date;

// if (localStorage.getItem('Last day used')) {
// 	localStorage.setItem('Last day used', date);
// 	console.log(localStorage.getItem('Last day used'));
// }

function doOnboarding() {
	my_name_field.onblur = function() {
	my_name = this.value;
	console.log(my_name);

	if(my_name != '') {
		set_name.disabled = false;
		// set_name.focus();
		show_my_name.innerHTML = my_name;
		show_my_name_header.innerHTML = my_name;
		localStorage.setItem('My name', my_name);
	}

	set_name.onclick = function() {
		onboarding_step_screen1.classList.add('hidden');
		setTimeout(function(){
			onboarding_step_screen2.classList.remove('hidden');
		}, 220);
	}

	app_icon.forEach(function(ai) {
		ai.onclick = function() {
			my_app_icon = this.src;
			localStorage.setItem('App icon', my_app_icon);
			console.log(my_app_icon);

			set_icon.disabled = false;
			current_logo.src = my_app_icon;
			current_app_icon.href = my_app_icon;
			current_favicon.href = my_app_icon;
		}
	});

	set_icon.onclick = function() {
		onboarding_step_screen2.classList.add('hidden');
		setTimeout(function(){
			window.scrollTo(0, 0);
			header.classList.remove('hidden');
			chores_list.classList.remove('hidden');
		}, 220);

		has_onboarded = localStorage.setItem('Has onboarded', true);
	}

	}
}

if (!localStorage.getItem('Has onboarded')) {
	onboarding_step++;
	doOnboarding();
} else {
	onboarding_step_screen1.classList.add('hidden');
	onboarding_step_screen2.classList.add('hidden');
	header.classList.remove('hidden');
	chores_list.classList.remove('hidden');
	current_logo.src = localStorage.getItem('App icon');
	current_app_icon.href = localStorage.getItem('App icon');
	current_favicon.href = localStorage.getItem('App icon');
	show_my_name_header.innerHTML = localStorage.getItem('My name');
}

chores.forEach(function(chore) {
	chore.onclick = function() {
		setChoreStatus(chore);
	}
});

function setChoreOnLoad(el){
	var name = el.name,
		value = localStorage.getItem(name),
		is_done = value == 'true' ? true : false;

	// console.log(name, value);

	if (is_done) {
		el.checked = true;
		running_count++;
	}

	setCount();

	console.log(running_count);
}

function setChoreStatus(el){
	var name = el.name,
		is_done = el.checked ? true : false;

	localStorage.setItem(name, is_done);
	// console.log(name, is_done);

	if (is_done) {
		running_count++;
	} else {
		running_count--;
	}

	setCount();

	console.log(running_count);
}

function setCount() {
	done.innerHTML = running_count;
}

window.onload = function() {
	// console.log('loaded!');

	chores.forEach(function(chore) {
		setChoreOnLoad(chore);
	});

	date_text.innerHTML = date.toLocaleDateString("en-US", options);
}