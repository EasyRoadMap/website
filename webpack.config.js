let path = require('path');

module.exports = {
    entry: {
        auth_service: './src/main/react/auth-service/index.js',
        control_panel: './src/main/react/control-panel/index.js',
        public_page: './src/main/react/public-page/index.js'
    },
    devtool: false,
    cache: true,
    mode: 'production',
    output: {
        path: __dirname + '/target/classes/static/built/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    }
};