<?
  class Lab extends CI_Controller {
    function __construct() {
      parent::__construct();
      $this->load->model('nursery');
    }

    public function test() {
      echo 'test!!';
    }

    public function dbtest() {
      $this->load->database();
      echo 'dbtest!!';
    }

    function nursery_list() {
      echo '<meta http-equiv="Content-type" content="text/html; charset=utf-8" />';
      $data['list'] = $this->nursery->get_list();
      $this->load->view('nursery_list', $data);
    }

    function nursery_map() {
      $data['list'] = $this->nursery->get_list();
      $this->load->view('nursery_map', $data);
    }

    function nursery_map2() {
      $data['list'] = $this->nursery->get_list();
      $this->load->view('nursery_map2', $data);
    }

    function childcare_list() {

      $url = 'http://www.childcare.go.kr/cpis2gi/nursery/NurserySlPL.jsp';
      //http://m.childcare.go.kr/nursery/mAllNurserySlPL.jsp

      $offset = $this->input->get('offset');
      $ctprvn = $this->input->get('area1');
      $signgu = $this->input->get('area2');

      //$post_str = 'programId=P0001PG00001908';
      $post_str = 'flag=NSSlPL';
      $post_str .= '&offset='.$offset;
      $post_str .= '&ctprvn='.$ctprvn;
      $post_str .= '&signgu='.$signgu;

      $ch = curl_init ($url);
      curl_setopt ($ch, CURLOPT_POST, true);
      curl_setopt ($ch, CURLOPT_POSTFIELDS, $post_str);
      curl_setopt ($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt ($ch, CURLOPT_TIMEOUT, 60); // 60 sec
      $returndata = curl_exec ($ch);
      echo $returndata;

    }

    function childcare_detail() {

      $url = 'http://www.childcare.go.kr/cpis2gi/club/clubuse/ClubUseMain.jsp';

      $clubid = $this->input->get('id');

      $post_str = 'CLUBID='.$clubid;

      $ch = curl_init ($url);
      curl_setopt ($ch, CURLOPT_POST, true);
      curl_setopt ($ch, CURLOPT_POSTFIELDS, $post_str);
      curl_setopt ($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt ($ch, CURLOPT_TIMEOUT, 60);
      $returndata = curl_exec ($ch);
      echo $returndata;

    }

    function childcare_map() {

      $url = 'http://www.childcare.go.kr/cpis2gi/nursery/NurseryMap.jsp';

      $stcode = $this->input->get('id');

      $post_str = 'flag=NA';
      $post_str .= '&stcode='.$stcode;

      $ch = curl_init ($url);
      curl_setopt ($ch, CURLOPT_POST, true);
      curl_setopt ($ch, CURLOPT_POSTFIELDS, $post_str);
      curl_setopt ($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt ($ch, CURLOPT_TIMEOUT, 60);
      $returndata = curl_exec ($ch);
      echo $returndata;

    }
  }
