package com.mandmobile.react.imagepicker.util;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.drawable.Drawable;
import android.support.annotation.AttrRes;
import android.support.annotation.NonNull;
import android.util.TypedValue;

/**
 * Created by youzicong.
 */
public class MDAttrsUtils {
    /**
     * From attrs get color
     */
    public static int getTypeValueColor(@NonNull Context context, @AttrRes int attr) {
        TypedValue typedValue = new TypedValue();
        int[] attribute = new int[]{attr};
        TypedArray array = context.obtainStyledAttributes(typedValue.resourceId, attribute);
        int color = array.getColor(0, -1);
        array.recycle();
        return color;
    }

    /**
     * From attrs get boolean
     */
    public static boolean getTypeValueBoolean(@NonNull Context context, @AttrRes int attr) {
        TypedValue typedValue = new TypedValue();
        int[] attribute = new int[]{attr};
        TypedArray array = context.obtainStyledAttributes(typedValue.resourceId, attribute);
        boolean statusFont = array.getBoolean(0, false);
        array.recycle();
        return statusFont;
    }

    /**
     * From attrs get drawable
     */
    public static Drawable getTypeValueDrawable(@NonNull Context context, @AttrRes int attr) {
        TypedValue typedValue = new TypedValue();
        int[] attribute = new int[]{attr};
        TypedArray array = context.obtainStyledAttributes(typedValue.resourceId, attribute);
        Drawable drawable = array.getDrawable(0);
        array.recycle();
        return drawable;
    }

    /**
     * From attrs get string
     */
    public static String getTypeValueString(@NonNull Context context, @AttrRes int attr) {
        TypedValue typedValue = new TypedValue();
        int[] attribute = new int[]{attr};
        TypedArray array = context.obtainStyledAttributes(typedValue.resourceId, attribute);
        String string = array.getString(0);
        array.recycle();
        return string;
    }
}
