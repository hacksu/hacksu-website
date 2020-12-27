module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                @import "@/global.scss";
                `
            }
        }
    }
};
