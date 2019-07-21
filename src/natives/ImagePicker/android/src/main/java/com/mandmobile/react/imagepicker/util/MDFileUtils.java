package com.mandmobile.react.imagepicker.util;

import android.content.Context;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.support.annotation.NonNull;
import android.text.TextUtils;

import com.mandmobile.react.imagepicker.MDImagePickerFileProvider;
import com.mandmobile.react.imagepicker.config.MDImageConstant;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * Created by youzicong.
 */
public class MDFileUtils {

    public static File createCameraFile(@NonNull Context context, @NonNull String outputCameraPath) {
        File rootDir = isExternalStorageMounted() ? Environment.getExternalStorageDirectory() : context.getCacheDir();
        File cameraDir = new File(rootDir.getAbsolutePath() + outputCameraPath);
        if (!cameraDir.exists()) {
            boolean succ = cameraDir.mkdirs();
        }
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.CHINA).format(new Date());
        String imageName = "IMG_" + timeStamp + MDImageConstant.IMAGE_SUFFIX;
        return new File(cameraDir, imageName);
    }

    private static boolean isExternalStorageMounted() {
        return TextUtils.equals(Environment.getExternalStorageState(), Environment.MEDIA_MOUNTED);
    }

    /**
     * Get Cache Dir
     */
    public static String getDiskCacheDir(@NonNull Context context) {
        String cachePath;
        if (isExternalStorageMounted() || !Environment.isExternalStorageRemovable()) {
            if (context.getExternalCacheDir() == null) {
                cachePath = context.getCacheDir().getPath();
            } else {
                cachePath = context.getExternalCacheDir().getPath();
            }
        } else {
            cachePath = context.getCacheDir().getPath();
        }
        return cachePath;
    }

    /**
     * create uri from file
     */
    public static Uri getUriFromFile(Context context, File file) {
        Uri imageUri;
        String authority = context.getPackageName() + ".provider";
        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.M) {
            //通过FileProvider创建一个content类型的Uri
            imageUri = MDImagePickerFileProvider.getUriForFile(context, authority, file);
        } else {
            imageUri = Uri.fromFile(file);
        }
        return imageUri;
    }
}
