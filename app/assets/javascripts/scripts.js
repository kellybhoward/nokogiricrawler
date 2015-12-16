$(document).ready(function(){
    $('#loading').hide();
    $('form').submit(function(){
        $('#errors').empty();
        $('#loading').show();
        $.post($(this).attr('action'),$(this).serialize(),function(res){
            $('#loading').hide();
            //generate chart with voting data
            if(res.message){
                $('#errors').html(res.message);
            }
            else{
                $('#errors').empty();
                $(function () {
                    $('#container').highcharts({
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie'
                        },
                        title: {
                            text: ''
                        },
                        tooltip: {
                            pointFormat: '{series.data.name}: {point.y}'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: true,
                                    format: '{point.name}: {point.percentage:.1f}%',
                                    style: {
                                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                    }
                                }
                            }
                        },
                        series: [{
                            name: 'Keywords',
                            colorByPoint: true,
                            data: [{
                                name: res[0][0],
                                y: res[0][1]
                            }, {
                                name: res[1][0],
                                y: res[1][1]
                            }, {
                                name: res[2][0],
                                y: res[2][1]
                            }, {
                                name: res[3][0],
                                y: res[3][1]
                            }, {
                                name: res[4][0],
                                y: res[4][1]
                            }, {
                                name: res[5][0],
                                y: res[5][1]
                            }, {
                                name: res[6][0],
                                y: res[6][1]
                            }, {
                                name: res[7][0],
                                y: res[7][1]
                            }, {
                                name: res[8][0],
                                y: res[8][1]
                            }, {
                                name: res[9][0],
                                y: res[9][1]
                            }]
                        }]
                    });
                }); //end of chart generation
            }
        },"json");
        return false;
    });
});
