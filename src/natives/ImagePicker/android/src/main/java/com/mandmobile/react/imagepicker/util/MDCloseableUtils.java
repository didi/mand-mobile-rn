package com.mandmobile.react.imagepicker.util;

import android.support.annotation.Nullable;

import java.io.Closeable;
import java.io.IOException;

/**
 * Created by youzicong on 2019/1/23
 */
public class MDCloseableUtils {
    private static final String TAG = "MDCloseableUtils";

    public static void close(@Nullable Closeable closeable) {
        if (closeable != null) {
            try {
                closeable.close();
            } catch (IOException e) {
               MDLogUtils.e(TAG, e);
            }
        }
    }
}
