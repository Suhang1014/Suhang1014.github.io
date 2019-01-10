//ECharts

//line chart of year and imdb_score
var ysLineChart = echarts.init(document.getElementById('year_score'),'shine');
$.getJSON('data/year_avgs.json', function (data) {
    var option_ys = {
        title: {
            text: 'The Trend of Average Score with Time',
            x: 'center',
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['IMDB Score'],
            x: 110,
            y: 30,
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false, title: 'Data View'},
                magicType: {type: ['line', 'bar']},
                restore: {title: 'Restore'},
                saveAsImage: {title: 'Save as Image'}
            },
        },
        dataZoom: {
            show: true,
            start : 0
        },
        xAxis:  {
            name: 'Year',
            type: 'category',
            boundaryGap: false,
            data: [1916.0, 1920.0, 1925.0, 1927.0, 1929.0, 1930.0, 1932.0, 1933.0,
                1934.0, 1935.0, 1936.0, 1937.0, 1938.0, 1939.0, 1940.0, 1941.0,
                1942.0, 1943.0, 1944.0, 1945.0, 1946.0, 1947.0, 1948.0, 1949.0,
                1950.0, 1951.0, 1952.0, 1953.0, 1954.0, 1955.0, 1956.0, 1957.0,
                1958.0, 1959.0, 1960.0, 1961.0, 1962.0, 1963.0, 1964.0, 1965.0,
                1966.0, 1967.0, 1968.0, 1969.0, 1970.0, 1971.0, 1972.0, 1973.0,
                1974.0, 1975.0, 1976.0, 1977.0, 1978.0, 1979.0, 1980.0, 1981.0,
                1982.0, 1983.0, 1984.0, 1985.0, 1986.0, 1987.0, 1988.0, 1989.0,
                1990.0, 1991.0, 1992.0, 1993.0, 1994.0, 1995.0, 1996.0, 1997.0,
                1998.0, 1999.0, 2000.0, 2001.0, 2002.0, 2003.0, 2004.0, 2005.0,
                2006.0, 2007.0, 2008.0, 2009.0, 2010.0, 2011.0, 2012.0, 2013.0,
                2014.0, 2015.0, 2016.0]
        },
        yAxis: {
            name: 'Score',
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            },
            min: 4,
        },
        series: [
            {
                name:'IMDB Score',
                type:'line',
                data:data,
                markPoint: {
                    data: [
                        {type: 'max', name: 'Max Score'},
                        {type: 'min', name: 'Min Score'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: 'Average Score'}
                    ]
                }
            },
        ]
    };
    ysLineChart.setOption(option_ys);
});


//WordCloud of Genres
var genre_cloud = echarts.init(document.getElementById('word_cloud'), 'shine');
$.getJSON('data/num_genres.json', function (data) {
    option = {
        title: {
            text: 'Number of Genres',
            x: 'center'
        },
        tooltip: {
            show: true
        },
        toolbox: {
            x: 780,
            y: 'top',
            feature: {
                dataView: {show: true, title: 'Data View'},
                restore: {show: true, title: 'Switch color'},
                saveAsImage: {
                    show: true,
                    title: 'Save as image',
                    type: 'png',
                }
            }
        },
        series: [{
            name: 'Number of Genres',
            type: 'wordCloud',
            size: ['100%', '100%'],
            textRotation : [0, 45, 90, -45],
            textPadding: 20,
            autoSize: {
                enable: true,
                minSize: 30
            },
            textStyle: {
                normal: {
                    color: function () {
                        return 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')'
                    },
                },
                emphasis: {
                    shadowBlur: 6,
                    shadowColor: '#e6b600'
                }
            },
            data: data.data.map(function (item) {
                item = {
                    name: item.index,
                    value: item.values,
                    textStyle: {
                        normal: {},
                        emphasis: {}
                    }
                };
                return item;
            })
        }]
    };
    genre_cloud.setOption(option);
});


