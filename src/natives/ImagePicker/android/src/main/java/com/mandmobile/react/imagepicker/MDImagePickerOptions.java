package com.mandmobile.react.imagepicker;

import android.support.annotation.NonNull;

import com.facebook.react.bridge.ReadableMap;

/**
 * ImagePicker MDImagePickerOptions
 * Created by youzicong on 2018/12/17
 */
public class MDImagePickerOptions {
    /**
     * 相册每行图片数
     */
    private int imageSpanCount;
    /**
     * 相册最大选择图片数
     */
    private int imageCount;
    /**
     * 相册是否显示拍照按钮
     */
    private boolean showCamera;
    /**
     * 拍照或选择图片后是否裁剪
     */
    private boolean cropEnable;
    /**
     * 裁剪比例最大宽度
     */
    private int cropWidth;
    /**
     * 裁剪比例最大高度
     */
    private int cropHeight;
    /**
     * 相册是否显示 GIF 图片
     */
    private boolean showGif;
    /**
     * 裁剪图片质量
     */
    private int cropQuality;
    /**
     * 是否返回 Base64 编码
     */
    private boolean enableBase64;
    /**
     * 是否移除已选图片
     */
    private boolean removeSelected;

    private MDImagePickerOptions() {

    }

    private MDImagePickerOptions(ReadableMap options) {
        this.imageSpanCount = options.getInt("imageSpanCount");
        this.imageCount = options.getInt("imageCount");
        this.showGif = options.getBoolean("showGif");
        this.showCamera = options.getBoolean("showCamera");
        this.cropEnable = options.getBoolean("cropEnable");
        this.cropWidth = options.getInt("cropWidth");
        this.cropHeight = options.getInt("cropHeight");
        this.cropQuality = options.getInt("cropQuality");
        this.enableBase64 = options.getBoolean("enableBase64");
        this.removeSelected = options.getBoolean("removeSelected");
    }

    @NonNull
    public static MDImagePickerOptions parser(ReadableMap options) {
        return new MDImagePickerOptions(options);
    }

    public int getImageSpanCount() {
        return imageSpanCount;
    }

    public int getImageCount() {
        return imageCount;
    }

    public boolean isShowCamera() {
        return showCamera;
    }

    public boolean isCropEnable() {
        return cropEnable;
    }

    public int getCropWidth() {
        return cropWidth;
    }

    public int getCropHeight() {
        return cropHeight;
    }

    public boolean isShowGif() {
        return showGif;
    }

    public int getCropQuality() {
        return cropQuality;
    }

    public boolean isEnableBase64() {
        return enableBase64;
    }

    public boolean isRemoveSelected() {
        return removeSelected;
    }
}
