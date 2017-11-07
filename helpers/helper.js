class Helper {
	static getStars(number) {
		let arrStar = "";

		for (let i = 0; i < number; i++) {
			arrStar = arrStar + '<i class="fa fa-star"></i>';
		}

		return arrStar;
	}
}

module.exports = Helper;