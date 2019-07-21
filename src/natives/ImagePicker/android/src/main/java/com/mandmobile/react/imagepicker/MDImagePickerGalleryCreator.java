package com.mandmobile.react.imagepicker;

import android.support.annotation.IntRange;

import com.mandmobile.react.imagepicker.config.MDImageConstant;
import com.mandmobile.react.imagepicker.entity.MDLocalImage;

import java.util.List;

/**
 * Created by youzicong on 2019/1/23
 */
public class MDImagePickerGalleryCreator extends MDImagePickerCameraCreator {
    MDImagePickerGalleryCreator() {
        super();
        config.setCameraOrGallery(false);
    }

    public MDImagePickerGalleryCreator selectMode(@MDImageConstant.SelectionMode int mode) {
        config.setSelectMode(mode);
        return this;
    }

    public MDImagePickerGalleryCreator selectMax(int max) {
        config.setSelectMax(max);
        return this;
    }

    public MDImagePickerGalleryCreator selectMin(int min) {
        config.setSelectMin(min);
        return this;
    }

    public MDImagePickerGalleryCreator spanCount(@IntRange(from = 3, to = 4) int span) {
        config.setSpanCount(span);
        return this;
    }

    public MDImagePickerGalleryCreator hasCamera(boolean has) {
        config.setHasCamera(has);
        return this;
    }

    public MDImagePickerGalleryCreator showGif(boolean show) {
        config.setShowGif(show);
        return this;
    }

    public MDImagePickerGalleryCreator selectedImages(List<MDLocalImage> imageList) {
        config.setSelectedImages(imageList);
        return this;
    }
}
