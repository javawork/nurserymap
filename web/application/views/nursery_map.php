<?
  $result_array = array();
  foreach($list as $listitem):
    $result_array[] = array("lat"=>$listitem['lat'], "lng"=>$listitem['lng'], "title"=>$listitem['title'], "type"=>$listitem['type'], "auth"=>$listitem['auth'], "id"=>$listitem['id'], "address"=>$listitem['address'], "phone"=>$listitem['phone']);
  endforeach;

  echo json_encode($result_array);
?>
