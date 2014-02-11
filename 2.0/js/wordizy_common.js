var API_KEY = "&api_key=bcb8b593e7bac3753900607d5b502a2f3d3c95f2ebd58ec8a";
var BASE_API_URL = "http://api.wordnik.com:80/v4/";

var ENGLISH_LETTER = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y', 'Z'];

function formatWordOfTheDay(jsonData)
{
	var wordOfTheDay = new Object();
	wordOfTheDay.wordnik_id = jsonData.id;
	wordOfTheDay.word = jsonData.word;
	wordOfTheDay.parentWord = jsonData.note;
	wordOfTheDay.definitions = jsonData.definitions;
	//wordOfTheDay.meaning = wordOfTheDay.definitions[0].text;
	//wordOfTheDay.word_type = wordOfTheDay.definitions[0].partOfSpeech;

	wordOfTheDay.example = jsonData.examples[0];
	wordOfTheDay.exampleUsage = wordOfTheDay.example.text;
	wordOfTheDay.toHTML = function (divID)
		{
			var element = document.getElementById(divID);
			if(element)
			{
				var htmlStr = "<table data-role='table' id='wordoftheday-table' data-mode='reflow' class='ui-responsive table-stroke'>"
							+ "<thead><tr><th></th></tr></thead>"
							+ "<tbody>" ;
					for(i = 0; i < this.definitions.length; i++)
					{
						var meaning = this.definitions[i];
						htmlStr += "<tr><td><sup><em><span style='color:purple'>" + meaning.partOfSpeech + "</span></em></sup>"+ meaning.text + "</td></tr>" ;
					}
				htmlStr += "<tr><td><sup><em><span style='color:purple'>Origin</span></em></sup>"+ this.parentWord + "</td></tr>" ;
				htmlStr += "<tr><td><sup><em><span style='color:purple'>Example</span></em></sup>"+ this.exampleUsage + "</td></tr>" ;

				htmlStr += "</tbody></table>";

				element.innerHTML = htmlStr;
			}
		};
	return wordOfTheDay;
}

function formatRandomWord(jsonData)
{
	var wordnik_id = jsonData.id;
	var word = jsonData.word;
	//getWordDefinition(word);
	return "" + word;
}

function getContainerHTML(size, divID)
	{
		var tempArray = new Array();
		var element = document.getElementById(divID);
		if(element)
		{
			var htmlStr = "";
			for(i = 0; i < size ; i ++)
			{
				htmlStr += "<input type = 'button' id='container_key_" + i + "' data-theme='a' data-mini='true' value= '*' onclick='on_container_key_clicked(event)'>";
				tempArray[i] = false;
			}
			element.innerHTML = htmlStr;
		}
		return tempArray;
	}


function formatWordMeaning(jsonData)
{
	var wordDefinition = new Object();
	//wordDefinition.word = jsonData.word;
	wordDefinition.array = jsonData;
	//var word = wordData.word; //actual word
	//var meaning = wordData.text ; //meaning
	//var type_of_word = wordData.partOfSpeech ; //
	wordDefinition.zip_array = [];
	var map = {};
	for(i = 0, j = 0; i < jsonData.length ; j ++, i++)
	{
		var meaning = jsonData[i];
		if(meaning.partOfSpeech && !map[meaning.partOfSpeech])
		{
			map[meaning.partOfSpeech] = meaning.text;
			wordDefinition.zip_array[j] = meaning;
		}
	}

	wordDefinition.allToHTML = function(divID)
			{
				var element = document.getElementById(divID);
				if(element)
				{
					var htmlStr = "<table data-role='table' id='worddefinition-table' data-mode='reflow' class='ui-responsive table-stroke'>"
								+ "<thead><tr><th></th><th></th></tr></thead>"
								+ "<tbody>" ;
						for(i = 0; i < this.array.length; i++)
						{
							var meaning = this.array[i];
							htmlStr += "<tr><th>" + meaning.partOfSpeech + "</th>"
									+ "<td>" + meaning.text + "</td></tr>" ;
						}
					htmlStr += "</tbody></table>";

					element.innerHTML = htmlStr;
				}
			};

	wordDefinition.byIndexToHtml = function(index, divID)
			{
				var element = document.getElementById(divID);
				if(element)
				{
					var htmlStr = "<table data-role='table' id='worddefinition-table' data-mode='reflow' class='ui-responsive table-stroke'>"
							+ "<thead><tr><th></th></tr></thead><tbody>" ;
					if(index < this.zip_array.length)
					{
						var meaning = this.zip_array[index];
						htmlStr += "<tr><td><sup><em><span style='color:purple'>" + meaning.partOfSpeech + "</span></em></sup>"+ meaning.text + "</td></tr>" ;
					}
					else
					{
						htmlStr = "<tr><td><sup><em><span style='color:purple'>No information available</span></em></sup></td></tr>";
					}
					htmlStr += "</tbody></table>";
					element.innerHTML = htmlStr;
				}
			};

	wordDefinition.toHTML = function(divID)
			{
				var element = document.getElementById(divID);
				if(element)
				{
					var htmlStr = "<table data-role='table' id='worddefinition-table' data-mode='reflow' class='ui-responsive table-stroke'>"
								+ "<thead><tr><th></th></tr></thead>"
								+ "<tbody>" ;
					for(i = 0; i < this.zip_array.length; i++)
					{
						var meaning = this.zip_array[i];
						htmlStr += "<tr><td><sup><em><span style='color:purple'>" + meaning.partOfSpeech + "</span></em></sup>"+ meaning.text + "</td></tr>" ;
					}
					htmlStr += "</tbody></table>";
					element.innerHTML = htmlStr;
				}
			};

		return wordDefinition;
}


