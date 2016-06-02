require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/custom.scss');

import React from "react";

//引入JSON文件
var ImageDatas = require('../data/imageDatas.json');
// 获取json文件中的图片信息。

ImageDatas = (function (imageDatasArr) {
    for (var i = 0, j = imageDatasArr.length; i < j; i++) {
        var singleImageData = imageDatasArr[i];
        singleImageData.imageURL = require('../images/' + singleImageData.fileName);
        imageDatasArr[i] = singleImageData;
    }
    return imageDatasArr;
})(ImageDatas);

class AppComponent extends React.Component {
    render() {
        return (
            <section className="stage">
                <section className="img-sec">
                    Hello world
                </section>
                <nav className="controller-nav">
                    I love constructor
                </nav>
            </section>
        );
    }
}

AppComponent.defaultProps = {};

export default AppComponent;
