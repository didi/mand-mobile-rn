package com.mandmobile.react.imagepicker.activity;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.FragmentActivity;

import com.mandmobile.react.imagepicker.R;
import com.mandmobile.react.imagepicker.config.MDImageConstant;
import com.mandmobile.react.imagepicker.config.MDImagePickerConfig;
import com.mandmobile.react.imagepicker.dialog.MDLoadingDialog;
import com.mandmobile.react.imagepicker.entity.MDLocalImage;
import com.mandmobile.react.imagepicker.util.MDLogUtils;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;

import io.reactivex.Flowable;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.functions.BiConsumer;
import io.reactivex.functions.Consumer;
import io.reactivex.functions.Function;
import io.reactivex.schedulers.Schedulers;
import top.zibin.luban.Luban;

import static com.mandmobile.react.imagepicker.util.MDLogUtils.i;


/**
 * Created by youzicong.
 */
public class MDBaseImageActivity extends FragmentActivity {
    private static final String TAG = "MDBaseImageActivity";
    protected MDImagePickerConfig config;

    protected MDLoadingDialog dialog;
    private CompositeDisposable disposable;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        config = MDImagePickerConfig.getInstance();
        disposable = new CompositeDisposable();
        setTheme(config.getThemeStyleId());
        super.onCreate(savedInstanceState);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        disposable.clear();
        dismissLoading();
    }

    @Override
    public void finish() {
        super.finish();
        dismissLoading();
        if (config.isCameraOrGallery()) {
            overridePendingTransition(0, R.anim.md_fade_out);
        } else {
            overridePendingTransition(0, R.anim.md_anim_exit);
        }
    }

    protected void showLoading() {
        if (!isFinishing()) {
            dismissLoading();
            dialog = new MDLoadingDialog(this);
            dialog.show();
        }
    }

    protected void dismissLoading() {
        try {
            if (dialog != null && dialog.isShowing()) {
                dialog.dismiss();
            }
        } catch (Exception e) {
            MDLogUtils.e(TAG, e);
        }

    }

    /**
     * compressImage
     */
    protected void compressImage(final List<MDLocalImage> result) {
        showLoading();
        disposable.add(Flowable.fromIterable(result)
                .observeOn(Schedulers.io())
                .map(new Function<MDLocalImage, MDLocalImage>() {
                    @Override
                    public MDLocalImage apply(MDLocalImage localImage) throws Exception {
                        String path = localImage.isCut() ? localImage.getCutPath() : localImage.getPath();
                        File file = Luban.with(MDBaseImageActivity.this)
                                .ignoreBy(config.getLubanIgnoreSize())
                                .setTargetDir(config.getLubanTargetDir())
                                .get(path);
                        localImage.setCompressed(true);
                        localImage.setCompressPath(file.getAbsolutePath());
                        i(TAG, "compressImage " + localImage);
                        return localImage;
                    }
                }).collect(new Callable<ArrayList<MDLocalImage>>() {

                    @Override
                    public ArrayList<MDLocalImage> call() {
                        return new ArrayList<>();
                    }
                }, new BiConsumer<ArrayList<MDLocalImage>, MDLocalImage>() {
                    @Override
                    public void accept(ArrayList<MDLocalImage> list, MDLocalImage image) {
                        list.add(image);
                    }
                })
                .subscribe(new Consumer<ArrayList<MDLocalImage>>() {
                    @Override
                    public void accept(ArrayList<MDLocalImage> imageList) {
                        dismissLoading();
                        onResultFinish(imageList);
                    }
                }, new Consumer<Throwable>() {
                    @Override
                    public void accept(Throwable throwable) {
                        MDLogUtils.e(TAG, throwable);
                        dismissLoading();
                        onResultFinish(result);
                    }
                })
        );
    }


    @NonNull
    protected Intent putIntent(@NonNull List<MDLocalImage> list) {
        return new Intent().putParcelableArrayListExtra(MDImageConstant.EXTRA_RESULT_SELECTED_IMAGES, new ArrayList<>(list));
    }

    /**
     * return image result
     */
    protected void onResultFinish(List<MDLocalImage> selectedImages) {
        setResult(RESULT_OK, putIntent(selectedImages));
        finish();
    }
}
