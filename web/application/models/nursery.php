<?
  class nursery extends CI_Model {
    function __construct() {
      parent::__construct();
      $this->load->database();
    }

    function get_list() {
      $area1 = $this->input->get('area1');
      $area2 = $this->input->get('area2');
	  if (strlen($area2) == 0) {
	    $sql = "SELECT * FROM nursery WHERE area1 = ?";
		$query = $this->db->query($sql, array($area1));
		return $query->result_array();
	  } else {
		$sql = "SELECT * FROM nursery WHERE area1 = ? AND area2 = ?";
		$query = $this->db->query($sql, array($area1, $area2));
		return $query->result_array();
	  }
    }
  }
