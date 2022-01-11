module.exports = {
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    runtimeCompiler: true,
    chainWebpack: config => {
        config.plugins.delete('case-sensitive-paths')
    }
}
