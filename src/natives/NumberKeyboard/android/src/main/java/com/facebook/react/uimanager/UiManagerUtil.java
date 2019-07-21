package com.facebook.react.uimanager;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.views.textinput.ReactEditText;

public class UiManagerUtil {
    public static ReactEditText findRnComponentByTag(ReactContext reactContext, int tag){
        UIViewOperationQueue uii = reactContext.getNativeModule(UIManagerModule.class).getUIImplementation().getUIViewOperationQueue();
        return (ReactEditText) uii.getNativeViewHierarchyManager().resolveView(tag);
    }
}
