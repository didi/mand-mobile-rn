package com.mandmobile.react.imagepicker;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;

import com.mandmobile.react.imagepicker.config.MDImageConstant;
import com.mandmobile.react.imagepicker.entity.MDLocalImage;

import java.util.List;

/**
 * Created by youzicong on 2019/1/23
 */
public class MDImagePickerCreator {

    @NonNull
    public static MDImagePickerGalleryCreator openGallery() {
        return new MDImagePickerGalleryCreator();
    }

    @NonNull
    public static MDImagePickerCameraCreator openCamera() {
        return new MDImagePickerCameraCreator();
    }

    @NonNull
    public static MDImagePreviewCreator openPreview() {
        return new MDImagePreviewCreator();
    }

    /**
     * @return Selector Multiple MDLocalImage
     */
    @Nullable
    public static List<MDLocalImage> obtainResult(@NonNull Intent data) {
        return data.getParcelableArrayListExtra(MDImageConstant.EXTRA_RESULT_SELECTED_IMAGES);
    }

}
