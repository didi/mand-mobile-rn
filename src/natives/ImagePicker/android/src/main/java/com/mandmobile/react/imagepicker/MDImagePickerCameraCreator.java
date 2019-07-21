package com.mandmobile.react.imagepicker;

import android.app.Activity;
import android.support.annotation.FloatRange;
import android.support.annotation.StyleRes;
import android.support.v4.app.Fragment;

import com.mandmobile.react.imagepicker.activity.MDImagePickerActivity;
import com.mandmobile.react.imagepicker.config.MDImagePickerConfig;

/**
 * Created by youzicong on 2019/1/23
 */
public class MDImagePickerCameraCreator {
    protected MDImagePickerConfig config;

    MDImagePickerCameraCreator() {
        config = MDImagePickerConfig.getResetInstance();
        config.setCameraOrGallery(true);
    }

    public MDImagePickerCameraCreator theme(@StyleRes int themeStyleId) {
        config.setThemeStyleId(themeStyleId);
        return this;
    }

    public MDImagePickerCameraCreator saveCameraPath(String path) {
        config.setSaveCameraPath(path);
        return this;
    }

    public MDImagePickerCameraCreator enableLuban(boolean enable) {
        config.setEnableLuban(enable);
        return this;
    }

    public MDImagePickerCameraCreator lubanTargetDir(String dir) {
        config.setLubanTargetDir(dir);
        return this;
    }

    public MDImagePickerCameraCreator lubanIgnoreBy(int size) {
        config.setLubanIgnoreSize(size);
        return this;
    }

    public MDImagePickerCameraCreator enableUCrop(boolean enable) {
        config.setEnableUCrop(enable);
        return this;
    }

    public MDImagePickerCameraCreator uCropWidthAndHeight(int width, int height) {
        config.setuCropWidth(width);
        config.setuCropHeight(height);
        return this;
    }

    public MDImagePickerCameraCreator uCropCompressQuality(int quality) {
        config.setuCropCompressQuality(quality);
        return this;
    }

    public MDImagePickerCameraCreator uCropAspectRatio(float x, float y) {
        config.setuCropAspectRatioX(x);
        config.setuCropAspectRatioY(y);
        return this;
    }

    public MDImagePickerCameraCreator glideThumbnailSize(@FloatRange(from = 0, to = 1) float size) {
        config.setGlideThumbnailSize(size);
        return this;
    }

    public void forResult(Fragment fragment, int requestCode) {
        MDImagePickerActivity.openActivity(fragment, requestCode);
    }

    public void forResult(Activity activity, int requestCode) {
        MDImagePickerActivity.openActivity(activity, requestCode);
    }

}
