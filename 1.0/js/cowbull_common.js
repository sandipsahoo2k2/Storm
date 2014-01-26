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