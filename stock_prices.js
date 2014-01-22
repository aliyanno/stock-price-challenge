//script to calculate the best times to buy/sell a stock to maximize profit
//start with an integer list of prices sorted by date

//Main Function
function computeBestStockTransactions (stockPrices) {
	var value = getBuySellIndexes(stockPrices);
	if (value[0] == -1 && value[1] == -1) {
		return "Sorry, nothing is profitable... damn Enron."
	} else {
		return value;
	}
};

// Code Summary: Find the local minima of Stock Prices.
// For each local minima, find the absolute maximum of the Stock
// prices after each local minimum (since you must buy before you sell).
// Use each local minimum and corresponding absolute maximum to 
// find the profit margin for each pair.
// Find the best possible profit margin.
// Work backwards to find the index of the local minimum corresponding 
// maximum with the best profit margin.
// Return indexes of local minimum and absolute maximum.


// Get an array of the greatest profit margins based on local minima and local maxima
function getRelativeProfitValues (stockPrices) {
	var profitMargins = [],
		localMinIndex = getMinIndexes(stockPrices),
		minValues = getMinValues(stockPrices, localMinIndex),
		maxValues = getMaxValues(stockPrices, localMinIndex);
	for (var i = 0; i < minValues.length; i++) {
		var profit = maxValues[i] - minValues[i];
		profitMargins.push(profit);
	};
	return profitMargins;
};

// Find the index of absolute max in an array in order to find the best profit margin
function getAbsoluteMaxIndex (array) {
	var absMax = Math.max.apply(Math, array),
		indexMax = array.indexOf(absMax);
	return indexMax;
};

// Optimal profit index of the relative profit margins from local minima and maxima
function getOptimalProfitIndex (stockPrices) {
	var profitMargin = getRelativeProfitValues(stockPrices),
		profitIndex = getAbsoluteMaxIndex(profitMargin);
	return profitIndex;
};

// Find the optimal Buy and Sell point based on the optimal Profit difference
function getBuySellIndexes (stockPrices) {
	var profitIndex = getOptimalProfitIndex(stockPrices);

	var minIndexes = getMinIndexes(stockPrices),
		maxIndexes = getMaxIndexes(stockPrices, minIndexes);

	var minOptimalIndex = minIndexes[profitIndex],
		maxOptimalIndex = maxIndexes[profitIndex];

	var minOptimalValue = stockPrices[minOptimalIndex],
		maxOptimalValue = stockPrices[maxOptimalIndex];

	var buyOptimal = stockPrices.indexOf(minOptimalValue),
		sellOptimal = stockPrices.indexOf(maxOptimalValue),
		buySellIndex = [buyOptimal, sellOptimal];

	return buySellIndex;
};

// Functions for Local Minima and corresponding Maxima

// Get the local minima of the Stock Prices to determine any possible Buy points
function getMinIndexes (stockPrices) {
	var localMinIndex = [];
	// Check if first price index is a local minimum
	if (stockPrices[0] < stockPrices [1]) {
		localMinIndex.push(0);
	};
	// Find local minima by comparing with price before and after
	// Ignore last price for local minima because you cannot sell stock if bought there
	for (var i = 1; i < stockPrices.length - 1; i++) {
		if (stockPrices[i-1] > stockPrices[i] && stockPrices[i] < stockPrices[i+1]) {
			localMinIndex.push(i);
		};
	};
	return localMinIndex;
};

// Get Max Indexes in the Stock Prices Array from the values found in getMaxValues
// in order to determine the best sell index
function getMaxIndexes (stockPrices, localMinIndex) {
	var maxValues = getMaxValues(stockPrices, localMinIndex),
		maxValueIndex = [];
	for (var i = 0; i < maxValues.length; i++) {
		var maxIndex = stockPrices.indexOf(maxValues[i]);
		maxValueIndex.push(maxIndex);
	};
	return maxValueIndex;
};

