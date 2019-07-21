package com.mandmobile.numberkeyboard;

import android.content.Context;
import android.graphics.Paint;
import android.graphics.Typeface;

/**
 * @author liuwei
 * @date 2018/12/5 20:10
 */
public class CustomPaint extends Paint {
    private Context mContext;

    CustomPaint(Context context) {
        super();
        this.mContext = context;
    }

    @Override
    public Typeface setTypeface(Typeface typeface) {
        Typeface tf = Typeface.createFromAsset(mContext.getAssets(), "fonts/FD+_Number.otf");
        return super.setTypeface(tf);
    }
}