//Map
var myMap = echarts.init(document.getElementById('map'), 'shine');
$.getJSON('data/num_country_above_average.json',function (data) {
    var country_num = data.data.map(function (item) {
        return {
            name: item.country,
            value: item.num,
        }
    });
    // console.log(country_num);
    option = {
        title: {
            text:'Distribution of high score movies',
            left: 'center',
            top: 'top'
        },
        tooltip : {
            trigger: 'item',
            formatter : function (params) {
                if (params != undefined) {
                    var value = params.data.value;
                    return params.seriesName + '<br/>' + params.data.name + ' : ' + value;
                }
            }
        },
        toolbox: {
            show : true,
            x: 780,
            y: 'top',
            feature : {
                dataView : {show: true, readOnly: true, title: 'Data View'},
                restore : {show: true, title: 'Restore'},
                saveAsImage : {show: true, title: 'Save as Image'}
            }
        },
        visualMap: {
            min: 0,
            max: 2000,
            range: [1,2000],
            text:['High','Low'],
            realtime: false,
            calculable: true,
            color: ['orangered','yellow','lightskyblue']
        },
        series: [
            {
                name: 'Distribution of high score movies',
                type: 'map',
                mapType: 'world',
                roam: true,
                itemStyle:{
                    emphasis:{label:{show:true}}
                },
                data:country_num,
            }
        ]
    };
    myMap.setOption(option);
});


//Bar chart of average score given by different age groups
var ageBarChart = echarts.init(document.getElementById('age_chart'), 'shine');
var placeHoledStyle = {
    normal:{
        barBorderColor:'rgba(0,0,0,0)',
        color:'rgba(0,0,0,0)'
    },
    emphasis:{
        barBorderColor:'rgba(0,0,0,0)',
        color:'rgba(0,0,0,0)'
    }
};
var dataStyle = {
    normal: {
        label : {
            show: true,
            position: 'insideLeft',
            formatter: '{c}'
        }
    }
};
$.getJSON('data/average_score_agegroup.json', function (data) {
    // console.log(data.schema.fields.map(function (item) {
    //     return item.name;
    // }).slice(1,5));
    legend_data = data.schema.fields.map(function (item) {
        return item.name;
    }).slice(1,5);
    elem = legend_data.pop();
    legend_data.unshift(elem);
    option = {
        title: {
            text: 'Average Score Given by Different Age Groups of Every Genre',
            x: 'center'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {
                type : 'shadow'
            },
            formatter : '{b}<br/>{a0}:{c0}<br/>{a2}:{c2}<br/>{a4}:{c4}<br/>{a6}:{c6}'
        },
        legend: {
            x: 120,
            y: 55,
            itemGap : document.getElementById('age_chart').offsetWidth / 7,
            data: legend_data
        },
        toolbox: {
            show : true,
            x: 780,
            y: 'top',
            feature : {
                dataView : {show: true, readOnly: true, title: 'Data View'},
                restore : {show: true, title: 'Restore'},
                saveAsImage : {show: true, title: 'Save as Image', type: 'png'}
            }
        },
        grid: {
            y: 80,
            y2: 30
        },
        xAxis : [
            {
                type : 'value',
                name: 'Age groups',
                position: 'top',
                splitLine: {show: false},
                axisLabel: {show: false}
            }
        ],
        yAxis : [
            {
                type : 'category',
                splitLine: {show: false},
                data : data.data.map(function (item) {
                    return item.index;
                })
            }
        ],
        series : [
            {
                name:'under18',
                type:'bar',
                stack: '总量',
                itemStyle : dataStyle,
                data: data.data.map(function (item) {
                    return item['under18'];
                })
            },
            {
                name:'under18',
                type:'bar',
                stack: '总量',
                itemStyle: placeHoledStyle,
                data: data.data.map(function (item) {
                    return 10 - item['under18'];
                })
            },
            {
                name:'18-29',
                type:'bar',
                stack: '总量',
                itemStyle : dataStyle,
                data: data.data.map(function (item) {
                    return item['18-29'];
                })
            },
            {
                name:'18-29',
                type:'bar',
                stack: '总量',
                itemStyle: placeHoledStyle,
                data: data.data.map(function (item) {
                        return 10 - item['18-29'];
                })
            },
            {
                name:'30-44',
                type:'bar',
                stack: '总量',
                itemStyle : dataStyle,
                data: data.data.map(function (item) {
                        return item['30-44'];
                })
            },
            {
                name:'30-44',
                type:'bar',
                stack: '总量',
                itemStyle: placeHoledStyle,
                data: data.data.map(function (item) {
                        return 10 - item['30-44'];
                })
            },
            {
                name:'above45',
                type:'bar',
                stack: '总量',
                itemStyle : dataStyle,
                data: data.data.map(function (item) {
                        return item['above45'];
                })
            },
            {
                name:'above45',
                type:'bar',
                stack: '总量',
                itemStyle: placeHoledStyle,
                data: data.data.map(function (item) {
                        return 10 - item['above45'];
                })
            }
        ]
    };
    ageBarChart.setOption(option);
});

