package com.mandmobile.react.imagepicker.config;

import android.support.annotation.IntDef;

import java.lang.annotation.Retention;

import static java.lang.annotation.RetentionPolicy.SOURCE;

/**
 * Created by youzicong.
 */
public final class MDImageConstant {
    public static final String EXTRA_RESULT_SELECTED_IMAGES = "extra_result_selected_images";
    public static final String EXTRA_CAMERA_PATH = "extra_camera_path";
    public static final String EXTRA_SELECTED_FOLDER_PATH = "extra_selected_folder_path";
    public static final String EXTRA_LIST = "extra_list";
    public static final String EXTRA_INDEX = "extra_index";
    public static final String EXTRA_SHOW_TITLE = "extra_show_title";
    public static final String EXTRA_SELECTED_LIST = "extra_selected_list";
    public static final String RESULT_EXTRA_FINISH = "result_extra_finish";

    public static final int REQUEST_CODE_PREVIEW = 110;
    public static final int REQUEST_CODE_CHOOSE = 220;
    public static final int REQUEST_CAMERA = 330;

    public static final int SINGLE = 1;
    public static final int MULTIPLE = 2;

    @Retention(SOURCE)
    @IntDef({SINGLE, MULTIPLE})
    public @interface SelectionMode {

    }

    public static final String IMAGE_SUFFIX = ".jpg";
}
