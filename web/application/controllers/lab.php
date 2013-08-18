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

  }
