module.exports = {
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                //解决用户不能自己选择安装目录
                nsis: {
                    oneClick: false,
                    allowToChangeInstallationDirectory: true
                }
            }
        }
    },
}