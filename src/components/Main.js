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
    
    render() {
        var styleObj = {};
        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }
        
        
        return (
            <figure className="img-figure" style={styleObj}>
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
        this.state = {
            imgsArrangeArr: []
        };
        // this.getRangeRandom = this.getRangeRandom.bind(this);
        // this.rearrange = this.rearrange.bind(this);
        
        
    }
    
    
    getRangeRandom(low, high) {
        return Math.ceil(Math.random() * (high - low) + low);
    }
    
    //
    // getRangeRandom = (low, high) => {
    //     Math.ceil(Math.random() * (high - low) + low)
    // };
    
    
    rearrange(centerIndex) {
        var imgsArrangeArr = this.state.imgsArrangeArr,
            Constant = this.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x;
        
        
        //    用来存储上侧图片信息。
        var imgsArrangeTopArr = [],
            topImgNum = Math.ceil(Math.random() * 2),
            topImgSpliceIndex = 0,
            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
        
        
        //  首先居中centerIndex的图片
        imgsArrangeCenterArr[0].pos = centerPos;
        //    取出要布局上侧的图片的状态
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        // alert(topImgNum);
        // alert(topImgSpliceIndex);
        
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
        
        //    布局位于上侧的图片
        imgsArrangeTopArr.forEach(function (value, index) {
            imgsArrangeTopArr[index].pos = {
                top: this.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                left: this.getRangeRandom(vPosRangeX[0], vPosRangeX[1])
            }
        }.bind(this));
        window.console.log(imgsArrangeTopArr);
        //     布局两侧的图片
        for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
            
            var hPosRangeLORX = null;
            
            //    前半部分布局左边,右半部分布局右边
            if (i < k) {
                hPosRangeLORX = hPosRangeLeftSecX;
            } else {
                hPosRangeLORX = hPosRangeRightSecX;
            }
            imgsArrangeArr[i].pos = {
                top: this.getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                left: this.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
            }
        }
        
        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }
        
        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
        
        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });
        
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
        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
        
        
        //    调用函数排布图片。
        this.rearrange(0);
    }
    
    
    render() {
        var controllerUnits = [],
            imgFigures = [];
        
        ImageDatas.forEach(function (value, index) {
            
            if (!this.state.imgsArrangeArr[index]) {
                this.state.imgsArrangeArr[index] = {
                    pos: {
                        left: 0,
                        top: 0
                    }
                }
                
            }
            
            imgFigures.push(<ImgFigure data={value} ref={'imgFigure'+index} key={index} arrange={this.state.imgsArrangeArr[index]}/>);
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

// GalleryByReactApp.getRangeRandom = (low, high) => {
//     Math.ceil(Math.random() * (high - low) + low)
// };


export default GalleryByReactApp;
