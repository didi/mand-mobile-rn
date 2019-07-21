package com.mandmobile.numberkeyboard;

import android.app.Activity;
import android.content.Context;
import android.graphics.Rect;
import android.inputmethodservice.Keyboard;
import android.inputmethodservice.KeyboardView;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.text.Editable;
import android.text.TextUtils;
import android.text.method.HideReturnsTransformationMethod;
import android.util.Log;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.view.animation.AnimationUtils;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.FrameLayout;

import com.facebook.react.bridge.UiThreadUtil;
import com.mandmobile.KeyboardConfig;
import com.mandmobile.KeyboardType;
import com.mandmobile.LogUtil;
import com.mandmobile.R;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;

import static android.inputmethodservice.Keyboard.KEYCODE_DELETE;

/**
 * 键盘帮助类
 *
 * @author liuwei
 */
public class KeyboardUtil {
    static final int KEYCODE_OK = 66;
    private KeyboardConfig mKeyboardConfig;
    /**
     * 显示键盘的视图
     */
    private Activity mActivity;
    /**
     * 键盘视图
     */
    private KeyboardView mKeyboardView;
    /**
     * 键盘
     */
    private Keyboard mKeyboard;
    /**
     * 输入框
     */
    private EditText mEditText;
    /**
     * 键盘布局
     */
    private View mViewContainer;

    private InputMethodManager mInputMethodManager;

    private Handler safeHandler = new Handler(Looper.getMainLooper());

    /**
     * 隐藏系统键盘
     */
    private Runnable hideSystemKeyboardRun = new Runnable() {
        @Override
        public void run() {
            hideSystemKeyBoard();
        }
    };

    /**
     * 显示的runable
     */
    private Runnable showRun = new Runnable() {
        @Override
        public void run() {
            showCustomSoftKeyboard();
        }
    };
    /**
     * 隐藏的runable
     */
    private Runnable hideRun = new Runnable() {
        @Override
        public void run() {
            hideCustomSoftKeyboard();
        }
    };
    /**
     * 焦点改变监听
     */
    private View.OnFocusChangeListener mOnFocusChangeListener = new View.OnFocusChangeListener() {
        @Override
        public void onFocusChange(View view, boolean hasFocus) {
            if (hasFocus) {
                if (customKeyboardNotShowing()) {
                    showCustomSoftKeyboard();
                }
            } else {
                hideCustomSoftKeyboard();
            }
        }
    };

    /**
     * 构造方法
     *
     * @param keyboardConfig 键盘配置
     */
    public KeyboardUtil(KeyboardConfig keyboardConfig) {
        mKeyboardConfig = keyboardConfig;
        init();
    }

