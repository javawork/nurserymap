function start_spin() {
	var opts = {
		lines: 13, // The number of lines to draw
		length: 20, // The length of each line
		width: 10, // The line thickness
		radius: 30, // The radius of the inner circle
		corners: 1, // Corner roundness (0..1)
		rotate: 0, // The rotation offset
		direction: 1, // 1: clockwise, -1: counterclockwise
		color: '#000', // #rgb or #rrggbb
		speed: 1, // Rounds per second
		trail: 60, // Afterglow percentage
		shadow: false, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		top: 'auto', // Top position relative to parent in px
		left: 'auto' // Left position relative to parent in px
	};
	var target = document.getElementById('map');
	window.spinner = new Spinner(opts).spin(target);
}

function stop_spin() {
	if (window.spinner != null) {
		window.spinner.stop();
	}
}

function remove_zoom_control() {
    if (window.map == null) {
        return;
    }

    window.map.removeControl(window.zoomControl, daum.maps.ControlPosition.RIGHT);
    window.map.removeControl(window.mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);
}

function create_zoom_control() {
    if (window.map == null) {
        return;
    }

    window.zoomControl = new daum.maps.ZoomControl();
    window.map.addControl(window.zoomControl, daum.maps.ControlPosition.RIGHT);
    window.mapTypeControl = new daum.maps.MapTypeControl();
    window.map.addControl(window.mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);
}

$(document).ready(function() {
    window.map = new daum.maps.Map(document.getElementById('map'), {
    	center: new daum.maps.LatLng(37.5663176911162, 126.97782838162229),
        level: 5,
        autosize: true
    });

    create_zoom_control();
    window.spot = null;
    window.zoomLevel = 5;
});

$().ready(function(){
  $('input.style_checkbox').prettyCheckable();
});

$().ready(function(){
  $("#arrow_right_img").hide();
  $("#arrow_left_img").show();
});


$( document ).ajaxStart(function() {
	start_spin();
});

$( document ).ajaxStop(function() {
	stop_spin();
});

$(document).ready(function() {
    $("#area1").change(function() {
        var area1 = $("#area1").val();
        var area2 = $('#area2');
        area2.empty();
        area2.append("<option value='선택'>선택</option>");
        
        var area_object = 
        {
        	'경기도' : 
        		[
            		'고양시',
                    '과천시',
                    '구리시',
                    '군포시',
                    '남양주시',
                    '부천시',
                    '성남시',
                    '수원시',
                    '시흥시',
                    '안산시',
                    '안양시',
                    '용인시',
                    '의정부시',
                    '파주시',
                    '하남시',
                    '화성시'
        		],
        	'서울특별시' : 
        		[
        			'강남구',
                    '강동구',
                    '강북구',
                    '강서구',
                    '관악구',
                    '광진구',
                    '노원구',
                    '동대문구',
                    '서대문구',
                    '서초구',
                    '성동구',
                    '송파구',
                    '양천구',
                    '영등포구',
                    '용산구',
                    '은평구',
                    '종로구',
                    '중구',
                    '중랑구'
        		],
            '제주도' : 
                [
                    '제주시',
                    '서귀포시'
                ],
            '전라북도' : 
                [
                    '전주시'
                ]
        };

        for (var index in area_object[area1] ) {
        	var city = area_object[area1][index];
        	var append_str = "<option value='".concat(city).concat("'>").concat(city).concat("</option>");
        	area2.append(append_str);
        }
        area2.selectmenu('refresh');
    });
});

function category_check() {
    if ( window.spot == null ) {
		return;
	}

	var checkedNational = $('#national').is(':checked');
	var checkedPrivate = $('#private').is(':checked');
	var checkedHome = $('#home').is(':checked');
	var checkedOther = $('#other').is(':checked');
	
	for ( var i = 0; i < window.spot.marker.length; ++i) {

		var markerVisible = false;
		if (window.spot.marker[i].type == 'national' && checkedNational) {
			markerVisible = true;
		} else if (window.spot.marker[i].type == 'private' && checkedPrivate) {
			markerVisible = true;
		} else if (window.spot.marker[i].type == 'home' && checkedHome) {
			markerVisible = true;
		} else if (window.spot.marker[i].type == 'other' && checkedOther) {
			markerVisible = true;
		}
		
		if (markerVisible) {
			window.spot.marker[i].setVisible(true);
		} else {
			window.spot.marker[i].setVisible(false);
			if (window.spot.info[i].show) {
				window.spot.info[i].close();
				window.spot.info[i].show = false;
			}
		}
	}
}

$(document).ready(function() {
    $("input[type=checkbox]").change(function() {
        category_check();
    });
});

function trim(s) {
    s += '';
    return s.replace(/^\s*|\s*$/g, '');
}

