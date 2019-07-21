package com.mandmobile.react.imagepicker.widget;

import android.content.Context;
import android.util.AttributeSet;
import android.widget.RelativeLayout;

/**
 * Created by youzicong.
 */

public class MDSquareRelativeLayout extends RelativeLayout {

    public MDSquareRelativeLayout(Context context) {
        super(context);
    }

    public MDSquareRelativeLayout(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public MDSquareRelativeLayout(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, widthMeasureSpec);
    }

}
