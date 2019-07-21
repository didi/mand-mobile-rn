package com.mandmobile.react.imagepicker.util;

import android.content.Context;
import android.widget.Toast;

/**
 * Created by youzicong.
 */
public final class MDToastUtils {

    public static void show(Context mContext, String s) {
        Toast.makeText(mContext.getApplicationContext(), s, Toast.LENGTH_LONG).show();
    }
}
