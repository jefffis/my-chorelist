var header = document.querySelector('.header'),
	chores_list = document.querySelector('.chores'),
	chores = document.querySelectorAll('.cb'),
	daily_chores = document.querySelectorAll('.cb--daily').length,
	weekly_chores = document.querySelectorAll('.cb--weekly').length,
	done = document.querySelector('.done'),
	date_text = document.querySelector('.date-text'),
	running_count_daily = 0,
	running_count_weekly = 0,
	date = new Date(),
	options = {
	  weekday: "long",
	  month: "long",
	  day: "numeric",
	},
	day_of_week = date.toLocaleDateString("en-US", options).split(',')[0],
	onboarding_step,
	onboarding_step_screen1 = document.querySelector('#intro--1'),
	onboarding_step_screen2 = document.querySelector('#intro--2'),
	well_done_screen = document.querySelector('.welldone'),
	my_name,
	my_name_field = document.querySelector('.intro--name'),
	show_my_name = document.querySelector('.personal-name'),
	show_my_name_header = document.querySelector('.personalize'),
	set_name = document.querySelector('.js--set-name'),
	app_icon = document.querySelectorAll('.app-icon'),
	my_app_icon,
	set_icon = document.querySelector('.js--set-icon'),
	close_welldone = document.querySelector('.js--close-overlay'),
	current_logo = document.querySelector('.logo'),
	current_app_icon = document.querySelector('.app-icon-markup'),
	current_favicon = document.querySelector('.favicon-markup'),
	most_recent_date;

// set / handle onboarding
function doOnboarding() {
	my_name_field.onblur = function() {
	my_name = this.value;

	// name interactions
	if(my_name != '') {
		set_name.disabled = false;
		show_my_name.innerHTML = my_name;
		show_my_name_header.innerHTML = my_name;
		localStorage.setItem('My name', my_name);
	}

	// go from name to image screen
	set_name.onclick = function() {
		setTimeout(function(){
			onboarding_step_screen1.classList.add('hidden');
		}, 220);
		setTimeout(function(){
			onboarding_step_screen2.classList.remove('hidden');
		}, 440);
	}

	// choose image interactions
	app_icon.forEach(function(ai) {
		ai.onclick = function() {
			my_app_icon = this.src;
			localStorage.setItem('App icon', my_app_icon);

			set_icon.disabled = false;
			current_logo.src = my_app_icon;
			current_app_icon.href = my_app_icon;
			current_favicon.href = my_app_icon;
		}
	});

	// go from image screen to chore list
	set_icon.onclick = function() {
		setTimeout(function(){
			onboarding_step_screen2.classList.add('hidden');
		}, 220);
		setTimeout(function(){
			window.scrollTo(0, 0);
			header.classList.remove('hidden');
			chores_list.classList.remove('hidden');
		}, 440);

		has_onboarded = localStorage.setItem('Has onboarded', true);
	}

	}
}

// check onboarding status on page load
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

// check chore status while interating
chores.forEach(function(chore) {
	chore.onclick = function() {
		setChoreStatus(chore);
	}
});

// set chore status on page load
function setChoreOnLoad(el){
	var name = el.name,
		value = localStorage.getItem(name),
		is_done = value == 'true' ? true : false,
		is_daily = el.classList.contains('cb--daily') ? true : false;

	if (is_done) {
		el.checked = true;
	}

	updateGlobalCount(is_done, is_daily, true);
	resetDailyChores();
}

// set chore status / save locally
function setChoreStatus(el){
	var name = el.name,
		is_done = el.checked ? true : false,
		is_daily = el.classList.contains('cb--daily') ? true : false;

	localStorage.setItem(name, is_done);

	updateGlobalCount(is_done, is_daily, false);
	resetDailyChores();
}

// set or reset daily chore status (i.e. is it a new day)
function resetDailyChores(){
	var were_chores_done_yesterday = localStorage.getItem('Chores done yesterday');

	// set today's date
	localStorage.setItem('Chores done yesterday', date.toLocaleDateString("en-US", options));

	// check today's date compared to yesterday
	if (were_chores_done_yesterday != date.toLocaleDateString("en-US", options)) {
		
		// resent daily chores if I did them yesterday
		chores.forEach(function(chore) {
			var name = chore.name,
			is_daily = chore.classList.contains('cb--daily') ? true : false;
			if (is_daily) localStorage.setItem(name, 'false');
		});
	}

	// check if today is Sunday, reset weekly chores today
	// TODO prevent them RESETTING all day on Sunday...
	if(day_of_week == 'Sunday') {
		var today = date.toLocaleDateString("en-US", options);

		if (today == localStorage.getItem('Reset weekly on')) return;

		// resent daily chores if I did them yesterday
		chores.forEach(function(chore) {
			var name = chore.name,
			is_daily = chore.classList.contains('cb--weekly') ? true : false;
			if (is_daily) {
				// set when this was reset last
				localStorage.setItem('Reset weekly on', today);
				// reset weekly chores once on Sunday
				localStorage.setItem(name, 'false');
			}
		});
	}
}

// update global count for chores
function updateGlobalCount(is_done, is_daily, is_on_load) {
	if (is_done) {
		if (is_daily) {
			running_count_daily++;
		} else {
			running_count_weekly++;
		}
	} else {
		if (is_on_load) return; // if on page load, skip decrementing
		if (is_daily) {
			running_count_daily--;
		} else {
			running_count_weekly--;
		}
	}

	if (is_on_load) return; // if on page load, skip success

	if (is_daily && running_count_daily == daily_chores) {
		showSuccessMessage(true);
	}

	if (!is_daily && running_count_weekly == weekly_chores) {
		showSuccessMessage(false);
	}
}

// show success message
function showSuccessMessage(is_daily) {
	var chore_type = document.querySelector('.chore-type'),
		chore_type_message = is_daily ? 'daily chores' : 'weekly chores';

	well_done_screen.classList.add('fadein');
	// well_done_screen.classList.remove('hidden');
	chore_type.innerHTML = chore_type_message;

	close_welldone.onclick = function() {
		setTimeout(function(){
			well_done_screen.classList.remove('fadein');
		}, 220);
	}
}

window.onload = function() {
	chores.forEach(function(chore) {
		setChoreOnLoad(chore);
	});

	date_text.innerHTML = date.toLocaleDateString("en-US", options);
}