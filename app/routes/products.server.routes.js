const express = require("express");
const router = express.Router();
const multer = require("multer"); // move to controller (middleware)
const middleware = require("../middleware");
const products = require("../controllers/products.server.controller");

//multer config ==> move to config/multer.js file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
});
// filter non-image files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get("/", products.productsGetAll);
router.post("/", middleware.checkAuth, upload.single("productImage"), products.productPost);
router.get("/:productId", products.productGetOne);
router.patch("/:productId", middleware.checkAuth, products.productPatch);
router.delete("/:productId", middleware.checkAuth, products.productDelete);

module.exports = router;