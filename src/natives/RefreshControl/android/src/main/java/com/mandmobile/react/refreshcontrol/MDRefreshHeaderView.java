package com.mandmobile.react.refreshcontrol;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.res.TypedArray;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.annotation.Size;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.util.Log;
import android.util.TypedValue;
import android.view.Choreographer;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.scwang.smartrefresh.layout.api.RefreshHeader;
import com.scwang.smartrefresh.layout.api.RefreshKernel;
import com.scwang.smartrefresh.layout.api.RefreshLayout;
import com.scwang.smartrefresh.layout.constant.RefreshState;
import com.scwang.smartrefresh.layout.constant.SpinnerStyle;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * 下拉刷新头部
 * Created by youzicong on 2019/2/20
 */
public class MDRefreshHeaderView extends FrameLayout implements RefreshHeader {
    private static final String TAG = "MDRefreshHeaderView";

    private TextView tvStatus;
    private TextView tvTime;
    private MDRefreshProgressView pbStatus;
    private String pullDownToRefreshText;
    private String releaseToRefreshText;
    private String refreshingText;
    private String refreshFinishText;
    private DateFormat lastUpdateFormat;

    public MDRefreshHeaderView(@NonNull Context context) {
        this(context, null);
    }

    public MDRefreshHeaderView(@NonNull Context context, @Nullable AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public MDRefreshHeaderView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        initView(attrs, defStyleAttr);
    }

    private void initView(@Nullable AttributeSet attrs, int defStyleAttr) {
        TypedArray ta = getContext().obtainStyledAttributes(attrs, R.styleable.MDRefreshHeaderView, defStyleAttr, defStyleAttr);
        int backgroundRingColor = ta.getColor(R.styleable.MDRefreshHeaderView_pr_background_ring_color, getResources().getColor(R.color.md_default_background_ring_color));
        int foregroundRingColor = ta.getColor(R.styleable.MDRefreshHeaderView_pr_foreground_ring_color, getResources().getColor(R.color.md_default_foreground_ring_color));
        int stateTextColor = ta.getColor(R.styleable.MDRefreshHeaderView_state_text_color, getResources().getColor(R.color.md_default_text));
        float stateTextSize = ta.getDimensionPixelSize(R.styleable.MDRefreshHeaderView_state_text_size, getResources().getDimensionPixelSize(R.dimen.md_default_header_text_size));
        int timeTextColor = ta.getColor(R.styleable.MDRefreshHeaderView_state_text_color, getResources().getColor(R.color.md_default_text));
        float timeTextSize = ta.getDimensionPixelSize(R.styleable.MDRefreshHeaderView_state_text_size, getResources().getDimensionPixelSize(R.dimen.md_default_header_time_size));
        int padding = ta.getDimensionPixelSize(R.styleable.MDRefreshHeaderView_header_padding, getResources().getDimensionPixelSize(R.dimen.md_default_header_padding));
        int backgroundColor = ta.getColor(R.styleable.MDRefreshHeaderView_header_background_color, Color.TRANSPARENT);
        pullDownToRefreshText = ta.getString(R.styleable.MDRefreshHeaderView_pull_down_to_refresh_text);
        releaseToRefreshText = ta.getString(R.styleable.MDRefreshHeaderView_release_to_refresh_text);
        refreshingText = ta.getString(R.styleable.MDRefreshHeaderView_refreshing_text);
        refreshFinishText = ta.getString(R.styleable.MDRefreshHeaderView_refresh_finish_text);
        boolean stateHidden = ta.getBoolean(R.styleable.MDRefreshHeaderView_hidden_state, false);
        boolean stateTime = ta.getBoolean(R.styleable.MDRefreshHeaderView_hidden_time, false);
        String lastUpdatePattern = ta.getString(R.styleable.MDRefreshHeaderView_last_update_pattern);
        ta.recycle();

        if (TextUtils.isEmpty(pullDownToRefreshText)) {
            pullDownToRefreshText = getResources().getString(R.string.md_default_pull_down_to_refresh);
        }
        if (TextUtils.isEmpty(releaseToRefreshText)) {
            releaseToRefreshText = getResources().getString(R.string.md_default_release_to_refresh);
        }
        if (TextUtils.isEmpty(refreshingText)) {
            refreshingText = getResources().getString(R.string.md_default_refreshing);
        }
        if (TextUtils.isEmpty(refreshFinishText)) {
            refreshFinishText = getResources().getString(R.string.md_default_refresh_finish);
        }
        if (TextUtils.isEmpty(lastUpdatePattern)) {
            lastUpdatePattern = getResources().getString(R.string.md_default_last_update_time);
        }

        LayoutInflater.from(getContext()).inflate(R.layout.md_view_refresh_header, this, true);
        tvStatus = findViewById(R.id.md_tv_status);
        tvStatus.setVisibility(stateHidden ? GONE : VISIBLE);
        tvStatus.setTextColor(stateTextColor);
        tvStatus.setTextSize(TypedValue.COMPLEX_UNIT_PX, stateTextSize);

        tvTime = findViewById(R.id.md_tv_time);
        tvTime.setVisibility(stateTime ? GONE : VISIBLE);
        tvTime.setTextColor(timeTextColor);
        tvTime.setTextSize(TypedValue.COMPLEX_UNIT_PX, timeTextSize);

        lastUpdateFormat = new SimpleDateFormat(lastUpdatePattern, Locale.getDefault());
        setLastUpdateTime(null);

        pbStatus = findViewById(R.id.md_pb_status);
        pbStatus.setForegroundRingColor(foregroundRingColor);
        pbStatus.setBackgroundRingColor(backgroundRingColor);

        FrameLayout.LayoutParams layoutParams = new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        setLayoutParams(layoutParams);
        setPadding(0, padding, 0, padding);

        setBackgroundColor(backgroundColor);
        //
        Choreographer.getInstance().postFrameCallback(new Choreographer.FrameCallback() {
            @Override
            public void doFrame(long frameTimeNanos) {
                manuallyLayoutChildren();
                getViewTreeObserver().dispatchOnGlobalLayout();
                Choreographer.getInstance().postFrameCallback(this);
            }
        });
    }

