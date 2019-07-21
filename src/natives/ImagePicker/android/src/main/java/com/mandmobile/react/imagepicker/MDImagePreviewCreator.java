package com.mandmobile.react.imagepicker;

import android.app.Activity;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;

import com.mandmobile.react.imagepicker.activity.MDImageSimplePreviewActivity;
import com.mandmobile.react.imagepicker.config.MDImageConstant;
import com.mandmobile.react.imagepicker.config.MDImagePickerConfig;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by youzicong on 2019/1/23
 */
public class MDImagePreviewCreator {
    protected MDImagePickerConfig config;
    private Bundle bundle = new Bundle();

    MDImagePreviewCreator() {
        config = MDImagePickerConfig.getResetInstance();
    }

    public MDImagePreviewCreator list(@NonNull List<String> imageList) {
        bundle.putStringArrayList(MDImageConstant.EXTRA_LIST, new ArrayList<>(imageList));
        return this;
    }

    public MDImagePreviewCreator index(int index) {
        bundle.putInt(MDImageConstant.EXTRA_INDEX, index);
        return this;
    }

    public MDImagePreviewCreator showTitle(boolean show) {
        bundle.putBoolean(MDImageConstant.EXTRA_SHOW_TITLE, show);
        return this;
    }

    public void forResult(Activity activity, int requestCode) {
        MDImageSimplePreviewActivity.openActivity(activity, bundle, requestCode);
    }

    public void forResult(Fragment fragment, int requestCode) {
        MDImageSimplePreviewActivity.openActivity(fragment, bundle, requestCode);
    }

}
