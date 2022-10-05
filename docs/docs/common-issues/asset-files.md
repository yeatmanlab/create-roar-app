# Advice for asset files

Adding asset files to ROAR experiments

---

ROAR experiments can often include a lot of asset files, such as images, audio, and video. But as we include more asset files, our website becomes larger and this can affect application performance. It is therefore important to choose file formats that minimize file size while preserving quality. We recommend the following file formats and conversion tools:

=== "Audio files"

    Use the MP3 file format. We recommend using [ffmpeg](https://ffmpeg.org/) to convert your files to MP3. For example, to convert the file `sample.wav` to `sample.mp3`, use

    ```sh
    ffmpeg -i sample.wav -codec:a libmp3lame -qscale:a 9 sample.mp3
    ``` 

    The `-codec:a libmp3lame` option tells ffmpeg to use the LAME audio encoder and the `-qscale:a 9` option tells ffmpeg to reduce the audio quality in order to reduce file size. In our experience, you can be very aggressive in reducing the audio quality. But if you test out your audio and you aren't happy with the quality, you can always reduce the number that goes after `-qscale:a`.

=== "Video files"

    Use the MP4 file format. We recommend either [ffmpeg](https://ffmpeg.org/) or [Handbrake](http://handbrake.fr/) for converting video files. [Here is a nice article](https://opensource.com/article/17/6/ffmpeg-convert-media-file-formats) on using ffmpeg to convert media files. The specific options that you will need to convert videos depends on the input video format. So we recommend searching the web for best practices in converting your file format. For example, [here is an article](https://ottverse.com/ffmpeg-convert-avi-to-mp4-lossless/) on converting AVI files to MP4. And [here is one](https://gist.github.com/dvlden/b9d923cb31775f92fa54eb8c39ccd5a9) with a collection of commands for converting MOV files to MP4.

=== "Image files"

    If your image files are of geometric shapes (e.g. logos, icons, etc.), then we recommend using a vector graphic file format such as SVG or PDF. If your image file is a photograph, we recommend using a raster file format like JPEG or PNG. Try to strike a balance between image resolution and file size to save space in your web app.