// Get the absolute maximum of the sub array starting with each local minimum
// to determine the greatest profit margin from that minimum
function getMaxValues (stockPrices, localMinIndex) {
	//Get the local minimum indexes of Stock Prices
	var maxValueArray = [];
	for (var i = 0; i < localMinIndex.length; i++) {
		// Create a sub array of Stock Prices to find maximum after minimum
		var remainder = stockPrices.slice(localMinIndex[i]);
		// Get absolute max index of sub array
		var maxIndex = getAbsoluteMaxIndex(remainder);
		// Get absolute max value and push to Max Values Array
		var relativeMax = remainder[maxIndex];
		maxValueArray.push(relativeMax);
	};
	return maxValueArray;
};

// Get the values of the local minima to calculate profit margins for each pair of local minima and maxima
function getMinValues (stockPrices, localMinIndex) {
	var minimumValues = [];
	for (var i = 0; i < localMinIndex.length; i++) {
		var minIndex = localMinIndex[i],
			minValue = stockPrices[minIndex];
		minimumValues.push(minValue);
	};
	return minimumValues;
};




//
//
//
//
//

//Tests for individual functions
function masterTester () {
	testLocalMinIndex();
	testGetMaxValues();
	testAbsoluteMaxIndex();
	testGetMaxIndexes();
	testGetMinValues();
	testGetRelativeProfitValues();
	testGetBuySellIndexes();
};

function testAbsoluteMaxIndex () {
	console.log("Testing AbsoluteMaxIndex");
	var array = [10, 200, 25, 30, 15, 5, 1, 30, 50, 100, 2];
	var value = getAbsoluteMaxIndex(array);
	if (value == 1) {
		return true;
	} else {
		console.log("AbsoluteMaxIndex failed");
		console.log(value);
	};
};

function testLocalMinIndex () {
	console.log("Testing LocalMinIndex");
	var array = [10, 200, 25, 30, 15, 5, 1, 30, 50, 100, 2];
	var value = getMinIndexes(array);
	if (value[0] == 0 && value[1] == 2 && value[2] == 6) {
		return true;
	} else {
		console.log("LocalMinIndex Failed");
		console.log(value);
	};
};

function testGetMaxValues () {
	console.log("Testing GetMaxValues");
	var array = [10, 200, 25, 30, 15, 5, 1, 30, 50, 100, 2];
	var localMinIndex = [0, 2, 6];
	var value = getMaxValues(array, localMinIndex);
	if (value[0] == 200 && value[1] == 100 && value[2] == 100) {
		return true;
	} else {
		console.log("GetMaxValues Failed");
		console.log(value);
	};
};

function testGetMaxIndexes () {
	console.log("Testing getMaxIndexes");
	var array = [10, 200, 25, 30, 15, 5, 1, 30, 50, 100, 2],
		localMinIndex = [0, 2, 6];
	var value = getMaxIndexes(array, localMinIndex);
	if (value[0] == 1 && value[1] == 9 && value[2] == 9) {
		return true;
	} else {
		console.log("getMaxIndexes Failed");
		console.log(value);
	}
};

function testGetMinValues () {
	console.log("Testing getMinValues");
	var array = [10, 200, 25, 30, 15, 5, 1, 30, 50, 100, 2],
		localMinIndex = [0, 2, 6];
	var value = getMinValues(array, localMinIndex)
	if (value[0] == 10 && value[1] == 25 && value[2] == 1) {
		return true;
	} else {
		console.log("getMinValues Failed");
		console.log(values);
	};
};

function testGetRelativeProfitValues () {
	console.log("Testing getRelativeProfitValues");
	var array = [10, 200, 25, 30, 15, 5, 1, 30, 50, 100, 2];
	var value = getRelativeProfitValues(array);
	if (value[0] == 190 && value[1] == 75 && value[2] == 99) {
		return true;
	} else {
		console.log("getRelativeProfitValues failed");
		console.log(values);
	};
};

function testGetBuySellIndexes (array) {
	console.log("Testing getBuySellIndexes");
	var array = [10, 200, 25, 30, 15, 5, 1, 30, 50, 100, 2];
	var value = getBuySellIndexes(array);
	if (value[0] == 0 && value[1] == 1) {
		return true;
	} else {
		console.log("getBuySellIndexes Failed");
		console.log(values);
	};
};
