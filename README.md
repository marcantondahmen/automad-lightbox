# Automad Lightbox

The Lightbox extensions is a custom string function for [Automad](https://automad.org) that easily let's you create lightbox slideshows out of inline images. It can be used with any text variable including markdown image links. 

## Assets

The lightbox extension requires jQuery to be loaded along with the included assets within your template's `<head>` section.

    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
    <script src="/packages/automad/lightbox/dist/lightbox.min.js"></script>
    <link rel="stylesheet" href="/packages/automad/lightbox/dist/lightbox.min.css">

## Template

Somewhere in the body of your template the extension can be used with any variable as follows:

    @{ text | Automad/Lightbox | markdown }

## Using Inline Images in Content

The Lightbox string function will pick up any markdown image within your content and turn it into a link to open the lightbox modal window. While the enlarged image in the lightbox modal will always have its original dimensions, it is possible to resize the image embedded within the text as follows:

    ![](image?400x300)

The image tag above will create an image link with a small thumbnail of 400x300 pixel to open the enlarged version of that image with its original dimensions in the modal window.

## Captions

Captions stored along with images will be displayed automatically at the bottom of the lightbox modal window.