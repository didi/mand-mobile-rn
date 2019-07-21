package com.mandmobile.react.imagepicker.activity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.view.ViewPager;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.TextView;

import com.mandmobile.react.imagepicker.R;
import com.mandmobile.react.imagepicker.adapter.MDBaseImagePreviewAdapter;
import com.mandmobile.react.imagepicker.adapter.MDImagePreviewAdapter;
import com.mandmobile.react.imagepicker.config.MDImageConstant;
import com.mandmobile.react.imagepicker.entity.MDLocalImage;
import com.mandmobile.react.imagepicker.repository.MDCurrentAlbumRepository;
import com.mandmobile.react.imagepicker.util.MDAttrsUtils;
import com.mandmobile.react.imagepicker.util.MDCollectionUtils;
import com.mandmobile.react.imagepicker.util.MDDoubleClickUtils;
import com.mandmobile.react.imagepicker.util.MDImageUtils;
import com.mandmobile.react.imagepicker.util.MDSimpleAnimationListener;
import com.mandmobile.react.imagepicker.util.MDToastUtils;
import com.mandmobile.react.imagepicker.widget.MDPreviewViewPager;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by youzicong.
 */
public class MDImagePreviewActivity extends MDBaseImageActivity implements
        View.OnClickListener,
        MDBaseImagePreviewAdapter.OnImageClickListener {

    private int index;
    private List<MDLocalImage> imageList = new ArrayList<>();
    private List<MDLocalImage> selectedImageList = new ArrayList<>();

    private TextView tvTitle;
    private TextView tvOk;
    private ImageView ivCheck;
    private MDPreviewViewPager pvPreview;
    private View rlBottom;
    private View rlTitle;
    private Animation animTitleShow;
    private Animation animTitleDismiss;
    private Animation animBottomShow;
    private Animation animBottomDismiss;

    public static void openActivity(Activity activity, @NonNull List<MDLocalImage> list, @NonNull List<MDLocalImage> selectedList, int index) {
        if (MDDoubleClickUtils.isFastDoubleClick()) {
            return;
        }
        Intent intent = new Intent(activity, MDImagePreviewActivity.class);
        intent.putParcelableArrayListExtra(MDImageConstant.EXTRA_LIST, new ArrayList<>(list));
        intent.putParcelableArrayListExtra(MDImageConstant.EXTRA_SELECTED_LIST, new ArrayList<>(selectedList));
        intent.putExtra(MDImageConstant.EXTRA_INDEX, index);
        activity.startActivityForResult(intent, MDImageConstant.REQUEST_CODE_PREVIEW);
        activity.overridePendingTransition(R.anim.md_anim_enter, 0);
    }

    public static void openActivity(Activity activity, @NonNull List<MDLocalImage> selectedList, int index) {
        if (MDDoubleClickUtils.isFastDoubleClick()) {
            return;
        }
        Intent intent = new Intent(activity, MDImagePreviewActivity.class);
        intent.putParcelableArrayListExtra(MDImageConstant.EXTRA_SELECTED_LIST, new ArrayList<>(selectedList));
        intent.putExtra(MDImageConstant.EXTRA_INDEX, index);
        activity.startActivityForResult(intent, MDImageConstant.REQUEST_CODE_PREVIEW);
        activity.overridePendingTransition(R.anim.md_anim_enter, 0);
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.md_activity_image_preivew);

        index = getIntent().getIntExtra(MDImageConstant.EXTRA_INDEX, 0);
        selectedImageList = getIntent().getParcelableArrayListExtra(MDImageConstant.EXTRA_SELECTED_LIST);
        imageList = getIntent().getParcelableArrayListExtra(MDImageConstant.EXTRA_LIST);
        if (MDCollectionUtils.isEmpty(imageList)) {
            imageList = MDCurrentAlbumRepository.getInstance().readLocalMedias();
        }

        animTitleShow = AnimationUtils.loadAnimation(this, R.anim.md_album_show);
        animTitleDismiss = AnimationUtils.loadAnimation(this, R.anim.md_album_dismiss);

        animBottomShow = AnimationUtils.loadAnimation(this, R.anim.md_bottom_show);
        animBottomDismiss = AnimationUtils.loadAnimation(this, R.anim.md_bottom_dismiss);

        rlTitle = findViewById(R.id.md_rl_title);

        ImageView ivBack = findViewById(R.id.md_iv_back);
        ivBack.setImageDrawable(MDAttrsUtils.getTypeValueDrawable(this, R.attr.MDTitleViewBackIcon));
        findViewById(R.id.md_fl_back).setOnClickListener(this);

        tvTitle = findViewById(R.id.md_tv_title);
        tvTitle.setText(String.format("%s/%s", index + 1, imageList.size()));

        ivCheck = findViewById(R.id.md_iv_check);
        ivCheck.setVisibility(View.VISIBLE);
        findViewById(R.id.md_fl_check).setOnClickListener(this);

        rlBottom = findViewById(R.id.md_rl_bottom);

        findViewById(R.id.md_tv_preview).setVisibility(View.GONE);

        tvOk = findViewById(R.id.md_tv_ok);
        tvOk.setText(config.getSelectMode() == MDImageConstant.SINGLE ? getString(R.string.md_confirm)
                : getString(R.string.md_selected_images, MDCollectionUtils.isEmpty(selectedImageList) ?
                0 : selectedImageList.size(), config.getSelectMax()));
        tvOk.setOnClickListener(this);

        initViewPageAdapterData();
    }

    private void initViewPageAdapterData() {
        MDImagePreviewAdapter adapter = new MDImagePreviewAdapter(this, imageList, this);
        pvPreview = findViewById(R.id.md_pv_preview);
        pvPreview.setAdapter(adapter);
        pvPreview.setCurrentItem(index);
        updateSelectedNum();
        updateSelectedIcon(index);
        pvPreview.addOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
            }

            @Override
            public void onPageSelected(int i) {
                index = i;
                tvTitle.setText(String.format("%s/%s", index + 1, imageList.size()));
                updateSelectedIcon(index);
            }

            @Override
            public void onPageScrollStateChanged(int state) {
            }
        });
    }

    @Override
    public void onBackPressed() {
        closePreview();
    }


    @Override
    public void onImageClick(int position) {
        if (rlTitle.getVisibility() == View.VISIBLE) {
            rlTitle.startAnimation(animTitleDismiss);
            animTitleDismiss.setAnimationListener(new MDSimpleAnimationListener() {
                @Override
                public void onAnimationEnd(Animation animation) {
                    rlTitle.setVisibility(View.GONE);
                }
            });
            rlBottom.startAnimation(animBottomDismiss);
            animBottomDismiss.setAnimationListener(new MDSimpleAnimationListener() {
                @Override
                public void onAnimationEnd(Animation animation) {
                    rlBottom.setVisibility(View.GONE);
                }
            });
        } else {
            rlTitle.setVisibility(View.VISIBLE);
            rlTitle.startAnimation(animTitleShow);
            rlBottom.setVisibility(View.VISIBLE);
            rlBottom.startAnimation(animBottomShow);
        }
    }

    @Override
    public void onClick(View view) {
        int id = view.getId();
        if (id == R.id.md_fl_back) {
            closePreview();
        }
        if (id == R.id.md_tv_ok) {
            // 如果设置了图片最小选择数量，则判断是否满足条件
            if (config.getSelectMin() > selectedImageList.size() && config.getSelectMode() == MDImageConstant.MULTIPLE) {
                MDToastUtils.show(this, getString(R.string.md_min_images, config.getSelectMin()));
                return;
            }
            onResultFinish(selectedImageList);
        }
        if (id == R.id.md_fl_check) {
            if (imageList != null && imageList.size() > 0) {
                MDLocalImage image = imageList.get(pvPreview.getCurrentItem());
                // 刷新图片列表中图片状态
                ivCheck.setSelected(!ivCheck.isSelected());

                if (config.getSelectMode() == MDImageConstant.MULTIPLE && selectedImageList.size() >= config.getSelectMax() && ivCheck.isSelected()) {
                    MDToastUtils.show(this, getString(R.string.md_max_images_tip, config.getSelectMax()));
                    ivCheck.setSelected(false);
                    return;
                }
                if (ivCheck.isSelected()) {
                    // 如果是单选，清空已选列表，同时更新上一个选中的 Item
                    if (config.getSelectMode() == MDImageConstant.SINGLE && !MDCollectionUtils.isEmpty(selectedImageList)) {
                        selectedImageList.clear();
                    }
                    selectedImageList.add(image);
                    image.setSelectNum(selectedImageList.size());
                } else {
                    for (MDLocalImage media : selectedImageList) {
                        if (media.getPath().equals(image.getPath())) {
                            selectedImageList.remove(media);
                            updateSelectedPosition();
                            break;
                        }
                    }
                }
                updateSelectedNum();
            }
        }
    }

    private void closePreview() {
        Intent data = putIntent(selectedImageList);
        data.putExtra(MDImageConstant.RESULT_EXTRA_FINISH, false);
        setResult(RESULT_OK, data);
        finish();
    }

    /**
     * 更新选择的顺序
     */
    private void updateSelectedPosition() {
        for (int index = 0, len = selectedImageList.size(); index < len; index++) {
            MDLocalImage media = selectedImageList.get(index);
            media.setSelectNum(index + 1);
        }
    }

    /**
     * 判断当前图片是否选中
     */
    private void updateSelectedIcon(int position) {
        if (imageList != null && imageList.size() > 0) {
            MDLocalImage image = imageList.get(position);
            ivCheck.setSelected(MDImageUtils.isSelected(selectedImageList, image));
        } else {
            ivCheck.setSelected(false);
        }
    }

    /**
     * 更新图片选择数量
     */
    public void updateSelectedNum() {
        boolean notEmpty = !MDCollectionUtils.isEmpty(selectedImageList);
        tvOk.setEnabled(notEmpty);
        tvOk.setText(config.getSelectMode() == MDImageConstant.SINGLE ? getString(R.string.md_confirm)
                : getString(R.string.md_selected_images, selectedImageList.size(), config.getSelectMax()));
    }
}
