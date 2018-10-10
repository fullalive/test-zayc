const MD5 = require('js-md5');
// const MD5 = require('./uitls/md5');

function BSTree() {
	this.root = null;
	this.length  = 0;
}

BSTree.prototype.add = function(key, steps) {
	this.length++;
	let curr = this.root;
	while (curr) {
		if (key < curr.key) {
			if (curr.left) {
				curr = curr.left;
			} else {
				curr.left = {key, steps, left: null, right: null };
				return;
			}
		}
		else if (key > curr.key) {
			if (curr.right) {
				curr = curr.right;
			} else {
				curr.right = {key, steps, left: null, right: null};
				return;
			}
		}
		else {
			curr.left = {key, steps, left: curr.left, right: null};
			return;
		}
	}
	this.root = {key, steps, left: null, right: null};
};

BSTree.prototype.get = function(key) {
	let curr = this.root;
	while (curr) {
		if (key < curr.key) {
			curr = curr.left;
		} else if (key > curr.key) {
			curr = curr.right;
		} else {
			return curr;
		}
	}
	return false;
};

const findMax = array => {
	let max = {
		value: null,
		index: null,
	};

	if (!array || !array.length) {
		return null;
	}

	array.forEach((value, index) => {
		if (value > max.value) {
			max = {value, index};
		}
	});

	return max;
};

const changeArray = (array, max) => {
	const newArray = array;
	const length = newArray.length;
	let donor = max.value;

	newArray[max.index] = 0;

	if (donor < 1) {
		return newArray;
	}

	let index = max.index + 1;
	while (donor > 0) {
		if (index === length) {
			index = 0;
		}
		newArray[index] += 1;
		index++;
		donor--;
	}

	return newArray;
};

const main = () => {
	const history = new BSTree();
	let array = [0, 5, 10, 0, 11, 14, 13, 4, 11, 8, 8, 7, 1, 4, 12, 11];
	let steps = 0;
	let arrHash;
	let isInHistory = false;

	while (!isInHistory) {
		arrHash = MD5(array);
		const max = findMax(array);
		history.add(arrHash, steps);
		array = changeArray(array, max);
		arrHash = MD5(array);
		isInHistory = history.get(arrHash);
		steps++;
	}

	return {steps, length: steps - isInHistory.steps};
};


console.log(main());
