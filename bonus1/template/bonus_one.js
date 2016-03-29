// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

/* 
  We'll declare a global array to be used across functions
  for our database. Maybe, if our database was larger we would dynamically search
  our database instead of statically loading all data at the beginning. This would perform
  well for a database that is updated in realtime. I would elect to use getJSON each time?
  However, since this JQuery function is a reduced version of an AJAX request, does getJSON checks 
  the database based on a specified interval of time or only when the script is intially loaded? 
  That's a question for Matty boy.
  */
var list = [];

(function() {
	// Magic!
	console.log('Keepin\'n it clean with an external script!');
	
	
	var testApi = "http://www.mattbowytz.com/simple_api.json?data=all"
	
	// make the ajax request and our funtion() handles the data received
	var jqxhr = $.getJSON( testApi, function( data ) {
		
		
		//console.log(data.data.interests[1]);
		var items = [];
		
		/* Here, we'll begin to collect the data stored in the api
		database in an array called list for both interest and programming */
			
		$.each( data.data.interests, function( key, val ) {
		//items.push( "<li id='" + key + "'>" + val  + "</li>" );
		list.push(val);
		});
		
		$.each( data.data.programming, function( key, val ) {
		//items.push( "<li id='" + key + "'>" + val  + "</li>" );
		list.push(val);
		});
 
		
	});
	
	$('#stressed').on('input', function () {
		var geico = document.getElementById("my-new-list");
		
		/*
			Formatting my console to help with with debugging
		*/
		console.log("");
		console.log("-----------Start Debug ---------");
		
		
		console.log("Current list value(geico): " + geico);
		
		if (geico && $("#stressed").val().length == 0){
			geico.parentNode.removeChild(geico);
			//geico = false;
			
			console.log("\n-- Empty Input If Statement --");
			console.log("Geico inside clear if: " + geico);
			console.log("-- End Empty Input If --");
		}
	
	
		if (geico && $("#stressed").val().length > 0){
			console.log("\n-- List Build If --");
			geico.parentNode.removeChild(geico); 
			console.log("-- End List Build If --");
		}
		
		//console.log("Current Input Value: " + $(this).val());
		var ctrl = $(this).val().toLowerCase();
		var inputlength = ctrl.length;
		var listy = [];
		
		/* 
		  We begin to use string comparison to compare our input to the 
		  data stored is array "listy". IndexOf causes words to pop up with a single
		  space input as well. Bad? It all depends, right?
		*/
		
		/* 
		  I choose to only push data if our input is greater than 1. This also
		  elimates errors when it comes to displaying my list. Try deleting the if statement
		  to display all data when the user inputs then deletes the string. Also, this served as an earlier solution 
		  to the problem of displaying the list on an empty input form.
		*/
		  
		if ($("#stressed").val().length > 0){
		$.each(list, function(val){
			var word = list[val].toLowerCase();
			var pos = word.indexOf(ctrl);
			if(pos > -1)
			{
				listy.push("<a href='https://www.google.com/#q=" + list[val]+ "' > <p class='flexsearch-results'>" + list[val] + "</p> </a>" );
			}
			
	
			});
		}
			
		$( "<div>", {
		"id": "my-new-list",
		html: listy.join( "" )
		}).appendTo( "#searchResults" ).slideDown();
  
		
		
		console.log(listy);
		
		console.log("\n-- End Statement --");
		console.log("Geico at end of statement: " + geico);
		console.log("-- End End Statement --");
			
		console.log("-----------End Debug ---------");
		
	});
	
	

	
})();