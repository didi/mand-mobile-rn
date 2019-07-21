package com.mandmobile.react.imagepicker.widget;

import android.content.Context;
import android.support.v4.view.ViewPager;
import android.util.AttributeSet;
import android.view.MotionEvent;

import com.mandmobile.react.imagepicker.util.MDLogUtils;


public class MDPreviewViewPager extends ViewPager {
    private static final String TAG = "MDPreviewViewPager";

    public MDPreviewViewPager(Context context) {
        super(context);
    }

    public MDPreviewViewPager(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    public boolean onTouchEvent(MotionEvent ev) {
        try {
            return super.onTouchEvent(ev);
        } catch (IllegalArgumentException e) {
            MDLogUtils.e(TAG, e);
        }
        return false;
    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent ev) {
        try {
            return super.onInterceptTouchEvent(ev);
        } catch (IllegalArgumentException e) {
            MDLogUtils.e(TAG, e);
        }
        return false;
    }
}
