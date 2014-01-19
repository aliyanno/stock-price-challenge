//script to calculate the best times to buy/sell a stock to maximize profit
//start with an integer list of prices sorted by date

//check for basic case: absolute minimum before absolute maximum

//Main Function

function stockIndexFunction (array) {
	var array = [3, 4, 6, 10, 20];
	var value = getBuySellIndexes(array);
	if (value[0] == -1 && value[1] == -1) {
		return "Sorry, nothing is profitable... damn Enron."
	} else {
		return value;
	}
};


function getAbsoluteMaxIndex (array) {
	var absMax = Math.max.apply( Math, array );
	var indexMax = array.indexOf(absMax);
	return indexMax;
};

function getAbsoluteMinIndex (array) {
	var absMin = Math.min.apply( Math, array );
	indexMin = array.indexOf(absMin);
	return indexMin;
};

function compareAbsolute (array, indexMax, indexMin) {
	var absDifference = (indexMax - indexMin);
	if (absDifference > 0) {
		return [indexMin, indexMax];
	} else {
		getBuySellIndexes(array);
	};
};

//run absolute Solution test

function getAbsoluteSolution (array) {
	var indexMax = getAbsoluteMaxIndex(array);
	var indexMin = getAbsoluteMinIndex(array);
	var transactionArray = compareAbsolute(array, indexMax, indexMin);

	return transactionArray;
};

//find local profit spans based on local minimum 
//and absolute maximum in remainder of array from local min.

//create an array of indexes of local mins

function getMinIndexes (array) {
	var localMinArray = [];
	if (array[0] < array [1]) {
		localMinArray.push(0);
	};
	for (var i = 1; i < array.length; i++) {
		if (array[i-1] > array[i] && array[i] < array[i+1]) {
			localMinArray.push(i);
		};
	};
	return localMinArray;
};
//TEST
function testLocalMinIndex () {
	var array = [10, 200, 25, 30, 15, 5, 1, 30, 50, 100, 2];
	var value = getMinIndexes(array);
	if (value[0] == 0 && value[1] == 4 && value[2] == 9 && value[3] == 14) {
		return true;
	} else {
		return value;
	};
};

//get array of maximum values after each local minimum

function getMaxValues (array) {
	var maxValueArray = [],
		remainder = getMinIndexes(array);
	for (var i = 0; i < remainder.length; i++) {
		var newArray = array.slice(remainder[i]);
		var maxIndex = getAbsoluteMaxIndex(newArray);
		var relativeMax = newArray[maxIndex];
		maxValueArray.push(relativeMax);
	};
	return maxValueArray;
};


//TEST

function testGetMaxValues () {
	var array = [10, 200, 25, 30, 15, 5, 1, 30, 50, 100, 2];
	var value = getMaxValues(array);
	return value;
};

//get max values indexes from values found above

function getMaxIndexes (array) {
	var maxValues = getMaxValues(array);
	var maxValueIndex = [];
	for (var i = 0; i < maxValues.length; i++) {
		var maxIndex = array.indexOf(maxValues[i]);
		maxValueIndex.push(maxIndex);
	};
	return maxValueIndex;
};

//TEST

function testGetMaxIndexes () {
	var array = [10, 200, 25, 30, 15, 5, 1, 30, 50, 100, 2];
	var value = getMaxIndexes(array);
	return value;
};

//get relative minimum values

function getMinValues (array) {
	var minimumValues = []
	var remainder = getMinIndexes(array);
	for (var i = 0; i < remainder.length; i++) {
		var minIndex = remainder[i];
		var minValue = array[minIndex];
		minimumValues.push(minValue);
	};
	return minimumValues;
};

//TEST

function testGetMinValues () {
	var array = [10, 200, 25, 30, 15, 5, 1, 30, 50, 100, 2];
	var value = getMinValues(array)
	return value;
};

//compare relative minimum values and corresponding maximum values

function compareRelativeProfit (array) {
	var profitMargin = [];
	var minValues = getMinValues(array);
	var maxValues = getMaxValues(array);
	for (var i = 0; i < minValues.length; i++) {
		var profit = maxValues[i] - minValues[i];
		profitMargin.push(profit);
	};
	return profitMargin;
};

//TEST

function testCompareRelativeProfit () {
	var array = [10, 200, 25, 30, 15, 5, 1, 30, 50, 100, 2];
	var value = compareRelativeProfit(array);
	return value;
};

//get the index of the greatest profit margin

function getProfitIndex (array) {
	var profitMargin = compareRelativeProfit(array),
		profitValue = Math.max.apply (Math, profitMargin),
		profitIndex = profitMargin.indexOf(profitValue);
	return profitIndex;
};

//find the correlating values for the largest profit margin

function getBuySellIndexes (array) {
	var profitIndex = getProfitIndex(array);

	var minIndexes = getMinIndexes(array),
		maxIndexes = getMaxIndexes(array);

	var minOptimalIndex = minIndexes[profitIndex],
		maxOptimalIndex = maxIndexes[profitIndex];

	var minOptimalValue = array[minOptimalIndex],
		maxOptimalValue = array[maxOptimalIndex];

	var buyOptimal = array.indexOf(minOptimalValue),
		sellOptimal = array.indexOf(maxOptimalValue),
		buySellIndex = [buyOptimal, sellOptimal];

	return buySellIndex;
};

//Test
function testGetBuySellIndexes (array) {
	var array = [10, 200, 25, 30, 15, 5, 1, 30, 50, 100, 2];
	var value = getBuySellIndexes(array);
	return value;	
}

//tests

function testAbsolutesolution () {
	var array = [10, 200, 25, 30, 15, 5, 1, 30, 50, 100, 2];
	var value = getabsoluteSolution (array);
	if (value[0] == 4 && value[1] == 9) {
		return true;
	} else {
		return value;
	};
};

function testAbsoluteMax () {
	var array = [10, 200, 25, 30, 15, 5, 1, 30, 50, 100, 2];
	var value = getAbsoluteMaxIndex(array);
	return value;

}