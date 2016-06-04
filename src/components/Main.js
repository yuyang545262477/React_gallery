require('normalize.css/normalize.css');
// require('styles/App.css');
require('styles/custom.scss');

import React from "react";
import ReactDOM from "react-dom";

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


/*  图片信息 */
class ImgFigure extends React.Component {
    // alert('ImgFigure'+ Constant.centerPos);
    
    render() {
        return (
            <figure className="img-figure">
                <img src={this.props.data.imageURL}
                     alt={this.props.data.title}/>
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                </figcaption>
            </figure>
        )
    }
    
}


/* 组建背景 */
class GalleryByReactApp extends React.Component {
    
    constructor() {
        super();
        //初始化位置,常量.
        this.Constant = {
            centerPos: {
                left: 0,
                right: 0
            },
            hPosRange: { //水平方向的取值范围
                leftSecX: [0, 0],
                rightSecX: [0, 0],
                y: [0, 0]
            },
            vPosRange: { //垂直方向
                x: [0, 0],
                topY: [0, 0]
            }
        };
        
    }
    
    rearrage(centerIndex) {
        
    }
    
    
    componentDidMount() {
        //     拿到舞台的大小
        var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2);
        
        //    拿到每一个imageFigure的大小
        var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);
        
        
        //    计算中心图片的位置点
        
        this.Constant.centerPos = {
            left: halfStageW - halfImgW,
            top: halfStageH - halfImgH
        };
        //    计算图片左侧右侧。
        this.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
        this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
        this.Constant.hPosRange.y[0] = -halfImgH;
        this.Constant.hPosRange.y[1] = stageH - halfImgH;
        
        
        //    计算图片上侧的排布位置。
        this.Constant.vPosRange.x[0] = halfStageW - imgW;
        this.Constant.vPosRange.x[1] = halfStageW;
        this.Constant.vPosRange.topY[0] = -imgH;
        this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    }
    
    
    render() {
        var controllerUnits = [],
            imgFigures = [];
        
        ImageDatas.forEach(function (value, index) {
            imgFigures.push(<ImgFigure data={value} ref={'imgFigure'+index} key={index}/>);
        }.bind(this));
        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        );
    }
    
    
}

GalleryByReactApp.defaultProps = {};

export default GalleryByReactApp;
