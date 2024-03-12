let path = require('path');

module.exports = {
    entry: {
        auth: './src/main/react/auth/index.js',
        front: './src/main/react/front/index.js',
        workspace: './src/main/react/workspace/index.js'
    },
    devtool: false,
    cache: true,
    mode: 'development',
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
                        presets: ["@babel/preset-env", ["@babel/preset-react", {"runtime": "automatic"}]]
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