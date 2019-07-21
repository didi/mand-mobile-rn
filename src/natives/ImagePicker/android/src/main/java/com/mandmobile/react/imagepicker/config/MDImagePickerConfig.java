package com.mandmobile.react.imagepicker.config;

import android.support.annotation.StyleRes;

import com.mandmobile.react.imagepicker.R;
import com.mandmobile.react.imagepicker.entity.MDLocalImage;

import java.util.List;

/**
 * Created by youzicong.
 */

public final class MDImagePickerConfig {

    private boolean cameraOrGallery = false;
    @StyleRes
    private int themeStyleId = R.style.MDDefaultTheme;
    private boolean showGif = false;
    @MDImageConstant.SelectionMode
    private int selectMode = MDImageConstant.MULTIPLE;
    private int selectMax = 9;
    private int selectMin = 0;
    private int spanCount = 4;

    private boolean hasCamera = false;
    private String saveCameraPath = null;

    private boolean enableLuban = false;
    private String lubanTargetDir = null;
    private int lubanIgnoreSize = 100;

    private boolean enableUCrop = false;
    private int uCropWidth = 0;
    private int uCropHeight = 0;
    private int uCropCompressQuality = 90;
    private float uCropAspectRatioX = 0;
    private float uCropAspectRatioY = 0;

    private float glideThumbnailSize = 0.5f;

    private List<MDLocalImage> selectedImages = null;

    private MDImagePickerConfig() {
    }

    private static class SingletonHolder {
        private static final MDImagePickerConfig INSTANCE = new MDImagePickerConfig();
    }

    public static MDImagePickerConfig getInstance() {
        return SingletonHolder.INSTANCE;
    }

    public static MDImagePickerConfig getResetInstance() {
        MDImagePickerConfig instance = getInstance();
        instance.reset();
        return instance;
    }

    private void reset() {
        cameraOrGallery = false;
        themeStyleId = R.style.MDDefaultTheme;
        showGif = false;
        selectMode = MDImageConstant.MULTIPLE;
        selectMax = 9;
        selectMin = 0;
        spanCount = 4;
        hasCamera = false;
        saveCameraPath = null;
        enableLuban = false;
        lubanTargetDir = null;
        lubanIgnoreSize = 100;
        enableUCrop = false;
        uCropWidth = 0;
        uCropHeight = 0;
        uCropCompressQuality = 90;
        uCropAspectRatioX = 0;
        uCropAspectRatioY = 0;
        glideThumbnailSize = 0.5f;
        selectedImages = null;
    }

    public boolean isCameraOrGallery() {
        return cameraOrGallery;
    }

    public void setCameraOrGallery(boolean cameraOrGallery) {
        this.cameraOrGallery = cameraOrGallery;
    }

    @StyleRes
    public int getThemeStyleId() {
        return themeStyleId;
    }

    public void setThemeStyleId(@StyleRes int themeStyleId) {
        this.themeStyleId = themeStyleId;
    }

    public boolean isShowGif() {
        return showGif;
    }

    public void setShowGif(boolean showGif) {
        this.showGif = showGif;
    }

    @MDImageConstant.SelectionMode
    public int getSelectMode() {
        return selectMode;
    }

    public void setSelectMode(@MDImageConstant.SelectionMode int selectMode) {
        this.selectMode = selectMode;
    }

    public int getSelectMax() {
        return selectMax;
    }

    public void setSelectMax(int selectMax) {
        this.selectMax = selectMax;
    }

    public int getSelectMin() {
        return selectMin;
    }

    public void setSelectMin(int selectMin) {
        this.selectMin = selectMin;
    }

    public int getSpanCount() {
        return spanCount;
    }

    public void setSpanCount(int spanCount) {
        this.spanCount = spanCount;
    }

    public boolean isHasCamera() {
        return hasCamera;
    }

    public void setHasCamera(boolean hasCamera) {
        this.hasCamera = hasCamera;
    }

    public String getSaveCameraPath() {
        return saveCameraPath;
    }

    public void setSaveCameraPath(String saveCameraPath) {
        this.saveCameraPath = saveCameraPath;
    }

    public boolean isEnableLuban() {
        return enableLuban;
    }

    public void setEnableLuban(boolean enableLuban) {
        this.enableLuban = enableLuban;
    }

    public String getLubanTargetDir() {
        return lubanTargetDir;
    }

    public void setLubanTargetDir(String lubanTargetDir) {
        this.lubanTargetDir = lubanTargetDir;
    }

    public int getLubanIgnoreSize() {
        return lubanIgnoreSize;
    }

    public void setLubanIgnoreSize(int lubanIgnoreSize) {
        this.lubanIgnoreSize = lubanIgnoreSize;
    }

    public boolean isEnableUCrop() {
        return enableUCrop;
    }

    public void setEnableUCrop(boolean enableUCrop) {
        this.enableUCrop = enableUCrop;
    }

    public int getuCropWidth() {
        return uCropWidth;
    }

    public void setuCropWidth(int uCropWidth) {
        this.uCropWidth = uCropWidth;
    }

    public int getuCropHeight() {
        return uCropHeight;
    }

    public void setuCropHeight(int uCropHeight) {
        this.uCropHeight = uCropHeight;
    }

    public int getuCropCompressQuality() {
        return uCropCompressQuality;
    }

    public void setuCropCompressQuality(int uCropCompressQuality) {
        this.uCropCompressQuality = uCropCompressQuality;
    }

    public float getuCropAspectRatioX() {
        return uCropAspectRatioX;
    }

    public void setuCropAspectRatioX(float uCropAspectRatioX) {
        this.uCropAspectRatioX = uCropAspectRatioX;
    }

    public float getuCropAspectRatioY() {
        return uCropAspectRatioY;
    }

    public void setuCropAspectRatioY(float uCropAspectRatioY) {
        this.uCropAspectRatioY = uCropAspectRatioY;
    }

    public float getGlideThumbnailSize() {
        return glideThumbnailSize;
    }

    public void setGlideThumbnailSize(float glideThumbnailSize) {
        this.glideThumbnailSize = glideThumbnailSize;
    }

    public List<MDLocalImage> getSelectedImages() {
        return selectedImages;
    }

    public void setSelectedImages(List<MDLocalImage> selectedImages) {
        this.selectedImages = selectedImages;
    }
}
