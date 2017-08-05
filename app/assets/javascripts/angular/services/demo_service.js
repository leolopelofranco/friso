angular.module('Friso.services')
  .service('DemoService',['$http', '$q', function($http, $q) {
    this.chart_options = function() {
      return  {
        chart: {
            type: 'lineChart',
            height: 450,
            margin : {
                top: 55,
                right: 40,
                bottom: 40,
                left: 70
            },
            x: function(d){ return d[0]; },
            y: function(d){ return d[1]; },
            useInteractiveGuideline: true,
            dispatch: {
                stateChange: function(e){ console.log("stateChange"); },
                changeState: function(e){ console.log("changeState"); },
                tooltipShow: function(e){ console.log("tooltipShow"); },
                tooltipHide: function(e){ console.log("tooltipHide"); }
            },
            xAxis: {
                axisLabel: 'Time',
                tickFormat: function(d) {
                    return d3.time.format('%m/%d/%y')(new Date(d))
                },
            },
            yAxis: {
                axisLabel: 'Page Likes',
                tickFormat: function(d){
                    return d3.format('s')(d)
                },
                axisLabelDistance: -10
            },
            callback: function(chart){
                console.log("!!! lineChart callback !!!");
            }
        },
        title: {
            enable: false,
            text: 'Page Likes Growth'
        },
        subtitle: {
            enable: false,
            text: 'Cloudfone Page Likes are at increasing steady rate',
            css: {
                'text-align': 'center',
                'margin': '10px 13px 0px 7px'
            }
        },
        caption: {
            enable: false,
            html: '<b>Figure 1.</b> By April 2016 Cloudfones page likes were at <span style="text-decoration: underline;">607,150 and ended at 701,099 </span> by the end of April 2017. Between that timeframe page likes are at increasing steady rate but the most significant increase was between <b> January 11 to January 16,</b>where total page likes jumped from <b>666,623 to 694,674</b>\n',
            css: {
                'text-align': 'justify',
                'margin': '10px 13px 0px 7px'
            }
        }
      };
    }

    this.total_engagements_options = function() {
      return  {
        chart: {
            type: 'discreteBarChart',
            height: 450,
            x: function(d){return d.month;},
            y: function(d){return d.value;},
            showValues: true,
            valueFormat: function(d){
                return d3.format('d')(d);
            },
            transitionDuration: 500,
            xAxis: {
                axisLabel: 'Month',
                rotateLabels: -20
            },
            yAxis: {
                axisLabel: 'Revenue',
                axisLabelDistance: 30
            }
        }
      }
    }

    this.total_engagements_data = function() {
      return [
            {
                values: [
                    {
                        "label" : "Jan" ,
                        "value" : 29.765957771107
                    } ,
                    {
                        "label" : "Feb" ,
                        "value" : 20
                    } ,
                    {
                        "label" : "Mar" ,
                        "value" : 32.807804682612
                    } ,
                    {
                        "label" : "Apr" ,
                        "value" : 96.45946739256
                    } ,
                    {
                        "label" : "May" ,
                        "value" : 130.19434030906893
                    } ,
                    {
                        "label" : "Jun" ,
                        "value" : 198.079782601442
                    } ,
                    {
                        "label" : "Jul" ,
                        "value" : 150.925743130903
                    } ,
                    {
                        "label" : "Aug" ,
                        "value" : 50.1387322875705
                    },
                    {
                        "label" : "Sep" ,
                        "value" : 98.079782601442
                    } ,
                    {
                        "label" : "Oct" ,
                        "value" : 13.925743130903
                    } ,
                    {
                        "label" : "Nov" ,
                        "value" : 5.1387322875705
                    },
                    {
                        "label" : "Dec" ,
                        "value" : 5.1387322875705
                    }
                ]
            }
        ]
    }


    this.demo_data = function() {
      return [
      {
          key: "Page Likes",
          values: [[1488326400000, 28000], [1488412800000, 28007], [1488499200000, 28022], [1488585600000, 28027], [1488672000000, 28032], [1488758400000, 28046], [1488844800000, 28057], [1488931200000, 28066], [1489017600000, 28069], [1489104000000, 28070], [1489190400000, 28072], [1489276800000, 28077], [1489363200000, 28090], [1489449600000, 28096], [1489536000000, 28117], [1489622400000, 28124], [1489708800000, 28133], [1489795200000, 28134], [1489881600000, 28143], [1489968000000, 28148], [1490054400000, 28155], [1490140800000, 28167], [1490227200000, 28174], [1490313600000, 28190], [1490400000000, 28191], [1490486400000, 28201], [1490572800000, 28929], [1490659200000, 29580], [1490745600000, 29974], [1490832000000, 29995], [1490918400000, 30014], [1491004800000, 30046], [1491091200000, 30060], [1491177600000, 30088], [1491264000000, 30114], [1491350400000, 30156], [1491436800000, 30190], [1491523200000, 30201], [1491609600000, 30203], [1491696000000, 30211], [1491782400000, 30266], [1491868800000, 30309], [1491955200000, 30324], [1492041600000, 30326], [1492128000000, 30322], [1492214400000, 30321], [1492300800000, 30345], [1492387200000, 30391], [1492473600000, 30403], [1492560000000, 30430], [1492646400000, 30457], [1492732800000, 30476], [1492819200000, 30498], [1492905600000, 30525], [1492992000000, 30569], [1493078400000, 30611], [1493164800000, 30667], [1493251200000, 30722], [1493337600000, 30756], [1493424000000, 30770], [1493510400000, 30781], [1493596800000, 30794], [1493683200000, 30860], [1493769600000, 30904], [1493856000000, 30929], [1493942400000, 30947], [1494028800000, 30972], [1494115200000, 31022], [1494201600000, 31063], [1494288000000, 31096], [1494374400000, 31112], [1494460800000, 31122], [1494547200000, 31154], [1494633600000, 31168], [1494720000000, 31178], [1494806400000, 31212], [1494892800000, 31227], [1494979200000, 31240], [1495065600000, 31260], [1495152000000, 31271], [1495238400000, 31276], [1495324800000, 31294], [1495411200000, 31337], [1495497600000, 31367], [1495584000000, 31382], [1495670400000, 31397], [1495756800000, 31410], [1495843200000, 31423], [1495929600000, 31434], [1496016000000, 31458], [1496102400000, 31470], [1496188800000, 31481], [1496275200000, 31486], [1496361600000, 31494], [1496448000000, 31496], [1496534400000, 31512], [1496620800000, 31519], [1496707200000, 31536], [1496793600000, 31552], [1496880000000, 31563], [1496966400000, 31565], [1497052800000, 31573], [1497139200000, 31581], [1497225600000, 31591], [1497312000000, 31604], [1497398400000, 31621], [1497484800000, 31641], [1497571200000, 31652], [1497657600000, 31657], [1497744000000, 31666], [1497830400000, 31672], [1497916800000, 31683], [1498003200000, 31697], [1498089600000, 31708], [1498176000000, 31718], [1498262400000, 31723], [1498348800000, 31729], [1498435200000, 31735], [1498521600000, 31747], [1498608000000, 31757], [1498694400000, 31769]],
          color: '#ff7f0e',
          strokeWidth: 2,
          classed: 'dashed'
      },
  ];
    }

    this.docs = function() {
      return [
        {
          "mac": "10-FE-ED-A8-11-38",
          "name": "marc_collao",
          "header": "marc_collao_header",
          "wds": "0"
        },
        {
          "mac": "10-FE-ED-BF-BA-00",
          "name": "jenny_pablo",
          "header": "jenny_pablo_header",
          "wds": "4"
        },
        {
          "mac": "10-FE-ED-C0-35-66",
          "name": "sandee_agustin",
          "header": "sandee_agustin_header",
          "wds": "2"
        },
        {
          "mac": "10-FE-ED-BF-B9-BE",
          "name": "edna_trinidad",
          "header": "edna_trinidad_header",
          "wds": "5"
        },
        {
          "mac": "10-FE-ED-C0-50-A2",
          "name": "amelen_palanca",
          "header": "amelen_palanca_header",
          "wds": "9"
        },
        {
          "mac": "10-FE-ED-BF-E9-D2",
          "name": "aileen_ong",
          "header": "aileen_ong_header",
          "wds": "1"
        },
        {
          "mac": "10-FE-ED-BF-BA-3C",
          "name": "elena_sayo",
          "header": "elena_sayo_header",
          "wds": "3"
        },
        {
          "mac": "10-FE-ED-A8-11-B0",
          "name": "yvonne_yap",
          "header": "yvonne_yap_header",
          "wds": "10"
        },
        {
          "mac": "10-FE-ED-C0-31-46",
          "name": "jaimie_badillo",
          "header": "jaimie_badillo_header",
          "wds": "6"
        },
        {
          "mac": "10-FE-ED-C0-36-B6",
          "name": "mary_joan_cruz",
          "header": "mary_joan_cruz_header",
          "wds": "7"
        },
        {
          "mac": "10-FE-ED-BF-BA-34",
          "name": "minerva_mallillin",
          "header": "minerva_mallillin_header",
          "wds": "8"
        },
       	{
          "mac": "10-FE-ED-BF-E9-94",
          "name": "jaimee_llorin_gan",
          "header": "jaimee_llorin_gan_header",
          "wds": "11"
        },
        {
          "mac": "10-FE-ED-C0-2F-04",
          "name": "ma_lourdes_escobar",
          "header": "ma_lourders_escobar_header",
          "wds": "16"
        },
        {
          "mac": "10-FE-ED-BF-E9-A8",
          "name": "esther_averia",
          "header": "esther_averia_header",
          "wds": "13"
        },
        {
          "mac": "10-FE-ED-C0-4F-F8",
          "name": "pamela_gan_pe",
          "header": "pamela_gan_pe_header",
          "wds": "14"
        },
       	{
          "mac": "10-FE-ED-C0-36-D8",
          "name": "ma_rosario_marin",
          "header": "ma_rosario_marin_header",
          "wds": "15"
        },
   		{
          "mac": "E8-DE-27-8C-D3-CE",
          "name": "froilan_uy",
          "header": "froilan_uy_header",
          "wds": "16"
        },
        {
          "mac": "10-FE-ED-A8-0F-82",
          "name": "rosemarie_lim",
          "header": "rosemarie_lim_header",
          "wds": "17"
        },
        {
          "mac": "10-FE-ED-C0-4F-60",
          "name": "yolanda_lim",
          "header": "yolanda_lim_header",
          "wds": "18"
        },
        {
          "mac": "10-FE-ED-BF-E9-C4",
          "name": "argyll_arcigal",
          "header": "argyll_arcigal_header",
          "wds": "19"
        },
        {
          "mac": "10-FE-ED-BF-E9-D8",
          "name": "helen_de_villa",
          "header": "helen_de_villa_header",
          "wds": "20",
        },
        {
          "mac": "E8-DE-27-8D-0B-DA",
          "name": "charina_de_jesus",
          "header": "charina_de_jesus_header",
          "wds": "21"
        },
        {
          "mac": "10-FE-ED-BF-BA-50",
          "name": "margarette_perez",
          "header": "margarette_perez_header",
          "wds": "22"
        },
        {
          "mac": "10-FE-ED-BF-E9-A4",
          "name": "sharon_ann_gorosin",
          "header": "sharon_ann_gorosin_header",
          "wds": "23"
        },
        {
          "mac": "10-FE-ED-BF-BA-22",
          "name": "belinda_palma",
          "header": "belinda_palma_header",
          "wds": "24"
        },
        {
          "mac": "10-FE-ED-BF-B9-B0",
          "name": "julie_davide",
          "header": "julie_davide_header"
        },
    	{
          "mac": "E8-94-F6-A5-08-1A",
          "name": "carmen_zaballero",
          "header": "carmen_zaballero_header",
          "wds": "27"
        },
        {
          "mac": "A8-15-4D-E9-5A-E0",
          "name": "julie_bruel",
          "header": "julie_bruel_header",
          "wds": "28"
        },
        {
          "mac": "A4-2B-B0-A2-63-F2",
          "name": "eliza_fetiza",
          "header": "eliza_fetiza_header",
          "wds": "29"
        },
        {
          "mac": "E8-94-F6-A5-04-92",
          "name": "mita_brown",
          "header": "mita_brown_header",
          "wds": "30"
        },
        {
          "mac": "E8-94-F6-A5-06-42",
          "name": "habacon",
          "header": "habacon_header",
          "wds": "31"
        },
        {
          "mac": "E8-94-F6-A5-02-AA",
          "name": "mildred_del_castillo",
          "header": "mildred_del_castillo_header",
          "wds": "35"
        },
        {
          "mac": "E8-94-F6-A5-08-70",
          "name": "ferdinand_pinangat",
          "header": "ferdinand_pinangat_header",
          "wds": "36"
        },
        {
          "mac": "E8-94-F6-A5-04-CC",
          "name": "benilda_manaois",
          "header": "benilda_manaois_header",
          "wds": "37"
        },
        {
          "mac": "E8-94-F6-A5-07-BC",
          "name": "rosario_fider",
          "header": "rosario_fider_header",
          "wds": "38"
        },
        {
          "mac": "E8-94-F6-A5-08-48",
          "name": "sunny_duran",
          "header": "sunny_duran_header",
          "wds": "39"
        },
        {
          "mac": "E8-94-F6-A5-05-4C",
          "name": "alice_salvador",
          "header": "alice_salvador_header",
          "wds": "40"
      	},
    	{
          "mac": "E8-94-F6-A5-06-A8",
          "name": "baby_corrine_rodis",
          "header": "baby_corrine_rodis_header",
          "wds": "41"
        },
    	{
          "mac": "E8-94-F6-A5-04-D4",
          "name": "fatima_acojido",
          "header": "fatima_acojido_header",
          "wds": "42"
        },
    	{
          "mac": "E8-94-F6-A5-05-EA",
          "name": "hershey_antonio",
          "header": "hershey_antonio_header",
          "wds": "43"
        },
    	{
          "mac": "E8-94-F6-A5-07-DE",
          "name": "jocelyn_josefina",
          "header": "jocelyn_josefina_header",
          "wds": "44"
        },
    	{
          "mac": "E8-94-F6-A5-08-42",
          "name": "sheryl_barcenas",
          "header": "sheryl_barcenas_header",
          "wds": "45"
        },
    	{
          "mac": "E8-94-F6-A5-04-52",
          "name": "ma_lyn_benito",
          "header": "ma_lyn_benito_header",
          "wds": "46"
        },
   		{
          "mac": "E8-94-F6-A5-02-DE",
          "name": "nenita_teh",
          "header": "nenita_teh_header",
          "wds": "47"
        }
        ,
   		{
          "mac": "10-FE-ED-C0-2E-7E",
          "name": "Gan Montenegro",
          "wds": "26"
        }
      ]
    }

}]);
