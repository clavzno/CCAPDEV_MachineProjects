const mongoose = require('mongoose'); // Importing mongoose module

const mainController = {
    // Existing method to render error page
    errorPage: (req, res) => {
        res.render("error", { title: "Page not found" });
    }
};

module.exports = mainController;