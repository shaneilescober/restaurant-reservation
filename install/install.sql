CREATE TABLE IF NOT EXISTS `opentable_settings` (
	`idx` int(100) NOT NULL auto_increment,
	`seq` int(10) NOT NULL,
	`default_location` varchar(250) NOT NULL,
	`default_abbr` varchar(250) NOT NULL,
	`display_view` int(100) NOT NULL,
	`arrangement` varchar(250) NOT NULL,
	PRIMARY KEY  (`idx`)
);
