package com.mandmobile.react.imagepicker.util;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Matrix;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.media.ExifInterface;
import android.util.Base64;

import com.mandmobile.react.imagepicker.entity.MDLocalImage;
import com.mandmobile.react.imagepicker.entity.MDLocalImageFolder;

import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

/**
 * Created by youzicong on 2018/12/17
 */
public class MDImageUtils {
    private static final String TAG = "MDImageUtils";

    @Nullable
    public static String encodeBase64(@NonNull String path) {
        try {
            Bitmap bitmap = BitmapFactory.decodeFile(path);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            bitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos);
            byte[] bytes = baos.toByteArray();
            byte[] encode = Base64.encode(bytes, Base64.DEFAULT);
            return new String(encode);
        } catch (OutOfMemoryError e) {
            MDLogUtils.e(TAG, e);
        }
        return null;
    }

    public static boolean isSelected(@NonNull List<MDLocalImage> selectedList, @NonNull MDLocalImage image) {
        for (MDLocalImage media : selectedList) {
            if (media.getPath().equals(image.getPath())) {
                return true;
            }
        }
        return false;
    }

    /**
     * 获取 path 路径所在的 {@link MDLocalImageFolder}
     */
    public static MDLocalImageFolder getImageFolder(String path, List<MDLocalImageFolder> imageFolders) {
        File imageFile = new File(path);
        File folderFile = imageFile.getParentFile();

        for (MDLocalImageFolder folder : imageFolders) {
            if (folder.getName().equals(folderFile.getName())) {
                return folder;
            }
        }
        MDLocalImageFolder newFolder = new MDLocalImageFolder();
        newFolder.setName(folderFile.getName());
        newFolder.setPath(folderFile.getAbsolutePath());
        newFolder.setFirstImagePath(path);
        imageFolders.add(newFolder);
        return newFolder;
    }

    /**
     * 读取图片属性：旋转的角度
     *
     * @param path 图片绝对路径
     * @return degree旋转的角度
     */
    public static int getImageDegree(@NonNull String path) {
        int degree = 0;
        try {
            ExifInterface exifInterface = new ExifInterface(path);
            int orientation = exifInterface.getAttributeInt(ExifInterface.TAG_ORIENTATION, ExifInterface.ORIENTATION_NORMAL);
            switch (orientation) {
                case ExifInterface.ORIENTATION_ROTATE_90:
                    degree = 90;
                    break;
                case ExifInterface.ORIENTATION_ROTATE_180:
                    degree = 180;
                    break;
                case ExifInterface.ORIENTATION_ROTATE_270:
                    degree = 270;
                    break;
            }
        } catch (IOException e) {
            MDLogUtils.e(TAG, e);
        }
        return degree;
    }

    /**
     * 旋转图片
     */
    public static void rotateImage(int degree, @NonNull File file) {
        if (degree > 0) {
            try {
                BitmapFactory.Options opts = new BitmapFactory.Options();//获取缩略图显示到屏幕上
                opts.inSampleSize = 2;// TODO: 2019/1/22 采样率计算
                Bitmap bitmap = BitmapFactory.decodeFile(file.getAbsolutePath(), opts);
                Bitmap bmp = rotateBitmap(degree, bitmap);
                saveBitmapFile(bmp, file);
            } catch (Exception e) {
                MDLogUtils.e(TAG, e);
            }
        }
    }

    private static Bitmap rotateBitmap(int angle, Bitmap bitmap) {
        Matrix matrix = new Matrix();
        matrix.postRotate(angle);
        return Bitmap.createBitmap(bitmap, 0, 0, bitmap.getWidth(), bitmap.getHeight(), matrix, true);
    }

    private static void saveBitmapFile(Bitmap bitmap, File file) {
        BufferedOutputStream bos = null;
        try {
            bos = new BufferedOutputStream(new FileOutputStream(file));
            bitmap.compress(Bitmap.CompressFormat.JPEG, 100, bos);
            bos.flush();
        } catch (IOException e) {
            MDLogUtils.e(TAG, e);
        } finally {
            MDCloseableUtils.close(bos);
        }
    }

    @NonNull
    public static int[] getImageSize(@NonNull String path) {
        try {
            BitmapFactory.Options options = new BitmapFactory.Options();
            options.inJustDecodeBounds = true;
            BitmapFactory.decodeFile(path, options);
            return new int[]{options.outWidth, options.outHeight};
        } catch (Exception e) {
            MDLogUtils.e(TAG, e);
        }
        return new int[]{0, 0};
    }
}
