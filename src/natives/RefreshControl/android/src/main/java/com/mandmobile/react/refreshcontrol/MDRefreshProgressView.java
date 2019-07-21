package com.mandmobile.react.refreshcontrol;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.ValueAnimator;
import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.RectF;
import android.support.annotation.ColorInt;
import android.support.annotation.FloatRange;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.View;
import android.view.animation.LinearInterpolator;

/**
 * 下拉刷新头部的自定义Progress
 * Created by youzicong on 2019/2/22
 */
public class MDRefreshProgressView extends View {
    private static final int DEGREE_360 = 360;
    private static final int NUM_POINTS = 5;
    private static final long ANIMATOR_DURATION = 1333;

    private static final float MAX_SWIPE_DEGREES = 0.8f * DEGREE_360;
    private static final float FULL_GROUP_ROTATION = 3.0f * DEGREE_360;

    private static final float TRIM_DURATION_OFFSET = 0.5f;

    private float startDegree = 0;
    private float endDegree = 0;
    private float originEndDegrees;
    private float originStartDegrees;
    private float swipeDegrees;
    private float rotationCount;
    private float groupRotation;
    private ValueAnimator degreeAnimator;

    private Paint backgroundPaint;
    private Paint foregroundPaint;
    private RectF rectF;

    public MDRefreshProgressView(Context context) {
        this(context, null);
    }

    public MDRefreshProgressView(Context context, @Nullable AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public MDRefreshProgressView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        initView(attrs, defStyleAttr);
    }

    private void initView(@Nullable AttributeSet attrs, int defStyleAttr) {
        TypedArray ta = getContext().obtainStyledAttributes(attrs, R.styleable.MDRefreshProgressView, defStyleAttr, defStyleAttr);
        int backgroundRingColor = ta.getColor(R.styleable.MDRefreshProgressView_background_ring_color, getResources().getColor(R.color.md_default_background_ring_color));
        int foregroundRingColor = ta.getColor(R.styleable.MDRefreshProgressView_foreground_ring_color, getResources().getColor(R.color.md_default_foreground_ring_color));
        ta.recycle();

        backgroundPaint = new Paint();
        backgroundPaint.setAntiAlias(true);
        backgroundPaint.setColor(backgroundRingColor);
        backgroundPaint.setStyle(Paint.Style.STROKE);

        foregroundPaint = new Paint();
        foregroundPaint.setAntiAlias(true);
        foregroundPaint.setColor(foregroundRingColor);
        foregroundPaint.setStyle(Paint.Style.STROKE);

        rectF = new RectF();

        degreeAnimator = ValueAnimator.ofFloat(0.0f, 1.0f);
        degreeAnimator.setRepeatCount(ValueAnimator.INFINITE);
        degreeAnimator.setRepeatMode(ValueAnimator.RESTART);
        degreeAnimator.setDuration(ANIMATOR_DURATION);
        degreeAnimator.setInterpolator(new LinearInterpolator());
        degreeAnimator.addListener(new AnimatorListenerAdapter() {

            @Override
            public void onAnimationRepeat(Animator animation) {
                originStartDegrees = endDegree;
                originEndDegrees = endDegree;

                startDegree = endDegree;

                rotationCount = (rotationCount + 1) % (NUM_POINTS);
            }

            @Override
            public void onAnimationEnd(Animator animation) {
                rotationCount = 0;
            }
        });
        degreeAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            @Override
            public void onAnimationUpdate(ValueAnimator animation) {
                float renderProgress = (float) animation.getAnimatedValue();

                if (renderProgress <= TRIM_DURATION_OFFSET) {
                    float startTrimProgress = renderProgress / TRIM_DURATION_OFFSET;
                    startDegree = originStartDegrees + MAX_SWIPE_DEGREES * startTrimProgress;
                }

                if (renderProgress > TRIM_DURATION_OFFSET) {
                    float endTrimProgress = (renderProgress - TRIM_DURATION_OFFSET) / TRIM_DURATION_OFFSET;
                    endDegree = originEndDegrees + MAX_SWIPE_DEGREES * endTrimProgress;
                }

                if (Math.abs(endDegree - startDegree) > 0) {
                    swipeDegrees = endDegree - startDegree;
                }

                groupRotation = ((FULL_GROUP_ROTATION / NUM_POINTS) * renderProgress) + (FULL_GROUP_ROTATION * (rotationCount / NUM_POINTS));
                invalidate();
            }
        });
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        int specMode = MeasureSpec.getMode(widthMeasureSpec);
        int specSize = MeasureSpec.getSize(widthMeasureSpec);
        int specHeight = MeasureSpec.makeMeasureSpec(specSize, specMode);
        super.onMeasure(widthMeasureSpec, specHeight);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        int width = getMeasuredWidth();
        int center = width / 2;
        int strokeWidth = width / 10;
        int radius = width / 2 - strokeWidth;
        // draw background ring
        backgroundPaint.setStrokeWidth(strokeWidth);
        canvas.drawCircle(center, center, radius, backgroundPaint);


        // draw foreground ring
        int left = strokeWidth;
        int top = strokeWidth;
        int right = width - left;
        int bottom = width - top;
        rectF.set(left, top, right, bottom);
        foregroundPaint.setStrokeWidth(strokeWidth);

        int saveCount = canvas.save();
        canvas.rotate(groupRotation, rectF.centerX(), rectF.centerY());
        canvas.drawArc(rectF, startDegree, swipeDegrees, false, foregroundPaint);
        canvas.restoreToCount(saveCount);
    }

    public void setDegreeRatio(@FloatRange(from = 0, to = 1) float ratio) {
        resetDegree();
        this.swipeDegrees = (int) (DEGREE_360 * ratio);
        invalidate();
    }

    public void startLoading() {
        resetDegree();
        degreeAnimator.start();
    }

    public void endLoading() {
        degreeAnimator.end();
    }

    public void setBackgroundRingColor(@ColorInt int color) {
        backgroundPaint.setColor(color);
        invalidate();
    }

    public void setForegroundRingColor(@ColorInt int color) {
        foregroundPaint.setColor(color);
        invalidate();
    }

    private void resetDegree() {
        startDegree = 0;
        endDegree = 0;
        originEndDegrees = 0;
        originStartDegrees = 0;
        swipeDegrees = 0;
        rotationCount = 0;
        groupRotation = 0;
    }

}