function zoom_changed() {
    if ( window.spot == null ) {
		return;
	}
	
	var curZoomLevel = window.map.getLevel();
	var prvZoomLevel = window.zoomLevel;
			
	if ( curZoomLevel >= 8 && prvZoomLevel <= 7 ) {
	
		for ( var i = 0; i < window.spot.marker.length; ++i) {
			var markerImage = '';
			if (window.spot.marker[i].type == 'national') {
				markerImage = '../asset/image/marker/national_small.gif';
			} else if (window.spot.marker[i].type == 'private') {
				markerImage = '../asset/image/marker/private_small.gif';
			} else if (window.spot.marker[i].type == 'home') {
				markerImage = '../asset/image/marker/home_small.gif';
			} else  {
				markerImage = '../asset/image/marker/other_small.gif';
			}
			window.spot.marker[i].setImage(new daum.maps.MarkerImage(markerImage, new daum.maps.Size(6, 6)));
		}
	} else if ( curZoomLevel <= 7 && prvZoomLevel >= 8 ) {
	
		for ( var i = 0; i < window.spot.marker.length; ++i) {
			var markerImage = '';
			if (window.spot.marker[i].type == 'national') {
				markerImage = '../asset/image/marker/national2.gif';
			} else if (window.spot.marker[i].type == 'private') {
				markerImage = '../asset/image/marker/private2.gif';
			} else if (window.spot.marker[i].type == 'home') {
				markerImage = '../asset/image/marker/home2.gif';
			} else  {
				markerImage = '../asset/image/marker/other2.gif';
			}
			window.spot.marker[i].setImage(new daum.maps.MarkerImage(markerImage, new daum.maps.Size(32, 31)));
		}
	}
	
	window.zoomLevel = curZoomLevel;
}

function hide_menu() {
    $( "#left" ).animate({
        width: "100px"
    }, 100 );

    $( "#map" ).animate({
        marginLeft: "100px"
    }, 100, function() {
        window.map.relayout();
    });

    $("#data_src").hide();
    $("#select_area").hide();
    $("#area1").hide();
    $("#area2").hide();
    $("#arrow_right_img").show();
    $("#arrow_left_img").hide();
    $("#email_img").hide();
    $("#fblike").hide();
    $("#fbshare_img").hide();
    $("#github_img").hide();
    var area1 = $("#area1").val();
    var area2 = $('#area2').val();
    if ( area1 != "선택" && area2 != "선택") {
        $("#selected_area_lbl").show();
        $("#selected_area_lbl").html("&nbsp;".concat(area1).concat("<br/>&nbsp;").concat(area2));    
    }
 }

function show_menu() {
    $( "#map" ).animate({
        marginLeft: "250px"
    }, 100 );

    $( "#left" ).animate({
        width: "250px"
    }, 100, function() {
        window.map.relayout();
    });

    $("#select_area").show();
    $("#data_src").show();
    $("#area1").show();
    $("#area2").show();

    $("#arrow_right_img").hide();
    $("#arrow_left_img").show();
    $("#email_img").show();
    $("#fblike").show();
    $("#fbshare_img").show();
    $("#github_img").show();
    $("#selected_area_lbl").hide();
}

