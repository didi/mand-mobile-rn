package com.mandmobile.react.imagepicker.util;

import android.support.annotation.NonNull;
import android.util.Log;

import com.mandmobile.react.imagepicker.BuildConfig;

/**
 * Created by youzicong on 2019/1/25
 */
public class MDLogUtils {

    public static void i(@NonNull String tag, @NonNull String msg) {
        if (BuildConfig.DEBUG) {
            Log.i(tag, msg);
        }
    }

    public static void e(@NonNull String tag, @NonNull Throwable e) {
        if (BuildConfig.DEBUG) {
            Log.e(tag, "", e);
        }
    }
}
