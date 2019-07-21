package com.mandmobile;

import android.app.Activity;
import android.text.TextUtils;
import android.widget.EditText;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * @author liuweies
 */
public class KeyboardConfig {
    private Activity mActivity;
    private EditText mEditText;

    /**
     * ReactEditText的tag
     */
    private int mRootTag;
    /**
     * 键盘类型
     */
    private String mKeyboardType;

    /**
     * 是否乱序
     */
    private boolean mShuffle;
    /**
     * ok键上的文案
     */
    private String mOkText;
    /**
     * 左下角按键的自定义文案，可以为空。
     * 如X,*等
     */
    private String mCustomText;

    private boolean hideDot;
    /**
     * 0,1,2,3,4,5,6,7,8,9,.
     */
    private String mValues;
    private List<String> mValuesArray;
    private List<String> mShuffleArray;

    public boolean isShuffle() {
        return mShuffle;
    }

    public void setmShuffle(boolean mShuffle) {
        this.mShuffle = mShuffle;
    }

    public Activity getActivity() {
        return mActivity;
    }

    public EditText getEditText() {
        return mEditText;
    }

    private void setEditText(EditText editText) {
        this.mEditText = editText;
    }

    private void setActivity(Activity activity) {
        this.mActivity = activity;
    }

    private void setRootTag(int rootTag) {
        this.mRootTag = rootTag;
    }

    public String getKeyboardType() {
        return mKeyboardType;
    }

    private void setKeyboardType(String keyboardType) {
        this.mKeyboardType = keyboardType;
    }

    private void setShuffle(boolean shuffle) {
        this.mShuffle = shuffle;
    }

    public String getOkText() {
        return mOkText;
    }

    private void setOkText(String okText) {
        this.mOkText = okText;
    }

    public String getCustomText() {
        return mCustomText;
    }

    private void setCustomText(String customText) {
        this.mCustomText = customText;
    }

    public String getValues() {
        return mValues;
    }

    public boolean isHideDot() {
        return hideDot;
    }

    public void setHideDot(boolean hideDot) {
        this.hideDot = hideDot;
    }

    @Override
    public String toString() {
        return "KeyboardConfig{" +
                "mActivity=" + mActivity +
                ", mEditText=" + mEditText +
                ", mRootTag=" + mRootTag +
                ", mKeyboardType='" + mKeyboardType + '\'' +
                ", mShuffle=" + mShuffle +
                ", mOkText='" + mOkText + '\'' +
                ", mCustomText='" + mCustomText + '\'' +
                ", hideDot=" + hideDot +
                ", mValues='" + mValues + '\'' +
                ", mValuesArray=" + mValuesArray +
                ", mShuffleArray=" + mShuffleArray +
                '}';
    }

    public List<String> getValuesArray() {
        if (!mShuffle) {
            return mValuesArray;
        }
        try {
            if (mValuesArray != null) {
                if (mValuesArray.size() == 11) {
                    mShuffleArray = mValuesArray.subList(0, 9);
                    Collections.shuffle(mShuffleArray);
                    mShuffleArray.add(mValuesArray.get(mValuesArray.size() - 1));
                    return mShuffleArray;
                }
            }
        } catch (Exception e) {
            LogUtil.error(e);
        }
        return mValuesArray;
    }

    private void setValues(String mValues) {
        this.mValues = mValues;
        if (!TextUtils.isEmpty(this.mValues)) {
            mValuesArray = Arrays.asList(this.mValues.split(","));
        }
    }

    static class Builder {
        private KeyboardConfig mKeyboardConfig;

        Builder(Activity activity) {
            this.mKeyboardConfig = new KeyboardConfig();
            this.mKeyboardConfig.setActivity(activity);
        }

        KeyboardConfig.Builder editText(EditText editText) {
            this.mKeyboardConfig.setEditText(editText);
            return this;
        }

        KeyboardConfig.Builder rootTag(int rootTag) {
            this.mKeyboardConfig.setRootTag(rootTag);
            return this;
        }

        KeyboardConfig.Builder keyboardType(String keyboardType) {
            this.mKeyboardConfig.setKeyboardType(keyboardType);
            return this;
        }

        KeyboardConfig.Builder shuffle(boolean shuffle) {
            this.mKeyboardConfig.setShuffle(shuffle);
            return this;
        }

        KeyboardConfig.Builder okText(String okText) {
            this.mKeyboardConfig.setOkText(okText);
            return this;
        }
        KeyboardConfig.Builder hideDot(boolean hideDot) {
            this.mKeyboardConfig.setHideDot(hideDot);
            return this;
        }

        KeyboardConfig.Builder customText(String customText) {
            this.mKeyboardConfig.setCustomText(customText);
            return this;
        }

        KeyboardConfig.Builder values(String values) {
            this.mKeyboardConfig.setValues(values);
            return this;
        }

        KeyboardConfig build() {
            return mKeyboardConfig;
        }
    }
}
