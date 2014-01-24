
function getRandomNum(number_of_digit)
{
	var random_number = 0;
	if(number_of_digit > 0)
	{
		var temp = Math.random();
		var hundreds = Math.pow(10, number_of_digit);
		random_number = Math.floor(temp * hundreds + 1);
		//alert("random Number is :" + random_number);
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

function getCowsAndBulls(input_number, random_number)
{
	var input_number = getArrayNum(input_number);
	var random_number = getArrayNum(random_number);

	var bulls_and_cows = [0,0];
	var i=0 ;
	if(random_number.length == input_number.length)
	{
		for(; i < random_number.length; i++)
		{
			if(input_number[i] == random_number[i])
			{
				bulls_and_cows[0]++;
			}
		}

		for(i=0 ; i < random_number.length; i++)
		{
			if(input_number[i] != random_number[i])
			{
				if(random_number.indexOf(input_number[i]) > -1)
				{
					bulls_and_cows[1]++;
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
