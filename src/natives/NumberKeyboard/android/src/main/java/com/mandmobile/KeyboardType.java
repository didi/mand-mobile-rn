package com.mandmobile;

public enum KeyboardType {
    /**
     * 无小数点
     */
    TYPE_NO_DECIMAL_PROFESSIONAL("TYPE_NO_DECIMAL_PROFESSIONAL", "professional", R.xml.number_no_decimal_point),

    /**
     * 标准键盘
     */
    TYPE_SIMPLE("TYPE_SIMPLE", "simple", R.xml.number_normal),

    /**
     * 带小数点的
     */
    TYPE_WITH_DECIMAL_PROFESSIONAL("TYPE_WITH_DECIMAL_PROFESSIONAL", "professional", R.xml.number_with_decimal_point);

    private int mXmlResId;
    private String mKey;
    private String mCustomKeyboardType;

    KeyboardType(String key, String customKeyboardType, int xmlResId) {
        this.mXmlResId = xmlResId;
        this.mCustomKeyboardType = customKeyboardType;
        this.mKey = key;
    }


    public int getXmlResId() {
        return mXmlResId;
    }

    /**
     * @param customKeyboardType 键盘类型
     * @return 找不到返回null
     */
    public static KeyboardType fromCustomKeyboardType(String customKeyboardType, boolean hideDot) {
        if (hideDot) {
            return TYPE_NO_DECIMAL_PROFESSIONAL;
        } else if (TYPE_SIMPLE.mCustomKeyboardType.equals(customKeyboardType)) {
            return TYPE_SIMPLE;
        } else {
            return TYPE_WITH_DECIMAL_PROFESSIONAL;
        }
    }
}
