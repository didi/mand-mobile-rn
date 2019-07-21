package com.mandmobile.react.imagepicker.dialog;


import android.app.Dialog;
import android.content.Context;
import android.view.Window;

import com.mandmobile.react.imagepicker.R;

public class MDLoadingDialog extends Dialog {

    public MDLoadingDialog(Context context) {
        super(context, R.style.MDLoadingDialogTheme);
        setContentView(R.layout.md_dialog_loading);
        setCancelable(true);
        setCanceledOnTouchOutside(false);
        Window window = getWindow();
        if (null != window) {
            window.setWindowAnimations(R.style.MDLoadingDialogAnimation);
        }
    }
}