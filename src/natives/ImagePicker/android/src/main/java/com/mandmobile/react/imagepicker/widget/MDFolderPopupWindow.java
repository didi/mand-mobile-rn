package com.mandmobile.react.imagepicker.widget;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.support.annotation.NonNull;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.WindowManager;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.PopupWindow;

import com.mandmobile.react.imagepicker.R;
import com.mandmobile.react.imagepicker.adapter.MDImageFolderAdapter;
import com.mandmobile.react.imagepicker.entity.MDLocalImageFolder;
import com.mandmobile.react.imagepicker.util.MDAttrsUtils;
import com.mandmobile.react.imagepicker.util.MDSimpleAnimationListener;

import java.util.List;

/**
 * Created by youzicong.
 */
public class MDFolderPopupWindow extends PopupWindow implements View.OnClickListener {
    private Context context;
    private RecyclerView recyclerView;
    private MDImageFolderAdapter adapter;
    private Animation animShow;
    private Animation animDismiss;
    private boolean isDismissing = false;
    private ImageView imageFolderTitleArrow;
    private Drawable arrowUp;
    private Drawable arrowDown;

    public MDFolderPopupWindow(@NonNull Context context) {
        this.context = context;
        this.setContentView(LayoutInflater.from(context).inflate(R.layout.md_pop_folder, null));
        this.setWidth(WindowManager.LayoutParams.MATCH_PARENT);
        this.setHeight(WindowManager.LayoutParams.WRAP_CONTENT);
        this.setFocusable(true);
        this.setOutsideTouchable(true);
        this.update();
        arrowUp = MDAttrsUtils.getTypeValueDrawable(context, R.attr.MDImageFolderArrowUpIcon);
        arrowDown = MDAttrsUtils.getTypeValueDrawable(context, R.attr.MDImageFolderArrowDownIcon);
        animShow = AnimationUtils.loadAnimation(context, R.anim.md_album_show);
        animDismiss = AnimationUtils.loadAnimation(context, R.anim.md_album_dismiss);
        animDismiss.setAnimationListener(new MDSimpleAnimationListener() {
            @Override
            public void onAnimationEnd(Animation animation) {
                isDismissing = false;
                MDFolderPopupWindow.super.dismiss();
            }
        });
        initView();
    }

    private void initView() {
        LinearLayout llRoot = getContentView().findViewById(R.id.md_ll_root);
        recyclerView = getContentView().findViewById(R.id.folder_list);
        recyclerView.setLayoutManager(new LinearLayoutManager(context));
        adapter = new MDImageFolderAdapter(context);
        recyclerView.setAdapter(adapter);
        llRoot.setOnClickListener(this);
    }

    public void setFolderData(@NonNull List<MDLocalImageFolder> folders) {
        adapter.setFolderData(folders);
    }

    public void setImageTitle(@NonNull ImageView arrow) {
        this.imageFolderTitleArrow = arrow;
    }

    @Override
    public void showAsDropDown(View anchor) {
        super.showAsDropDown(anchor);
        isDismissing = false;
        recyclerView.startAnimation(animShow);
        imageFolderTitleArrow.setImageDrawable(arrowUp);
    }

    public void setOnItemClickListener(MDImageFolderAdapter.OnFolderItemClickListener onAlbumItemClickListener) {
        adapter.setOnFolderItemClickListener(onAlbumItemClickListener);
    }

    @Override
    public void dismiss() {
        if (isDismissing) {
            return;
        }
        imageFolderTitleArrow.setImageDrawable(arrowDown);
        isDismissing = true;
        recyclerView.startAnimation(animDismiss);
    }

    @Override
    public void onClick(View v) {
        int id = v.getId();
        if (id == R.id.md_ll_root) {
            dismiss();
        }
    }
}
