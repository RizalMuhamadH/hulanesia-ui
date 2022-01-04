<?php

if(! function_exists('parse_json')){
    function parse_json($json){
        $json = json_decode($json->getBody()->getContents(), true);
        return isset($json['hits']) ? $json['hits'] : $json;
    }
}

if(! function_exists('read_content')){
    function read_content($body, $max_paragraf = 10, $page = 'all'){
		$arr_content = explode("<p>", $body);
        $max_page = ceil(count($arr_content) / $max_paragraf);

        if($page != 'all') {
            $content = array_slice($arr_content, ($page - 1) * $max_paragraf, $max_paragraf);
        } else {
            $content = $arr_content;
        }

		return implode('', $content);
    }
}

if (! function_exists('read_pagination')) {
	function read_pagination($json, $active_page, $max_paragraf = 10)
	{
		if($json)
		{
			$arr_content = explode("</p>", $json);
			$max_page = ceil(count($arr_content)/$max_paragraf);
			if($max_page > 1)
			{
				$page = [];
				for($i = 0; $i < $max_page; $i++)
				{
					$num = $i;
					$num++;
					$page_query = $num > 1 ? "?page=".$num : "";
					$page[] = [
						'page' => $num,
						'num' => $num,
						'url' => url()->current().$page_query,
					];
				}
				if($active_page == $max_page){
					$before_page = $active_page-1;
					$page[] = [
						'page' => "Sebelumnya",
						'num' => $before_page,
						'url' => url()->current()."?page=".$before_page,
					];
					
				}elseif($active_page == "all"){
					
				}else{
					$next_page = $active_page+1;
					$page[] = [
						'page' => "Selanjutnya",
						'num' => $next_page,
						'url' => url()->current()."?page=".$next_page,
					];
				}
				$data = [
					'page' => $page,
					'active_page' => $active_page
				];
				return view('vendor.pagination.read', $data)->render();
			}
			return "";
		}
		return "";
	}
}