    private void init() {
        this.mActivity = mKeyboardConfig.getActivity();

        KeyboardType type = KeyboardType.fromCustomKeyboardType(mKeyboardConfig.getKeyboardType(), mKeyboardConfig.isHideDot());
        this.mKeyboard = new Keyboard(mActivity, type.getXmlResId());
        this.mEditText = mKeyboardConfig.getEditText();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            this.mEditText.setShowSoftInputOnFocus(false);
        }
        mActivity.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN);

        this.mEditText.setOnFocusChangeListener(mOnFocusChangeListener);
        this.mEditText.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if (v instanceof EditText) {
//                    hideSystemKeyBoard();
                    safeHandler.postDelayed(hideSystemKeyboardRun, 50);
                    if (event.getAction() == MotionEvent.ACTION_UP) {
                        if (customKeyboardNotShowing()) {
                            showCustomSoftKeyboard();
                        }
                    }
                }
                return false;
            }
        });
        preInitSoftKeyboard();
    }


    public void release() {
        if (this.mActivity != null) {
            this.mActivity = null;
        }
    }

    //隐藏系统键盘关键代码
    private void hideSystemKeyBoard() {
        InputMethodManager imm = (InputMethodManager) this.mActivity.getSystemService(Context.INPUT_METHOD_SERVICE);
        if (imm == null)
            return;
        boolean isOpen = imm.isActive();
        if (isOpen) {
            imm.hideSoftInputFromWindow(mEditText.getWindowToken(), 0);
        }

        int currentVersion = Build.VERSION.SDK_INT;
        String methodName = null;
        if (currentVersion >= 16) {
            methodName = "setShowSoftInputOnFocus";
        } else if (currentVersion >= 14) {
            methodName = "setSoftInputShownOnFocus";
        }

        if (methodName == null) {
            mEditText.setInputType(0);
        } else {
            try {
                Method setShowSoftInputOnFocus = EditText.class.getMethod(methodName, Boolean.TYPE);
                setShowSoftInputOnFocus.setAccessible(true);
                setShowSoftInputOnFocus.invoke(mEditText, Boolean.FALSE);
            } catch (NoSuchMethodException e) {
                mEditText.setInputType(0);
                e.printStackTrace();
            } catch (IllegalAccessException | InvocationTargetException | IllegalArgumentException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 隐藏系统键盘
     */
    private void hiddenSystemSoftInput() {
        LogUtil.debug("keyboard hiddenSystemSoftInput.....");
        if (mInputMethodManager == null) {
            mInputMethodManager = ((InputMethodManager) mActivity.getSystemService(Activity.INPUT_METHOD_SERVICE));
        }
        mInputMethodManager.hideSoftInputFromWindow(mEditText.getWindowToken(), 0);
    }

    private boolean isSystemSoftKeyboardShowing() {
        if (mActivity != null) {
            //获取当前屏幕内容的高度
            int screenHeight = mActivity.getWindow().getDecorView().getHeight();
            //获取View可见区域的bottom
            Rect rect = new Rect();
            mActivity.getWindow().getDecorView().getWindowVisibleDisplayFrame(rect);
            return screenHeight - rect.bottom != 0;
        }
        return false;
    }

    private void preInitSoftKeyboard() {
        if (null == mViewContainer) {
            mViewContainer = mActivity.getLayoutInflater().inflate(R.layout.keyboard_layout, null);
        } else {
            if (null != mViewContainer.getParent()) {
                return;
            }
        }
        mViewContainer.clearAnimation();
        setKeyboardKeyLabel();

        this.mKeyboardView = mViewContainer.findViewById(R.id.keyboard_view);
        this.mKeyboardView.setEnabled(true);
        this.mKeyboardView.setPreviewEnabled(false);
        this.mKeyboardView.setOnKeyboardActionListener(mOnKeyboardActionListener);
        this.mKeyboardView.setKeyboard(mKeyboard);
    }

    /**
     * 显示软键盘
     */
    public void showCustomSoftKeyboard() {
        preInitSoftKeyboard();

        if (mKeyboardConfig.isShuffle()) {
            setKeyboardKeyLabel();
        }

        if (isSystemSoftKeyboardShowing()) {
            hideSystemKeyBoard();
        }
        FrameLayout.LayoutParams layoutParams = new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.WRAP_CONTENT);
        layoutParams.gravity = Gravity.BOTTOM;
        FrameLayout frameLayout = (FrameLayout) mActivity.getWindow().getDecorView();
        frameLayout.addView(mViewContainer, layoutParams);
        mViewContainer.setAnimation(AnimationUtils.loadAnimation(mActivity, R.anim.down_to_up));
        if (mViewContainer.getVisibility() == View.GONE) {
            mViewContainer.setVisibility(View.VISIBLE);
        }
    }

    //设置键盘内容
    private void setKeyboardKeyLabel() {
        List<Keyboard.Key> keyList = mKeyboard.getKeys();
        List<String> keyboardLabel = mKeyboardConfig.getValuesArray();

        //从RN setup时传入，格式为由11个数字、字母、汉字等任意字符组成，以,分割。
        if (keyboardLabel.size() == 11) {
            for (Keyboard.Key key : keyList) {
                int[] codes = key.codes;
                if (codes != null && codes.length > 0) {
                    if (codes[0] >= 0 && codes[0] <= 10) {
                        String keyText = keyboardLabel.get(codes[0]);
                        key.label = keyText;
                        key.text = keyText;

                        //确定/enter/ok键
                    } else if (codes[0] == KeyboardUtil.KEYCODE_OK) {
                        key.label = mKeyboardConfig.getOkText();
                        key.text = null; // 设置text=null,会回调 mOnKeyboardActionListener.onKey
                    }
                    //.按键
                    if (!TextUtils.isEmpty(mKeyboardConfig.getCustomText()) && codes[0] == 10) {
                        key.label = mKeyboardConfig.getCustomText();
                        key.text = mKeyboardConfig.getCustomText();
                    }
                }

            }
        } else {
            Log.e("mand-mobile-rn", "the values content error ,values is " + mKeyboardConfig.getValues() + " and must be like '0,1,2,3,4,5,6,7,8,9,.'");
        }
    }

    /**
     * 隐藏软键盘
     */
    public void hideCustomSoftKeyboard() {
        if (null != mViewContainer && null != mViewContainer.getParent()) {
            mViewContainer.setAnimation(AnimationUtils.loadAnimation(mActivity, R.anim.up_to_hide));
            ((ViewGroup) mViewContainer.getParent()).removeView(mViewContainer);
            mViewContainer.setVisibility(View.GONE);
        }
    }

    /**
     * 判断是否显示
     *
     * @return true 不显示; false 显示
     */
    public boolean customKeyboardNotShowing() {
        if (null == mViewContainer) {
            return true;
        }
        return mViewContainer.getVisibility() != View.VISIBLE || mViewContainer.getParent() == null;
    }

    private KeyboardView.OnKeyboardActionListener mOnKeyboardActionListener = new KeyboardView.OnKeyboardActionListener() {
        @Override
        public void onPress(int i) {
        }

        @Override
        public void onRelease(int i) {
        }

        @Override
        public void onKey(int primaryCode, int[] keyCodes) {
            if (null != mEditText) {
                keyCode(primaryCode, mEditText);
            }
            mKeyboardView.postInvalidate();
        }

        @Override
        public void onText(CharSequence charSequence) {
            if (null != mEditText) {
                if (mEditText.hasFocus()) {
                    Editable editable = mEditText.getText();
                    int start = mEditText.getSelectionStart();
                    editable.insert(start, charSequence);
                }
            }
            mKeyboardView.postInvalidate();
        }

        @Override
        public void swipeLeft() {
        }

        @Override
        public void swipeRight() {
        }

        @Override
        public void swipeDown() {
        }

        @Override
        public void swipeUp() {
        }
    };

    /**
     * 字符
     *
     * @param primaryCode 主要字符
     * @param editText    编辑框
     */
    private void keyCode(int primaryCode, EditText editText) {
        Editable editable = editText.getText();
        int start = editText.getSelectionStart();
        if (primaryCode == KEYCODE_DELETE) {
            if (editText.hasFocus()) {
                if (!TextUtils.isEmpty(editable)) {
                    if (start > 0) {
                        editable.delete(start - 1, start);
                    }
                }
            }
            // 大小写切换
        } else if (primaryCode == Keyboard.KEYCODE_SHIFT) {
            mKeyboardView.setKeyboard(mKeyboard);
        } else if (primaryCode == Keyboard.KEYCODE_CANCEL) {
            hideCustomSoftKeyboard();
        } else if (primaryCode == KeyboardUtil.KEYCODE_OK) {
            hideCustomSoftKeyboard();
        }
    }


}