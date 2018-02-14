const multer = require('multer');

//multer config
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/images/uploads');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});
// filter non-image files
const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
});

module.exports = upload;