    void manuallyLayoutChildren() {
        for (int i = 0; i < getChildCount(); i++) {
            View child = getChildAt(i);
            child.measure(MeasureSpec.makeMeasureSpec(getMeasuredWidth(), MeasureSpec.EXACTLY),
                    MeasureSpec.makeMeasureSpec(getMeasuredHeight(), MeasureSpec.EXACTLY));
            child.layout(0, 0, child.getMeasuredWidth(), child.getMeasuredHeight());
        }
    }

    @NonNull
    @Override
    public View getView() {
        return this;
    }

    @NonNull
    @Override
    public SpinnerStyle getSpinnerStyle() {
        return SpinnerStyle.Translate;
    }

    @Override
    public void setPrimaryColors(int... colors) {

    }

    @Override
    public void onInitialized(@NonNull RefreshKernel kernel, int height, int maxDragHeight) {

    }

    @Override
    public void onMoving(boolean isDragging, float percent, int offset, int height, int maxDragHeight) {
        // 漏出二分之一进行动画
        if (percent > 0.5) {
            pbStatus.setDegreeRatio((float) ((percent - 0.5) * 2));
        }
    }

    @Override
    public void onReleased(@NonNull RefreshLayout refreshLayout, int height, int maxDragHeight) {

    }

    @Override
    public void onStartAnimator(@NonNull RefreshLayout refreshLayout, int height, int maxDragHeight) {
        pbStatus.startLoading();
    }

    @Override
    public int onFinish(@NonNull RefreshLayout refreshLayout, boolean success) {
        if (success) {
            setLastUpdateTime(new Date());
        }
        pbStatus.endLoading();
        return 0;
    }

    @Override
    public void onHorizontalDrag(float percentX, int offsetX, int offsetMax) {

    }

    @Override
    public boolean isSupportHorizontalDrag() {
        return false;
    }

    @Override
    public void onStateChanged(@NonNull RefreshLayout refreshLayout, @NonNull RefreshState oldState, @NonNull RefreshState newState) {
        switch (newState) {
            case PullDownToRefresh:
                tvStatus.setText(pullDownToRefreshText);
                break;
            case Refreshing:
                tvStatus.setText(refreshingText);
                break;
            case ReleaseToRefresh:
                tvStatus.setText(releaseToRefreshText);
                break;
        }
    }

    private void setLastUpdateTime(Date time) {
        String text = time != null ? lastUpdateFormat.format(time) : getResources().getString(R.string.md_default_no_update_time);
        tvTime.setText(text);
    }

    public void setStateTextColor(@Size(min = 1) String stateTextColor) {
        try {
            tvStatus.setTextColor(Color.parseColor(stateTextColor));
        } catch (IllegalArgumentException e) {
            Log.e(TAG, "", e);
        }
    }

    public void setTimeTextColor(@Size(min = 1) String timeTextColor) {
        try {
            tvTime.setTextColor(Color.parseColor(timeTextColor));
        } catch (IllegalArgumentException e) {
            Log.e(TAG, "", e);
        }
    }

    public void setIndicatorColor(@Size(min = 1) String indicatorColor) {
        try {
            pbStatus.setForegroundRingColor(Color.parseColor(indicatorColor));
        } catch (IllegalArgumentException e) {
            Log.e(TAG, "", e);
        }
    }

    public void setPullDownToRefreshText(String pullDownToRefreshText) {
        this.pullDownToRefreshText = pullDownToRefreshText;
    }

    public void setReleaseToRefreshText(String releaseToRefreshText) {
        this.releaseToRefreshText = releaseToRefreshText;
    }

    public void setRefreshingText(String refreshingText) {
        this.refreshingText = refreshingText;
    }

    public void setRefreshFinishText(String refreshFinishText) {
        this.refreshFinishText = refreshFinishText;
    }

    public void setStateHidden(boolean hidden) {
        tvStatus.setVisibility(hidden ? GONE : VISIBLE);
    }

    public void setTimeHidden(boolean hidden) {
        tvTime.setVisibility(hidden ? GONE : VISIBLE);
    }

    public void setStateFontSize(float stateFontSize) {
        tvStatus.setTextSize(stateFontSize);
    }

    public void setTimeFontSize(float timeFontSize) {
        tvTime.setTextSize(timeFontSize);
    }

}
