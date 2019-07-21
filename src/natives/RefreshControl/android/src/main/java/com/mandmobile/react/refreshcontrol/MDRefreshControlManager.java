package com.mandmobile.react.refreshcontrol;

import android.support.annotation.NonNull;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.scwang.smartrefresh.layout.SmartRefreshLayout;
import com.scwang.smartrefresh.layout.api.RefreshLayout;
import com.scwang.smartrefresh.layout.listener.OnRefreshListener;

import java.util.Map;

/**
 * Created by youzicong on 2018/12/20
 */
public class MDRefreshControlManager extends ViewGroupManager<SmartRefreshLayout> {

    private MDRefreshHeaderView header;

    @Override
    public String getName() {
        return "MDRefreshControl";
    }

    @Override
    protected SmartRefreshLayout createViewInstance(ThemedReactContext reactContext) {
        SmartRefreshLayout smartRefreshLayout = new SmartRefreshLayout(reactContext);
        header = new MDRefreshHeaderView(reactContext);
        smartRefreshLayout.setRefreshHeader(header);
        return smartRefreshLayout;
    }

    /**
     * 设置是否刷新
     */
    @ReactProp(name = "refreshing")
    public void setRefreshing(SmartRefreshLayout view, boolean refreshing) {
        if (refreshing) {
            view.autoRefresh();
        } else {
            view.finishRefresh();
        }
    }

    /**
     * 设置状态文案是否隐藏
     */
    @ReactProp(name = "stateHidden")
    public void setStateHidden(SmartRefreshLayout view, boolean stateHidden) {
        header.setStateHidden(stateHidden);
    }

    /**
     * 设置时间文案是否隐藏
     */
    @ReactProp(name = "timeHidden")
    public void setTimeHidden(SmartRefreshLayout view, boolean timeHidden) {
        header.setTimeHidden(timeHidden);
    }

    /**
     * 设置状态文案文字大小，单位sp
     */
    @ReactProp(name = "stateFontSize")
    public void setStateFontSize(SmartRefreshLayout view, float stateFontSize) {
        header.setStateFontSize(stateFontSize);
    }

    /**
     * 设置状态时间文字大小，单位sp
     */
    @ReactProp(name = "timeFontSize")
    public void setTimeFontSize(SmartRefreshLayout view, float timeFontSize) {
        header.setTimeFontSize(timeFontSize);
    }

    /**
     * 设置下拉刷新文案
     */
    @ReactProp(name = "refreshText")
    public void setPullingTitle(SmartRefreshLayout view, String pullingTitle) {
        header.setPullDownToRefreshText(pullingTitle);
    }

    /**
     * 设置释放刷新文案
     */
    @ReactProp(name = "releaseTitle")
    public void setReleaseTitle(SmartRefreshLayout view, String releaseTitle) {
        header.setReleaseToRefreshText(releaseTitle);
    }

    /**
     * 设置刷新中文案
     */
    @ReactProp(name = "refreshingTitle")
    public void setRefreshingTitle(SmartRefreshLayout view, String refreshingTitle) {
        header.setRefreshingText(refreshingTitle);
    }

    /**
     * 设置状态文案颜色，支持：#RRGGBB #AARRGGBB
     */
    @ReactProp(name = "stateTextColor")
    public void setStateTextColor(SmartRefreshLayout view, String stateTextColor) {
        header.setStateTextColor(stateTextColor);
    }

    /**
     * 设置时间文案颜色，支持：#RRGGBB #AARRGGBB
     */
    @ReactProp(name = "timeTextColor")
    public void setTimeTextColor(SmartRefreshLayout view, String timeTextColor) {
        header.setTimeTextColor(timeTextColor);
    }

    /**
     * 设置圆环文案颜色，支持：#RRGGBB #AARRGGBB
     */
    @ReactProp(name = "indicatorColor")
    public void setIndicatorColor(SmartRefreshLayout view, String indicatorColor) {
        header.setIndicatorColor(indicatorColor);
    }


    @Override
    protected void addEventEmitters(
            final ThemedReactContext reactContext,
            final SmartRefreshLayout view) {
        view.setOnRefreshListener(new OnRefreshListener() {
            @Override
            public void onRefresh(@NonNull RefreshLayout refreshLayout) {
                reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher()
                        .dispatchEvent(new MDRefreshEvent(view.getId()));
            }
        });
    }


    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        // 同RN源码
        return MapBuilder.<String, Object>builder()
                .put("topRefresh", MapBuilder.of("registrationName", "onRefresh"))
                .build();
    }
}
