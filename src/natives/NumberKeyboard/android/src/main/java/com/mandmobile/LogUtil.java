package com.mandmobile;

import android.util.Log;

public class LogUtil {
    private static final String LOG_TAG = "mand-mobile-rn";

    public static void debug(String tag, String message) {
        if (BuildConfig.DEBUG) {
            Log.d(tag, message);
        }
    }

    public static void debug(String message) {
        if (BuildConfig.DEBUG) {
            Log.d(LOG_TAG, message);
        }
    }

    public static void error(Throwable e) {
        if (BuildConfig.DEBUG) {
            Log.d(LOG_TAG, "", e);
        }
    }
}