function getRandomNum(number_of_digit, repitation_allowed)
{
	var random_number = 0;
	if(number_of_digit > 0)
	{
		var temp = Math.random();
		var hundreds = Math.pow(10, number_of_digit);
		random_number = Math.floor(temp * hundreds + 1);
		//alert("random Number is :" + random_number);
		var stringNumber = getArrayNum(random_number);
		if(stringNumber.length != number_of_digit)
		{
			return getRandomNum(number_of_digit);
		}
		if(!repitation_allowed)
		{
			for(i = 0 ; i < stringNumber.length; i++)
			{
				for(j = 0 ; j < stringNumber.length; j++)
				{
					if( i != j && stringNumber[i] == stringNumber[j])
					{
						//try another number
						return getRandomNum(number_of_digit);
					}
				}
			}
		}
	}
	return random_number;
}

function getArrayNum(any_num)
{
    var string_arr = any_num.toString().split("");
    var int_arr = new Array(string_arr.length);
    for (var i in string_arr)
    {
    	int_arr[i] = parseInt(string_arr[i], 10);
    }
    //alert("Number is :" + int_arr);
    return int_arr;
}

function wordMatched(input_word, random_word)
{
	var matched = true;
	if(random_word.length == input_word.length)
	{
		for(i = 0; i < random_word.length; i++)
		{
			if(random_word[i] != input_word[i])
			{
				matched = false;
				break;
			}
		}
	}
	else
	{
		matched = false;
	}
	return matched;
}

function getCowsAndBulls(input_number, random_number)
{
	var input_number = getArrayNum(input_number);
	var random_number = getArrayNum(random_number);

	var bulls_and_cows = [0,0];
	var bulls_array = new Array();
	var cows_array = new Array();
	var i = 0;
	if(random_number.length == input_number.length)
	{
		for(i = 0; i < random_number.length; i++)
		{
			bulls_array[i] = false;
			cows_array[i] = false;
			if(input_number[i] == random_number[i])
			{
				bulls_and_cows[0]++;
				bulls_array[i] = true;
			}
		}

		// get number of cows
		/*for(i = 0; i < random_number.length;i++) //ignore the bulls position
		{
			if(!bulls_array[i])
			{
				var index = random_number.indexOf(input_number[i]);
				if(index > -1 && index != i)
				{
					if(!bulls_array[index] && !cows_array[index])
					{
						bulls_and_cows[1]++;
						cows_array[index] = true;
					}
				}
			}
		}*/

		for(inputIndex = 0; inputIndex < random_number.length; inputIndex++) //ignore the bulls position
		{
			if(bulls_array[inputIndex])
			{
				//alert('skipping BULLS inputIndex = ' + inputIndex);
				continue; //skip bulls
			}
			for(indexRandom = 0; indexRandom < random_number.length; indexRandom++)
			{
				if(bulls_array[indexRandom])
				{
					continue; //skip bulls
				}
				if(cows_array[indexRandom])
				{
					//alert(' skipping COWS indexRandom = ' + indexRandom);
					continue;
				}
				if(input_number[inputIndex] == random_number[indexRandom])
				{
					if(!cows_array[indexRandom])
					{
						bulls_and_cows[1]++;
						cows_array[indexRandom] = true;
						break;
					}
				}
			}
		}
		//alert("Bulls : " + bulls_and_cows[0] + " And Cows : " + bulls_and_cows[1]);
	}
	else
	{
		alert("Number of digits of the input should not be more than :" + random_number.length);
	}
	return bulls_and_cows;
}

function getTotalTimeFromSecond(time_elapse_in_second)
{
	var myTime = new Object();

	myTime.total_minutes = Math.floor(time_elapse_in_second / 60);
	myTime.total_seconds = Math.floor(time_elapse_in_second % 60);
	myTime.total_hours = Math.floor(myTime.total_minutes / 60);

	if(myTime.total_seconds < 10)
	{
		myTime.total_seconds = "0" + myTime.total_seconds;
	}
	if(myTime.total_minutes < 10)
	{
		myTime.total_minutes = "0" + myTime.total_minutes;
	}

	if(myTime.total_hours < 10)
	{
		myTime.total_hours = "0" + myTime.total_hours;
	}
	return myTime;
}

function postSignIn(userName, passWord)
{
	var queryString = "authenticate/" + userName + "?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
	var requestURLString = BASE_API_URL + "word.json/"+ queryString;

	$.post(requestURLString,
			{"password":"hurrrr"},
				function(data)
				{
				  var element = document.getElementById("wordoftheday");
					if(element)
					{
						element.innerHTML = data ;
					}
				}
		);
}
