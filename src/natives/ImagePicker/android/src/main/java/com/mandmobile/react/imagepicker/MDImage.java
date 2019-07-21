package com.mandmobile.react.imagepicker;

import com.facebook.react.bridge.WritableNativeMap;

/**
 * Created by youzicong on 2018/12/17
 */
public class MDImage extends WritableNativeMap {

    public void setWidth(int width) {
        putInt("width", width);
    }

    public void setHeight(int height) {
        putInt("height", height);
    }

    public void setURI(String uri) {
        putString("uri", "file://" + uri);
    }

    public void setBase64(String base64) {
        putString("base64", "data:image/jpeg;base64," + base64);
    }
}
