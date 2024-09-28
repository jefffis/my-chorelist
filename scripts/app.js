var chores = document.querySelectorAll('.cb'),
	done = document.querySelector('.done'),
	date_text = document.querySelector('.date-text'),
	running_count = 0,
	date = new Date(),
	options = {
	  weekday: "long",
	  // year: "numeric",
	  month: "long",
	  day: "numeric",
	};

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