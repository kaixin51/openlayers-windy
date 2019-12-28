var windyLayer,windydata;
function getWindyLayer(){
    if(!!windydata){
        if(!!windyLayer){
            windyLayer.setData(windydata);
        }else{
            windyLayer = new WindLayer(windydata, {
                layerName: 'data',
                projection: 'EPSG:4326',
                ratio: 1,
                map: map
            });
            windyLayer.appendTo(map);
        }
    }else{
        $.ajax({
            url:"json/current-wind.json",
            type:"get",
            dataType:"json",
            success:function(result){
                if(result.returnCode == "0"){
                    windydata = JSON.parse(result.DS.content);
                    if(!!windyLayer){
                        windyLayer.setData(windydata);
                    }else{
                        windyLayer = new WindLayer(windydata, {
                            layerName: 'data',
                            projection: 'EPSG:4326',
                            ratio: 1,
                            map: map
                        });
                        windyLayer.appendTo(map);
                    }
                }else{
                    alert("暂无风场数据！");
                }
            }
        })
    }
}

function exitWindyLayer(){
    windyLayer.clearWind();
}