const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        allowedHosts: [
            'localhost',
            'ec2-15-229-250-69.sa-east-1.compute.amazonaws.com',
            '192.168.1.1',
            '127.0.0.1',
        ],
    },
})
