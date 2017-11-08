class Helper {
	static getStars(number) {
		let arrStar = "";

		if (number !== null) {
			if (number % 1 === 0) {
				for (let i = 0; i < number; i++) {
					arrStar = arrStar + '<i class="fa fa-star"></i>';
				}
			} else {
				for (let i = 0; i < Math.floor(number); i++) {
					arrStar = arrStar + '<i class="fa fa-star"></i>';
				}

				arrStar = arrStar + '<i class="fa fa-star-half"></i>';
			}
		}

		return arrStar;
	}
}

module.exports = Helper;