package com.mandmobile.react.refreshcontrol;

import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * 下拉刷新回调事件
 * Created by youzicong.
 */
public class MDRefreshEvent extends Event<MDRefreshEvent> {

    protected MDRefreshEvent(int viewTag) {
        super(viewTag);
    }

    @Override
    public String getEventName() {
        return "topRefresh";
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), null);
    }
}