//Bar chart of average score given by female of different age groups of every genre
var femaleBarChart = echarts.init(document.getElementById('female_chart'), 'shine');
var placeHoledStyle = {
    normal:{
        barBorderColor:'rgba(0,0,0,0)',
        color:'rgba(0,0,0,0)'
    },
    emphasis:{
        barBorderColor:'rgba(0,0,0,0)',
        color:'rgba(0,0,0,0)'
    }
};
var dataStyle = {
    normal: {
        label : {
            show: true,
            position: 'insideLeft',
            formatter: '{c}'
        }
    }
};
$.getJSON('data/average_score_agegroupf.json', function (data) {
    // console.log(data.schema.fields.map(function (item) {
    //     return item.name;
    // }).slice(1,5));
    legend_data = data.schema.fields.map(function (item) {
        return item.name;
    }).slice(1,5);
    elem = legend_data.pop();
    legend_data.unshift(elem);
    option = {
        title: {
            text: 'Average Score Given by Female of Every Genre',
            x: 'center'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {
                type : 'shadow'
            },
            formatter : '{b}<br/>{a0}:{c0}<br/>{a2}:{c2}<br/>{a4}:{c4}<br/>{a6}:{c6}'
        },
        legend: {
            x: 120,
            y: 55,
            itemGap : document.getElementById('female_chart').offsetWidth / 7,
            data: legend_data
        },
        toolbox: {
            show : true,
            x: 780,
            y: 'top',
            feature : {
                dataView : {show: true, readOnly: true, title: 'Data View'},
                restore : {show: true, title: 'Restore'},
                saveAsImage : {show: true, title: 'Save as Image', type: 'png'}
            }
        },
        grid: {
            y: 80,
            y2: 30
        },
        xAxis : [
            {
                type : 'value',
                name: 'Age groups',
                position: 'top',
                splitLine: {show: false},
                axisLabel: {show: false}
            }
        ],
        yAxis : [
            {
                type : 'category',
                splitLine: {show: false},
                data : data.data.map(function (item) {
                    return item.index;
                })
            }
        ],
        series : [
            {
                name:'under18',
                type:'bar',
                stack: '总量',
                itemStyle : dataStyle,
                data: data.data.map(function (item) {
                    return item['under18'];
                })
            },
            {
                name:'under18',
                type:'bar',
                stack: '总量',
                itemStyle: placeHoledStyle,
                data: data.data.map(function (item) {
                    return 10 - item['under18'];
                })
            },
            {
                name:'18-29',
                type:'bar',
                stack: '总量',
                itemStyle : dataStyle,
                data: data.data.map(function (item) {
                    return item['18-29'];
                })
            },
            {
                name:'18-29',
                type:'bar',
                stack: '总量',
                itemStyle: placeHoledStyle,
                data: data.data.map(function (item) {
                    return 10 - item['18-29'];
                })
            },
            {
                name:'30-44',
                type:'bar',
                stack: '总量',
                itemStyle : dataStyle,
                data: data.data.map(function (item) {
                    return item['30-44'];
                })
            },
            {
                name:'30-44',
                type:'bar',
                stack: '总量',
                itemStyle: placeHoledStyle,
                data: data.data.map(function (item) {
                    return 10 - item['30-44'];
                })
            },
            {
                name:'above45',
                type:'bar',
                stack: '总量',
                itemStyle : dataStyle,
                data: data.data.map(function (item) {
                    return item['above45'];
                })
            },
            {
                name:'above45',
                type:'bar',
                stack: '总量',
                itemStyle: placeHoledStyle,
                data: data.data.map(function (item) {
                    return 10 - item['above45'];
                })
            }
        ]
    };
    femaleBarChart.setOption(option);
});

