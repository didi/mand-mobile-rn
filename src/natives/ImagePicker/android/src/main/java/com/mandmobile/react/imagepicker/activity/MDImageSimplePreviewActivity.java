package com.mandmobile.react.imagepicker.activity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.view.ViewPager;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.TextView;

import com.mandmobile.react.imagepicker.R;
import com.mandmobile.react.imagepicker.adapter.MDBaseImagePreviewAdapter;
import com.mandmobile.react.imagepicker.adapter.MDImageSimplePreviewAdapter;
import com.mandmobile.react.imagepicker.config.MDImageConstant;
import com.mandmobile.react.imagepicker.util.MDAttrsUtils;
import com.mandmobile.react.imagepicker.util.MDDoubleClickUtils;
import com.mandmobile.react.imagepicker.util.MDSimpleAnimationListener;

import java.util.List;

/**
 * 图片预览
 * Created by youzicong
 */
public class MDImageSimplePreviewActivity extends MDBaseImageActivity implements MDBaseImagePreviewAdapter.OnImageClickListener {

    private TextView tvTitle;
    private List<String> images;
    private int position;
    private Animation animTitleShow;
    private Animation animTitleDismiss;
    private View rlTitle;
    private boolean showTitle;

    public static void openActivity(Activity activity, Bundle bundle, int requestCode) {
        if (MDDoubleClickUtils.isFastDoubleClick()) {
            return;
        }
        Intent intent = new Intent(activity, MDImageSimplePreviewActivity.class);
        intent.putExtras(bundle);
        activity.startActivityForResult(intent, requestCode);
        activity.overridePendingTransition(R.anim.md_anim_enter, 0);
    }

    public static void openActivity(Fragment fragment, Bundle bundle, int requestCode) {
        if (MDDoubleClickUtils.isFastDoubleClick() && fragment.getActivity() != null) {
            return;
        }
        Intent intent = new Intent(fragment.getActivity(), MDImageSimplePreviewActivity.class);
        intent.putExtras(bundle);
        fragment.startActivityForResult(intent, requestCode);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.md_activity_image_simple_preiview);

        images = getIntent().getStringArrayListExtra(MDImageConstant.EXTRA_LIST);
        position = getIntent().getIntExtra(MDImageConstant.EXTRA_INDEX, 0);
        showTitle = getIntent().getBooleanExtra(MDImageConstant.EXTRA_SHOW_TITLE, true);

        animTitleShow = AnimationUtils.loadAnimation(this, R.anim.md_album_show);
        animTitleDismiss = AnimationUtils.loadAnimation(this, R.anim.md_album_dismiss);

        rlTitle = findViewById(R.id.md_rl_title);
        rlTitle.setVisibility(showTitle ? View.VISIBLE : View.GONE);

        tvTitle = findViewById(R.id.md_tv_title);

        ImageView ibLeftBack = findViewById(R.id.md_iv_back);
        ibLeftBack.setImageDrawable(MDAttrsUtils.getTypeValueDrawable(this, R.attr.MDTitleViewBackIcon));
        findViewById(R.id.md_fl_back).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

        initViewPager();
    }

    @Override
    public void onBackPressed() {
        finish();
    }

    @Override
    public void finish() {
        super.finish();
        overridePendingTransition(0, R.anim.md_anim_exit);
    }

    private void initViewPager() {
        tvTitle.setText(String.format("%s/%s", position + 1, images.size()));

        ViewPager pvPreview = findViewById(R.id.md_pv_preview);
        MDImageSimplePreviewAdapter adapter = new MDImageSimplePreviewAdapter(this, images, this);
        pvPreview.setAdapter(adapter);
        pvPreview.setCurrentItem(position);
        pvPreview.addOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

            }

            @Override
            public void onPageSelected(int position) {
                tvTitle.setText(String.format("%s/%s", position + 1, images.size()));
            }

            @Override
            public void onPageScrollStateChanged(int state) {
            }
        });
    }

    @Override
    public void onImageClick(int position) {
        if (!showTitle) {
            return;
        }
        if (rlTitle.getVisibility() == View.VISIBLE) {
            rlTitle.startAnimation(animTitleDismiss);
            animTitleDismiss.setAnimationListener(new MDSimpleAnimationListener() {
                @Override
                public void onAnimationEnd(Animation animation) {
                    rlTitle.setVisibility(View.GONE);
                }
            });
        } else {
            rlTitle.setVisibility(View.VISIBLE);
            rlTitle.startAnimation(animTitleShow);
        }
    }
}
