/*!
 *	Automad/Lightbox
 *	Copyright (c) 2020 by Marc Anton Dahmen
 *	https://marcdahmen.de
 *	Licensed under the MIT license.
 */


+function ($) {

	$.fn.AutomadLightbox = function () {

		var images = $(this);

		if (images.length > 0) {

			var lightbox = $('<div class="automad-lightbox"></div>').appendTo('body').hide(),
				caption = $('<div class="caption"></div>').appendTo(lightbox),
				captionText = $('<div class="caption-text"></div>').appendTo(caption),
				close = $('<a class="close" href="#"></a>').appendTo(lightbox),
				
				isVisible = false,	// Lightbox is visible
				origWidth,			// Original width of image
				origHeight,			// Original height of image
				current;			// index of current image

			// Caption 
			displayCaption = function (str) {
				captionText.html(str);
				caption.fadeIn(300);
			}

			// Navigation

			// Close
			close.click(function () {

				lightbox.fadeOut(300, function () {
					bigImage.remove();
				});
				isVisible = false;
				return false;

			});

			if (images.length > 1) {

				var prev = $('<a class="prev" href="#"></a>').appendTo(lightbox),
					next = $('<a class="next" href="#"></a>').appendTo(lightbox);

				// Buttons
				prev.click(function () {
					if (current > 0) {
						current -= 1;
					} else {
						current = images.length - 1;
					}
					changeImage(current);
					return false;
				});

				next.click(function () {
					if (images.length > (current + 1)) {
						current += 1;
					} else {
						current = 0;
					}
					changeImage(current);
					return false;
				});

			}

			// Set image size & fade in 
			var setImageSizeAndFadeIn = function () {

				var bigWidth = bigImage.width(),
					bigHeight = bigImage.height(),
					screenRatio = lightbox.height() / lightbox.width(),
					bigRatio = bigHeight / bigWidth;

				// Calculate size and position				
				if ((origWidth > lightbox.width()) || (origHeight > lightbox.height())) {
					if (screenRatio > bigRatio) {
						bigWidth = lightbox.width();
						bigHeight = bigWidth * bigRatio;
					} else {
						bigHeight = lightbox.height();
						bigWidth = bigHeight / bigRatio;
					}
				}

				if ((lightbox.height() - bigHeight) != 0) {
					bigTop = ((lightbox.height() - bigHeight) / 2) + 'px';
				} else {
					bigTop = 0;
				}

				if ((lightbox.width() - bigWidth) != 0) {
					bigLeft = ((lightbox.width() - bigWidth) / 2) + 'px';
				} else {
					bigLeft = 0;
				}

				bigImage.css({
					width: bigWidth + 'px',
					height: bigHeight + 'px',
					top: bigTop,
					left: bigLeft
				});

				bigImage.fadeIn(300);

			};

			// Thumbnails 
			// Lightbox fade in			
			images.each(function (i) {

				var $this = $(this),
					url = $this.attr('href'),
					dataCaption = $this.data('caption');

				$this.click(function () {

					// Set current index to clicked image
					current = i;

					bigImage = $('<img alt="">')
						.appendTo(lightbox)
						.hide()
						.one('load', function () {

							// Save original size after loading to determine real dimenaions after resizing
							origWidth = bigImage.width();
							origHeight = bigImage.height();

							setImageSizeAndFadeIn();
							displayCaption(dataCaption);
							isVisible = true;

						})
						.attr('src', url);

					lightbox.fadeIn(300);

					return false;

				});

			});

			// Change image
			// Lightbox is open already
			var changeImage = function (i) {

				var url = images.eq(i).attr('href'),
					dataCaption = images.eq(i).data('caption');

				// fade out curren image and caption
				bigImage.fadeOut(200);
				caption.fadeOut(200);

				// Wait for fade out to be finished
				setTimeout(function () {

					// Reset size by removing image
					bigImage.remove();

					// Recreate image again to determine new original size
					bigImage = $('<img alt="">')
						.appendTo(lightbox)
						.hide()
						.one('load', function () {

							// Save original size
							origWidth = bigImage.width();
							origHeight = bigImage.height();

							setImageSizeAndFadeIn();
							displayCaption(dataCaption);

						})
						.attr('src', url);

				}, 200);

			};
			
			// Resize
			$(window).resize(function () {
				if (isVisible) {
					setImageSizeAndFadeIn();
				}
			});

		}

	}

	$(document).ready(function () {
		$('.automad-lightbox-item').AutomadLightbox();
	});

}(jQuery);