//Bar chart of average score given by female of different age groups of every genre
var maleBarChart = echarts.init(document.getElementById('male_chart'), 'shine');
var placeHoledStyle = {
    normal:{
        barBorderColor:'rgba(0,0,0,0)',
        color:'rgba(0,0,0,0)'
    },
    emphasis:{
        barBorderColor:'rgba(0,0,0,0)',
        color:'rgba(0,0,0,0)'
    }
};
var dataStyle = {
    normal: {
        label : {
            show: true,
            position: 'insideLeft',
            formatter: '{c}'
        }
    }
};
$.getJSON('data/average_score_agegroupm.json', function (data) {
    // console.log(data.schema.fields.map(function (item) {
    //     return item.name;
    // }).slice(1,5));
    legend_data = data.schema.fields.map(function (item) {
        return item.name;
    }).slice(1,5);
    elem = legend_data.pop();
    legend_data.unshift(elem);
    option = {
        title: {
            text: 'Average Score Given by Male of Every Genre',
            x: 'center'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {
                type : 'shadow'
            },
            formatter : '{b}<br/>{a0}:{c0}<br/>{a2}:{c2}<br/>{a4}:{c4}<br/>{a6}:{c6}'
        },
        legend: {
            x: 120,
            y: 55,
            itemGap : document.getElementById('female_chart').offsetWidth / 7,
            data: legend_data
        },
        toolbox: {
            show : true,
            x: 780,
            y: 'top',
            feature : {
                dataView : {show: true, readOnly: true, title: 'Data View'},
                restore : {show: true, title: 'Restore'},
                saveAsImage : {show: true, title: 'Save as Image', type: 'png'}
            }
        },
        grid: {
            y: 80,
            y2: 30
        },
        xAxis : [
            {
                type : 'value',
                name: 'Age groups',
                position: 'top',
                splitLine: {show: false},
                axisLabel: {show: false}
            }
        ],
        yAxis : [
            {
                type : 'category',
                splitLine: {show: false},
                data : data.data.map(function (item) {
                    return item.index;
                })
            }
        ],
        series : [
            {
                name:'under18',
                type:'bar',
                stack: '总量',
                itemStyle : dataStyle,
                data: data.data.map(function (item) {
                    return item['under18'];
                })
            },
            {
                name:'under18',
                type:'bar',
                stack: '总量',
                itemStyle: placeHoledStyle,
                data: data.data.map(function (item) {
                    return 10 - item['under18'];
                })
            },
            {
                name:'18-29',
                type:'bar',
                stack: '总量',
                itemStyle : dataStyle,
                data: data.data.map(function (item) {
                    return item['18-29'];
                })
            },
            {
                name:'18-29',
                type:'bar',
                stack: '总量',
                itemStyle: placeHoledStyle,
                data: data.data.map(function (item) {
                    return 10 - item['18-29'];
                })
            },
            {
                name:'30-44',
                type:'bar',
                stack: '总量',
                itemStyle : dataStyle,
                data: data.data.map(function (item) {
                    return item['30-44'];
                })
            },
            {
                name:'30-44',
                type:'bar',
                stack: '总量',
                itemStyle: placeHoledStyle,
                data: data.data.map(function (item) {
                    return 10 - item['30-44'];
                })
            },
            {
                name:'above45',
                type:'bar',
                stack: '总量',
                itemStyle : dataStyle,
                data: data.data.map(function (item) {
                    return item['above45'];
                })
            },
            {
                name:'above45',
                type:'bar',
                stack: '总量',
                itemStyle: placeHoledStyle,
                data: data.data.map(function (item) {
                    return 10 - item['above45'];
                })
            }
        ]
    };
    maleBarChart.setOption(option);
});