$(document).ready(function() {
    $("#area2").change(function() {
    	
		hide_menu();
    	
        $.getJSON('lab/nursery_map',{'area1':$("#area1").val(), 'area2':$("#area2").val()},function(data) {

        	var center_obj = 
	        {
    			'하남시' : [37.5392604447999, 127.21485973272553],
    			'성남시' : [37.42003670585733, 127.12644872962304],
    			'용인시' : [37.24085271218495, 127.1779237037136],
    			'수원시' : [37.26345494183019, 127.0286617362734],
    			'고양시' : [37.65841449804349, 126.83195965092953],
    			'안양시' : [37.3942984481641, 126.95686050216128],
    			'군포시' : [37.361145434936404, 126.93549984126508],
    			'과천시' : [37.430202197951694, 126.98679436719006],
    			'구리시' : [37.594412382920076, 127.13078332629452],
    			'남양주시' : [37.636619093712184, 127.2179956609294],
    			'시흥시' : [37.38028249526057, 126.80396192866206],
    			'부천시' : [37.503582468308636, 126.76533704272084],
    			'안산시' : [37.322556363103224, 126.83271487089955],
    			'의정부시' : [37.738063869075106, 127.0338355611965],
    			'파주시' : [37.76004138441677, 126.77987683060536],
                '화성시' : [37.19750267618958, 126.83024737484254],
    			'강동구' : [37.53016088364412, 127.1237924476467], 
    			'서초구' : [37.48362486445245, 127.03268481105773], 
    			'강남구' : [37.51796996268891, 127.04706108493703],
    			'송파구' : [37.514479255901506, 127.10585874309253],
    			'영등포구' : [37.52596360964463, 126.89636950563505],
    			'관악구' : [37.47814493699732, 126.95158913168704],
    			'강북구' : [37.63918552781093, 127.02545176998863],
    			'강서구' : [37.55096461543074, 126.84953375951333],
    			'양천구' : [37.51708581917649, 126.86653290853928],
    			'노원구' : [37.65463930034909, 127.056344559225],
    			'종로구' : [37.57320147715918, 126.9788134469043],
    			'용산구' : [37.5324850802063, 126.99034701013849],
    			'중구' : [37.564121325600404, 126.99800791796308],
    			'동대문구' : [37.5743931576447, 127.03989692052352],
    			'성동구' : [37.56344161278281, 127.03695731280408],
    			'광진구' : [37.538540621125776, 127.08191447526313],
    			'중랑구' : [37.60656493690643, 127.09272518335989],
    			'서대문구' : [37.57915462693909, 126.93676132609222],
    			'은평구' : [37.60245697022765, 126.92882355003252],
                '제주시' : [33.50023061995307, 126.53221765920212],
                '서귀포시' : [33.25421464743313, 126.56017225178378],
                '전주시' : [35.82410932118429, 127.14804648346137]
	        };

            var area1 = $("#area1").val();
            var area2 = $("#area2").val();
            if (center_obj[area2] == undefined){
            	return;
            }

            var centerPos = new daum.maps.LatLng(center_obj[area2][0], center_obj[area2][1]);
            window.map.setCenter( centerPos );

            if ( window.spot != null )
            {
                for ( var i = 0; i < window.spot.marker.length; i++) {
                    window.spot.info[i].close();
                    window.spot.marker[i].setMap(null);
                }

                window.spot = null;
            }

            if ( window.spot == null )
            {
                var i = 0;
                window.spot = {marker:[], info:[] };
                $.each(data, function(entryIndex, entry) {
                    window.spot.marker[i] = new daum.maps.Marker({
                        position: new daum.maps.LatLng(parseFloat(entry['lat']), parseFloat(entry['lng']))
                    });
                    window.spot.marker[i].index = i;
                    window.spot.marker[i].setMap(window.map);
                    window.spot.marker[i].setTitle(entry['auth']);
					var markerImage = '';
					if ( entry['type'] == '국공립' ) {
						markerImage = '../asset/image/marker/national2.gif';
						window.spot.marker[i].type = 'national';
					} else if ( entry['type'] == '민간' ) {
						markerImage = '../asset/image/marker/private2.gif';
						window.spot.marker[i].type = 'private';
					} else if ( entry['type'] == '가정' ) {
						markerImage = '../asset/image/marker/home2.gif';
						window.spot.marker[i].type = 'home';
					} else {
						markerImage = '../asset/image/marker/other2.gif';
						window.spot.marker[i].type = 'other';
					}
					
					window.spot.marker[i].setImage(new daum.maps.MarkerImage(markerImage, new daum.maps.Size(32, 31)));
					
                    window.spot.info[i] = new daum.maps.InfoWindow({
                        content: '<table><tr><td height="12" style="background:#4d7dbe;font-family:돋움;color:white;font-size:14px;font-weight:bold;" align="CENTER">'+trim(entry['title'])+'</td></tr><tr><td style="padding-right:10px;padding-left:10px;font-family:돋움;font-size:12px;"><a href="http://m.childcare.go.kr/nursery/neighbored_foundSlPL.jsp?stcode=' + entry['id'] + '&flag=BISl" target="_blank">'+ entry['address'] +'</a><br>'+ entry['phone'] +'</td></tr></table>'
                    });

                    daum.maps.event.addListener(window.spot.marker[i], "click", function() {
						var thisInfoWindowShow = window.spot.info[this.index].show;
                        for ( var i = 0; i < window.spot.marker.length; i++) {
                            window.spot.info[i].close();
							window.spot.info[i].show = false;
                        }
						if (thisInfoWindowShow) {
							return;
						}
						
                        window.spot.info[this.index].open(map, window.spot.marker[this.index]);
						window.spot.info[this.index].show = true;
                    });

                    i = i + 1;
                });

                daum.maps.event.addListener(map, "click", function() {
                    for ( var i = 0; i < window.spot.marker.length; i++) {
                        window.spot.info[i].close();
						window.spot.info[i].show = false;
                    }
                });
				
				daum.maps.event.addListener(map, "zoom_changed", function() {
                    zoom_changed();
                });
            }
			
			category_check();
        });
    });
});

$(document).ready(function() {

	$('[name=hide_select_area]').click(function() {
		hide_menu();
		return false;
	});
});


$(document).ready(function() {
	$('[name=show_select_area]').click(function() {
		show_menu();
		return false;
	});
});