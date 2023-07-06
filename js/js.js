$(function () {
    echarts_1();
    echarts_2();
    echarts_4();
    echarts_31();
    echarts_32();
    echarts_33();
    echarts_5();
    echarts_6();
    function echarts_1() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart1'));

        var xdata = []
        var ydata = []
        $.getJSON("https://bdapi.gxist.cn/api/year-depressed", function (values) {

            for (var i = 0; i < values["data"].length; i++) {
                xdata.push(values["data"][i]["year"])
                ydata.push(values["data"][i]["depressedNo"])
            }
            option = {
                //  backgroundColor: '#00265f',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '0%',
                    top: '10px',
                    right: '0%',
                    bottom: '4%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: xdata.slice(1, 10),
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(255,255,255,.1)",
                            width: 1,
                            type: "solid"
                        },
                    },

                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        interval: 0,
                        // rotate:50,
                        show: true,
                        splitNumber: 15,
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: '12',
                        },
                    },
                }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        //formatter: '{value} %'
                        show: true,
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: '12',
                        },
                        formatter: function (value, index) {
                            var value
                            if (value >= 10000 && value < 1000000) {
                                value = value / 10000 + '万'
                            } else if (value >= 1000000) {
                                value = value / 1000000 + '百万'
                            } else if (value < 10000) {
                                value = value
                            }
                            return value
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(255,255,255,.1	)",
                            width: 1,
                            type: "solid"
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,.1)",
                        }
                    }
                }],
                series: [
                    {

                        type: 'bar',
                        data: ydata.slice(1, 10),
                        barWidth: '35%', //柱子宽度
                        // barGap: 1, //柱子之间间距
                        itemStyle: {
                            normal: {
                                color: '#2f89cf',
                                opacity: 1,
                                barBorderRadius: 5,
                            }
                        }
                    }

                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });

        })
    }
    function echarts_2() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart2'));

        var formattedData = [];
        var yearList = [];
        var countryList = [];

        $.getJSON("https://bdapi.gxist.cn/api/year-country-depression-no", function (inputData) {

            for (var i = 0; i < inputData["data"].length; i++) {
                var item = inputData["data"][i];
                var name = item.country;
                var year = item.year;
                var data = [item.totalDepressedNo];

                var existingCountry = formattedData.find(function (d) {
                    return d.name === name;
                });

                if (existingCountry) {
                    existingCountry.data.push(data[0]);
                } else {
                    formattedData.push({
                        name: name,
                        type: 'line',
                        //stack: 'Total',
                        data: data
                    });
                }

                if (!yearList.includes(year)) {
                    yearList.push(year);
                }

                if (!countryList.includes(name)) {
                    countryList.push(name);
                }

            }

            var option;
            var selectedLegend = {};
            countryList.forEach(function (country) {
                selectedLegend[country] = true; // 设置初始显示状态为 false
            });
            option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    selected: selectedLegend,
                    right: '10px',
                    x: 'center',
                    data: countryList
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    width: '90%',  // 设置宽度
                    height: '80%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    name: '年份', // 修改 x 轴标签为 "年份"
                    boundaryGap: false,
                    data: yearList,
                    axisLabel: {
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: '12',
                        },
                    }
                },
                yAxis: {
                    name: '人数',
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: '12',
                        },
                        formatter: function (value, index) {
                            var value
                            if (value >= 10000 && value < 1000000) {
                                value = value / 10000 + '万'
                            } else if (value >= 1000000) {
                                value = value / 1000000 + '百万'
                            } else if (value < 10000) {
                                value = value
                            }
                            return value
                        },
                    }
                },
                series: formattedData.slice(20, 23)
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        })
    }

    function echarts_5() {

        // 基于准备好的dom，初始化echarts实例

        var myChart = echarts.init(document.getElementById('echart5'));
        $.getJSON("https://bdapi.gxist.cn/api/hdi-depressed", function (values) {
            // 基于准备好的dom，初始化echarts实例
            var xdata = []
            var ydata = []
            for (var i = 3; i < values["data"].length - 1; i++) {
                xdata.push(values["data"][i]["hdiForYear"])
                ydata.push(values["data"][i]["depressedNo"])
            }
            option = {
                //  backgroundColor: '#00265f',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },

                grid: {
                    left: '0%',
                    top: '10px',
                    right: '0%',
                    bottom: '2%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: xdata,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(255,255,255,.1)",
                            width: 1,
                            type: "solid"
                        },
                    },

                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        interval: 0,
                        // rotate:50,
                        show: true,
                        splitNumber: 15,
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: '12',
                        },
                    },
                }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        //formatter: '{value} %'
                        show: true,
                        textStyle: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: '12',
                        },
                        formatter: function (value, index) {
                            var value
                            if (value >= 10000 && value < 1000000) {
                                value = value / 10000 + '万'
                            } else if (value >= 1000000) {
                                value = value / 1000000 + '百万'
                            } else if (value < 10000) {
                                value = value
                            }
                            return value
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(255,255,255,.1	)",
                            width: 1,
                            type: "solid"
                        },

                    },
                    splitLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,.1)",
                        }
                    }
                }],
                series: [{
                    type: 'bar',
                    data: ydata,
                    barWidth: '35%', //柱子宽度
                    // barGap: 1, //柱子之间间距
                    itemStyle: {
                        normal: {
                            color: '#2f89cf',
                            opacity: 1,
                            barBorderRadius: 5,
                        }
                    }
                }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        })
    }

    function echarts_4() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart4'));
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#dddc6b'
                    }
                }
            },
            legend: {
                top: '0%',
                data: ['男性', '女性'],
                textStyle: {
                    color: 'rgba(255,255,255,.5)',
                    fontSize: '12',
                }
            },
            grid: {
                left: '10',
                top: '30',
                right: '10',
                bottom: '10',
                containLabel: true
            },

            xAxis: [{
                interval: 50,

                type: 'category',
                boundaryGap: true,
                axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 12,
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.2)'
                    }

                },

                data: []
            }, {

                axisPointer: { show: false },
                axisLine: { show: false },
                position: 'bottom',
                offset: 20,


            }],

            yAxis: [{
                type: 'value',
                axisTick: { show: false },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 12,
                    },
                    formatter: function (value, index) {
                        var value
                        if (value >= 10000 && value < 1000000) {
                            value = value / 10000 + '万'
                        } else if (value >= 1000000) {
                            value = value / 1000000 + '百万'
                        } else if (value < 10000) {
                            value = value
                        }
                        return value
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }
                }
            }],
            series: [
                {
                    name: '女性',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {

                        normal: {
                            color: '#0184d5',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(1, 132, 213, 0.4)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(1, 132, 213, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#0184d5',
                            borderColor: 'rgba(221, 220, 107, .1)',
                            borderWidth: 12
                        }
                    },
                    data: []

                },
                {
                    name: '男性',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {

                        normal: {
                            color: '#00d887',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 216, 135, 0.4)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 216, 135, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#00d887',
                            borderColor: 'rgba(221, 220, 107, .1)',
                            borderWidth: 12
                        }
                    },
                    data: [5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]
                },
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize()
        })

        //获取数据重新渲染
        var mxdata = []
        var mydata = []
        var fxdata = []
        var fydata = []
        $.getJSON("https://bdapi.gxist.cn/api/year-per-depressed?sex=male", function (values) {

            for (var i = 0; i < values["data"].length; i++) {
                mxdata.push(values["data"][i]["year"])
                mydata.push(values["data"][i]["depressed_no"])
            }
            myChart.setOption({
                xAxis: {
                    data: mxdata
                },
                series: [{
                    data: mydata
                }, {
                    data: fydata
                }]
            })
        })

        $.getJSON("https://bdapi.gxist.cn/api/year-per-depressed?sex=female", function (values) {

            for (var i = 0; i < values["data"].length; i++) {
                fxdata.push(values["data"][i]["year"])
                fydata.push(values["data"][i]["depressed_no"])
            }
            myChart.setOption({
                xAxis: {
                    data: mxdata
                },
                series: [{
                    data: mydata
                }, {
                    data: fydata
                }]
            })

        })


    }
    function echarts_6() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart6'));
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#dddc6b'
                    }
                }
            },
            legend: {
                top: '0%',
                data: ['男性', '女性'],
                textStyle: {
                    color: 'rgba(255,255,255,.5)',
                    fontSize: '12',
                }
            },
            grid: {
                left: '10',
                top: '30',
                right: '10',
                bottom: '10',
                containLabel: true
            },

            xAxis: [{
                interval: 50,

                type: 'category',
                boundaryGap: true,
                axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 12,
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.2)'
                    }

                },

                data: []
            }, {

                axisPointer: { show: false },
                axisLine: { show: false },
                position: 'bottom',
                offset: 20,


            }],

            yAxis: [{
                type: 'value',
                axisTick: { show: false },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 12,
                    },
                    formatter: function (value, index) {
                        var value
                        if (value >= 10000 && value < 1000000) {
                            value = value / 10000 + '万'
                        } else if (value >= 1000000) {
                            value = value / 1000000 + '百万'
                        } else if (value < 10000) {
                            value = value
                        }
                        return value
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }
                }
            }],
            series: [
                {
                    name: '女性',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {

                        normal: {
                            color: '#0184d5',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(1, 132, 213, 0.4)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(1, 132, 213, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#0184d5',
                            borderColor: 'rgba(221, 220, 107, .1)',
                            borderWidth: 12
                        }
                    },
                    data: []

                },
                {
                    name: '男性',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {

                        normal: {
                            color: '#00d887',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 216, 135, 0.4)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 216, 135, 0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#00d887',
                            borderColor: 'rgba(221, 220, 107, .1)',
                            borderWidth: 12
                        }
                    },
                    data: [5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]
                },
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize()
        })

        //获取数据重新渲染
        var mxdata = []
        var mydata = []
        var fxdata = []
        var fydata = []
        $.getJSON("https://bdapi.gxist.cn/api/year-per-depressed-pre?sex=male", function (values) {

            for (var i = 0; i < values["data"].length; i++) {
                mxdata.push(values["data"][i]["year"])
                mydata.push(Math.round(values["data"][i]["depressed_no"]))
            }
            myChart.setOption({
                xAxis: {
                    data: mxdata
                },
                series: [{
                    data: mydata
                }, {
                    data: fydata
                }]
            })
        })

        $.getJSON("https://bdapi.gxist.cn/api/year-per-depressed-pre?sex=female", function (values) {

            for (var i = 0; i < values["data"].length; i++) {
                fxdata.push(values["data"][i]["year"])
                fydata.push(Math.round(values["data"][i]["depressed_no"]))
            }
            myChart.setOption({
                xAxis: {
                    data: mxdata
                },
                series: [{
                    data: mydata
                }, {
                    data: fydata
                }]
            })

        })
    }
    function echarts_31() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('fb1'));
        var xdata = [];
        $.getJSON("https://bdapi.gxist.cn/api/sex-depressed", function (values) {
            for (var i = 0; i < values["data"].length; i++) {
                //重写JSON表单格式
                var arr = {
                    "name": values["data"][i]["sex"] == 'male' ? '女性' : '男性',
                    "value": values["data"][i]["depressedSex"]
                };
                xdata.push(arr);
            }
            option = {

                title: [{
                    text: '性别分布',
                    left: 'center',
                    herf: './pages/echarts_31.html',
                    textStyle: {
                        color: '#fff',
                        fontSize: '16',

                    },
                    events: {
                        click: function () {
                            window.location.href = './pages/echarts_31.html'; // 设置要跳转的链接
                        }
                    }

                }],
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                    position: function (p) {   //其中p为当前鼠标的位置
                        return [p[0] + 10, p[1] - 10];
                    }
                },
                legend: {

                    top: '70%',
                    itemWidth: 10,
                    itemHeight: 10,
                    data: ['女性', '男性'],
                    textStyle: {
                        color: 'rgba(255,255,255,.5)',
                        fontSize: '12',
                    }
                },
                series: [
                    {
                        name: '性别分布',
                        type: 'pie',
                        center: ['50%', '42%'],
                        radius: ['40%', '60%'],
                        color: ['#065aab', '#068eab'],
                        label: { show: false },
                        labelLine: { show: false },
                        data: xdata
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        })
    }
    function echarts_32() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('fb2'));

        var xdata = [];

        $.getJSON("https://bdapi.gxist.cn/api/age-depressed", function (values) {
            for (var i = 0; i < values["data"].length; i++) {
                //重写JSON表单格式
                var arr = { "name": values["data"][i]["age"], "value": values["data"][i]["depressedNo"] };
                xdata.push(arr);
            }
            option = {

                title: [{
                    text: '年龄分布',
                    left: 'center',
                    textStyle: {
                        color: '#fff',
                        fontSize: '16'
                    }

                }],
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                    position: function (p) {   //其中p为当前鼠标的位置
                        return [p[0] + 10, p[1] - 10];
                    }
                },
                legend: {

                    top: '70%',
                    itemWidth: 10,
                    itemHeight: 10,
                    data: ['5-14', '15-24', '25-34', '35-54', '55-74', '75+'],
                    textStyle: {
                        color: 'rgba(255,255,255,.5)',
                        fontSize: '12',
                    }
                },
                series: [
                    {
                        name: '年龄分布',
                        type: 'pie',
                        center: ['50%', '42%'],
                        radius: ['40%', '60%'],
                        color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab', '#06b4ab', '#06c8ab', '#06dcab', '#06f0ab'],
                        label: { show: false },
                        labelLine: { show: false },
                        data: xdata
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        })
    };
    function echarts_33() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('fb3'));
        var xdata = [];
        $.getJSON("https://bdapi.gxist.cn/api/gdp-per-section", function (values) {
            for (var i = 0; i < values["data"].length; i++) {
                //重写JSON表单格式
                var arr = { "name": values["data"][i]["gdpPerCapita"], "value": values["data"][i]["depressedNo"] };
                xdata.push(arr);
            }
            option = {
                title: [{
                    text: '人均gdp分布',
                    left: 'center',
                    textStyle: {
                        color: '#fff',
                        fontSize: '16'
                    }

                }],
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                    position: function (p) {   //其中p为当前鼠标的位置
                        return [p[0] + 10, p[1] - 10];
                    }
                },
                legend: {
                    top: '70%',
                    itemWidth: 10,
                    itemHeight: 10,
                    data: ['<300', '300-500', '500-1000', '>1000'],
                    textStyle: {
                        color: 'rgba(255,255,255,.5)',
                        fontSize: '12',
                    }
                },
                series: [
                    {
                        name: '人均gdp分布',
                        type: 'pie',
                        center: ['50%', '42%'],
                        radius: ['40%', '60%'],
                        color: ['#065aab', '#066eab', '#0682ab', '#0696ab'],
                        label: { show: false },
                        labelLine: { show: false },
                        data: xdata
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        })
    };
})
