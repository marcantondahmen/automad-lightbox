<?php

/*
 *	Automad/Lightbox
 *	Copyright (c) 2020 by Marc Anton Dahmen
 *	https://marcdahmen.de
 *	Licensed under the MIT license.
 */

namespace Automad;
use Automad\Core as Core;

defined('AUTOMAD') or die('Direct access not permitted!');

class Lightbox {

	public function Lightbox($str) {

		// The pattern skips images already wrapped in a link.
		$regex = '/(?<!\[)\!\[[^\]]*\]\(([\w\-\/\?\&\=\:\.]+)(?:\?(\d+)x(\d+))?\)/i';
		$str = preg_replace_callback($regex, function($match) {

			$file = AM_BASE_DIR . $match[1];
			$link = $match[1];
			$caption = '';

			if (is_readable($file)) {
				
				$caption = Core\Str::stripTags(Core\Parse::caption($file));

				if (!empty($match[2]) && !empty($match[3])) {
					$image = new Core\Image($file, $match[2], $match[3], true);
					$link = $image->file;
				}

			}

			return '<a href="' . $match[1] . '" class="automad-lightbox-item" data-caption="' . $caption . '"><img src="' . $link . '"></a>';

		}, $str);

		return $str;;

	}

}