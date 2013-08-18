<html>
<head>
  <link href="../../asset/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
</head>
<body>
  <table border="1">
    <tr>
      <td>no</td>
      <td>title</td>
      <td>address</td>
      <td>phone</td>
      <td>lat</td>
      <td>lng</td>
    </tr>
    <? $count = 1 ?>
    <? foreach($list as $listitem): ?>
    <tr>
      <td><?=$count ?></td>
      <td><?=$listitem['title']?></td>
      <td><?=$listitem['address']?></td>
      <td><?=$listitem['phone']?></td>
      <td><?=$listitem['lat']?></td>
      <td><?=$listitem['lng']?></td>
    </tr>
    <? $count = $count + 1 ?>
    <? endforeach ?>
  </table>
</body>
</html>
