
package com.mandmobile;

import android.util.Log;
import android.util.SparseArray;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.uimanager.UiManagerUtil;
import com.facebook.react.views.textinput.ReactEditText;
import com.mandmobile.numberkeyboard.KeyboardUtil;

public class MDNumberKeyboardModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext mReactContext;

    static final SparseArray<KeyboardUtil> S_REACT_EDIT_TO_KEYBOARD_UTIL = new SparseArray<>();

    MDNumberKeyboardModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return "MDNumberKeyboard";
    }

    /**
     * 注册输入框和对应的键盘类型
     */
    @ReactMethod
    public void setup(final int rootTag, final String keyboardType, final boolean shuffle, final String okText, final boolean hideDot, final String renderValues) {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                ReactEditText reactEditText = UiManagerUtil.findRnComponentByTag(mReactContext, rootTag);
                if (KeyboardType.fromCustomKeyboardType(keyboardType, hideDot) == null) {
                    Log.e("mand-mobile-rn", "keyboardType error,keyboardType=" + keyboardType);
                    return;
                }
                KeyboardConfig config = new KeyboardConfig.Builder(getCurrentActivity())
                        .rootTag(rootTag)
                        .editText(reactEditText)
                        .keyboardType(keyboardType)
                        .shuffle(shuffle)
                        .okText(okText)
                        .hideDot(hideDot)
                        .values(renderValues)
                        .build();
                LogUtil.debug("setup===config=" + config);
                KeyboardUtil mKeyboardUtil = new KeyboardUtil(config);
                S_REACT_EDIT_TO_KEYBOARD_UTIL.put(rootTag, mKeyboardUtil);
            }
        });
    }

    /**
     * 移除所有键盘
     */
    @ReactMethod
    public void remove() {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                int len = S_REACT_EDIT_TO_KEYBOARD_UTIL.size();
                KeyboardUtil keyboardUtil;
                for (int i = 0; i < len; i++) {
                    keyboardUtil = S_REACT_EDIT_TO_KEYBOARD_UTIL.get(i);
                    if (keyboardUtil != null) {
                        keyboardUtil.hideCustomSoftKeyboard();
                        keyboardUtil.release();
                    }
                }
                S_REACT_EDIT_TO_KEYBOARD_UTIL.clear();
            }
        });
    }

    /**
     * 显示键盘
     *
     * @param tag EditView的id
     */
    @ReactMethod
    public void show(final int tag) {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                KeyboardUtil keyboardUtil = S_REACT_EDIT_TO_KEYBOARD_UTIL.get(tag);
                if (keyboardUtil != null) {
                    keyboardUtil.showCustomSoftKeyboard();
                }
            }
        });
    }
}