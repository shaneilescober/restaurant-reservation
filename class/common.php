<?php
class common
{
	function modelContents()
	{
		return getInstance('modelOpentable');
	}
	
	function getFullUrl() {
		return $_SERVER['REQUEST_URI'];
	}
}