//Scatter plot budget vs. imdb_score
var bud_sc = echarts.init(document.getElementById('budget_score'), 'shine');
$.getJSON('data/budget_vs_score.json', function (data) {
    var data = data.data;
    var genre_list = [
        'Crime', 'Family', 'Horror', 'Comedy', 'Romance', 'Action', 'Animation', 'History',
        'Drama', 'Thriller', 'Western', 'Biography', 'Sci-Fi', 'War', 'Adventure', 'Music',
        'Fantasy', 'Mystery', 'Sport'
    ];
    var dataset = [];
    for (var i=0; i<genre_list.length; i++) {
        var subset = {};
        var subset_line = {};
        var points_set = [];
        subset['name'] = genre_list[i];
        for (var j=0; j<data.length; j++) {
            if (data[j]['genre'] == genre_list[i]) {
                var data_point = [];
                data_point.push(data[j].budget);
                data_point.push(data[j].imdb_score);
                points_set.push(data_point);
            }
        }
        subset['type'] = 'scatter';
        subset['data'] = points_set;
        subset['markPoint'] = {
            data : [
                {type : 'max', name: 'Highest Score'},
                {type : 'min', name: 'Lowest Score'}
            ]
        };
        subset['markLine'] = {
            data : [
                {type : 'average', name: 'Average Score'}
            ]
        };
        dataset.push(subset);
        // var myRegression = ecStat.regression('polynomial', points_set, 3);
        // myRegression.points.sort(function(a, b) {
        //     return a[0] - b[0];
        // });
        // subset_line['type'] = 'line';
        // subset_line['data'] = myRegression.points;
        // subset_line['markPoint'] = {
        //     itemStyle: {
        //         normal: {
        //             color: 'transparent'
        //         }
        //     },
        //     label: {
        //         normal: {
        //             show: true,
        //                 position: 'left',
        //                 formatter: myRegression.expression,
        //                 textStyle: {
        //                 color: '#333',
        //                     fontSize: 14
        //             }
        //         }
        //     },
        //     data: [{
        //         coord: myRegression.points[myRegression.points.length - 1]
        //     }]
        // };
        // dataset.push(subset_line);
    }
    console.log(dataset);
    option = {
        title : {
            text: 'Budget vs. IMDB_score',
            x: 'center'
        },
        tooltip : {
            trigger: 'axis',
            showDelay : 0,
            axisPointer:{
                show: true,
                type : 'cross',
                lineStyle: {
                    type : 'dashed',
                    width : 1
                }
            }
        },
        legend: {
            data: genre_list,
            orient: 'vertical',
            x: 'left',
            y: 60
        },
        toolbox: {
            show : true,
            x: 'right',
            y: 'top',
            feature : {
                dataZoom : {show: true, title: 'Data Zoom'},
                dataView : {show: true, readOnly: true, title: 'Data View'},
                restore : {show: true, title: 'Restore'},
                saveAsImage : {show: true, title: 'Save as Image', type: 'png'}
            }
        },
        xAxis : [
            {
                type : 'value',
                name: 'Budget',
                scale:true,
                axisLabel : {
                    formatter: '${value}'
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                name: 'IMDB Score',
                scale:true,
                axisLabel : {
                    formatter: '{value}'
                }
            }
        ],
        series : dataset
    };
    bud_sc.setOption(option);
});

//director actor1 relationship
