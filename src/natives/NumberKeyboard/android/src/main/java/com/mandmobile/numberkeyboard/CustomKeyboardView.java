package com.mandmobile.numberkeyboard;

import android.annotation.TargetApi;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.Typeface;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.StateListDrawable;
import android.inputmethodservice.Keyboard;
import android.inputmethodservice.KeyboardView;
import android.os.Build;
import android.util.AttributeSet;

import com.mandmobile.LogUtil;
import com.mandmobile.R;

import java.lang.reflect.Field;
import java.util.List;

/**
 * @author liuwei
 * @date 2018/12/5 15:29
 */
public class CustomKeyboardView extends KeyboardView {
    private Paint mPaint;
    private int mKeyTextSize;
    private int mLabelTextSize;

    public CustomKeyboardView(Context context, AttributeSet attrs) {
        super(context, attrs);
        resetPaint(context, attrs, 0, 0);
    }

    public CustomKeyboardView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        resetPaint(context, attrs, defStyleAttr, 0);
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public CustomKeyboardView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        resetPaint(context, attrs, defStyleAttr, defStyleRes);
    }

    /**
     * 修改paint，目的是为了自定义字体
     */
    private void resetPaint(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        mLabelTextSize = getResources().getDimensionPixelSize(R.dimen.mand_mobile_rn_keyboard_label_text_size);
        mKeyTextSize = getResources().getDimensionPixelSize(R.dimen.mand_mobile_rn_keyboard_key_text_size);
        mPaint = new CustomPaint(getContext());
        mPaint.setTextSize(mKeyTextSize);
        mPaint.setTextAlign(Paint.Align.CENTER);
        mPaint.setAntiAlias(true);
        mPaint.setTextAlign(Paint.Align.CENTER);
        mPaint.setAlpha(255);
    }

    @Override
    public void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        canvas.save();
        List<Keyboard.Key> keys = getKeyboard().getKeys();
        if (keys == null || keys.isEmpty()) {
            return;
        }
        for (Keyboard.Key key : keys) {
            if (key.codes != null && key.codes.length > 0) {
                //确定键改成自定义背景，这里用的enter键的code
                if (key.codes[0] == KeyboardUtil.KEYCODE_OK) {
                    StateListDrawable keyBgDrawable;
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                        keyBgDrawable = (StateListDrawable) getContext().getResources().getDrawable(R.drawable.mand_mobile_rn_keyboard_confirm_btn_bg_selector, null);
                    } else {
                        keyBgDrawable = (StateListDrawable) getContext().getResources().getDrawable(R.drawable.mand_mobile_rn_keyboard_confirm_btn_bg_selector);
                    }
                    int[] drawableState = key.getCurrentDrawableState();
                    keyBgDrawable.setState(drawableState);

                    final Rect bounds = keyBgDrawable.getBounds();
                    if (key.width != bounds.right ||
                            key.height != bounds.bottom) {
                        keyBgDrawable.setBounds(key.x, key.y, key.x + key.width, key.y + key.height);
                    }
                    keyBgDrawable.draw(canvas);
                    final Paint paint = mPaint;
                    if (paint != null) {
                        if (key.label.length() > 1 && key.codes.length < 2) {
                            paint.setTextSize(mLabelTextSize);
                            paint.setTypeface(Typeface.DEFAULT_BOLD);
                        } else {
                            paint.setTextSize(mKeyTextSize);
                            paint.setTypeface(Typeface.DEFAULT_BOLD);
                        }
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                            paint.setColor(getContext().getResources().getColor(android.R.color.white, null));
                        } else {
                            paint.setColor(getContext().getResources().getColor(android.R.color.white));
                        }
                        Rect rect = new Rect(key.x, key.y, key.x + key.width, key.y + key.height);
                        Paint.FontMetricsInt fontMetrics = paint.getFontMetricsInt();
                        int baseline = (rect.bottom + rect.top - fontMetrics.bottom - fontMetrics.top) / 2;

                        canvas.drawText(key.label.toString(), rect.centerX(), baseline, paint);
                        canvas.restore();
                    }
                    //空键，无内容，占位用
                } else if (key.codes[0] == -1000) {
                    Drawable keyBgDrawable;
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                        keyBgDrawable = (Drawable) getContext().getResources().getDrawable(R.drawable.key_bg_press, null);
                    } else {
                        keyBgDrawable = (Drawable) getContext().getResources().getDrawable(R.drawable.key_bg_press);
                    }
                    final Rect bounds = keyBgDrawable.getBounds();
                    if (key.width != bounds.right ||
                            key.height != bounds.bottom) {
                        keyBgDrawable.setBounds(key.x, key.y, key.x + key.width, key.y + key.height);
                    }
                    keyBgDrawable.draw(canvas);
                }
            }

        }
    }

    private Object getField(String fieldName) {
        try {
            Field field = KeyboardView.class.getDeclaredField(fieldName);
            field.setAccessible(true);
            return field.get(this);
        } catch (NoSuchFieldException e) {
            LogUtil.error(e);
        } catch (IllegalAccessException e) {
            LogUtil.error(e);
        }
        return null;
    }
}

