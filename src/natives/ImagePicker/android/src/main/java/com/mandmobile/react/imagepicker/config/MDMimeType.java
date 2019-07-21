package com.mandmobile.react.imagepicker.config;


import android.graphics.Bitmap;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.text.TextUtils;

import com.mandmobile.react.imagepicker.entity.MDLocalImage;
import com.mandmobile.react.imagepicker.util.MDLogUtils;

import java.io.File;

/**
 * Created by youzicong.
 */

public final class MDMimeType {
    private static final String TAG = "MDMimeType";

    /**
     * Is gif
     */
    public static boolean isGif(@NonNull String imageType) {
        switch (imageType) {
            case "image/gif":
            case "image/GIF":
                return true;
        }
        return false;
    }

    /**
     * Is gif
     */
    public static boolean isImageGif(@NonNull String path) {
        if (!TextUtils.isEmpty(path)) {
            int lastIndex = path.lastIndexOf(".");
            if (lastIndex != -1) {
                String mimeType = path.substring(lastIndex);
                return mimeType.startsWith(".gif") || mimeType.startsWith(".GIF");
            }
        }
        return false;
    }

    /**
     * Is http path
     */
    public static boolean isHttp(String path) {
        if (!TextUtils.isEmpty(path)) {
            return path.startsWith("http") || path.startsWith("https");
        }
        return false;
    }

    public static String createImageType(String path) {
        try {
            if (!TextUtils.isEmpty(path)) {
                File file = new File(path);
                String fileName = file.getName();
                int last = fileName.lastIndexOf(".") + 1;
                String temp = fileName.substring(last);
                return "image/" + temp;
            }
        } catch (Exception e) {
            MDLogUtils.e(TAG, e);
            return "image/jpeg";
        }
        return "image/jpeg";
    }

    /**
     * Is long image
     */
    public static boolean isLongImage(@Nullable MDLocalImage media) {
        if (null != media) {
            int width = media.getWidth();
            int height = media.getHeight();
            int h = width * 3;
            return height > h;
        }
        return false;
    }

    /**
     * Is long image
     */
    public static boolean isLongImage(@Nullable Bitmap bitmap) {
        if (null != bitmap) {
            return bitmap.getHeight() / bitmap.getWidth() > 3;
        }
        return false;
    }

    /**
     * 获取图片后缀
     */
    public static String getImageSuffix(@NonNull String path) {
        int index = path.lastIndexOf(".");
        if (index > -1) {
            String imageType = path.substring(index);
            switch (imageType) {
                case ".png":
                case ".PNG":
                case ".jpg":
                case ".jpeg":
                case ".JPEG":
                case ".WEBP":
                case ".bmp":
                case ".BMP":
                case ".webp":
                    return imageType;
                default:
                    return ".png";
            }
        } else {
            return ".png";
        }
    }
}
