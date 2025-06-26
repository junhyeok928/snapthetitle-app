package com.snapthetitle.backend.util;

import com.sksamuel.scrimage.ImmutableImage;
import com.sksamuel.scrimage.webp.WebpWriter;

import java.io.File;
import java.io.IOException;

public class ImageUtils {

    // ✅ 원본 이미지를 WebP로 변환하여 저장
    public static File convertToWebP(File inputFile, File saveTo) throws IOException {
        ImmutableImage image = ImmutableImage.loader().fromFile(inputFile);
        image.output(WebpWriter.DEFAULT, saveTo);
        return saveTo;
    }

    // ✅ 썸네일 WebP 생성 (지정된 너비 기준으로 리사이즈)
    public static File createWebPThumbnail(File inputFile, int width, File saveTo) throws IOException {
        ImmutableImage image = ImmutableImage.loader().fromFile(inputFile);
        ImmutableImage resized = image.scaleToWidth(width);
        resized.output(WebpWriter.DEFAULT, saveTo);
        return saveTo;
    }
}
