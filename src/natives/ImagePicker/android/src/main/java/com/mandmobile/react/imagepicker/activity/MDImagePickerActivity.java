package com.mandmobile.react.imagepicker.activity;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.SimpleItemAnimator;
import android.text.TextUtils;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.mandmobile.react.imagepicker.MDImagePickerCreator;
import com.mandmobile.react.imagepicker.R;
import com.mandmobile.react.imagepicker.adapter.MDImageFolderAdapter;
import com.mandmobile.react.imagepicker.adapter.MDImagePickerAdapter;
import com.mandmobile.react.imagepicker.config.MDImageConstant;
import com.mandmobile.react.imagepicker.config.MDMimeType;
import com.mandmobile.react.imagepicker.decoration.MDImageItemDecoration;
import com.mandmobile.react.imagepicker.entity.MDLocalImage;
import com.mandmobile.react.imagepicker.entity.MDLocalImageFolder;
import com.mandmobile.react.imagepicker.repository.MDCurrentAlbumRepository;
import com.mandmobile.react.imagepicker.repository.MDLocalImageLoader;
import com.mandmobile.react.imagepicker.util.MDCollectionUtils;
import com.mandmobile.react.imagepicker.util.MDDoubleClickUtils;
import com.mandmobile.react.imagepicker.util.MDFileUtils;
import com.mandmobile.react.imagepicker.util.MDImageUtils;
import com.mandmobile.react.imagepicker.util.MDToastUtils;
import com.mandmobile.react.imagepicker.widget.MDFolderPopupWindow;
import com.tbruyelle.rxpermissions2.RxPermissions;
import com.yalantis.ucrop.UCrop;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import io.reactivex.Observer;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.Disposable;

import static com.mandmobile.react.imagepicker.util.MDLogUtils.i;

/**
 * Created by youzicong.
 */
public class MDImagePickerActivity extends MDBaseImageActivity implements
        View.OnClickListener,
        MDImageFolderAdapter.OnFolderItemClickListener,
        MDImagePickerAdapter.OnPhotoSelectChangedListener {
    private final static String TAG = "MDImagePickerActivity";
    private final static String EXTRA_SELECT_LIST = "extra_select_list";

    private String cameraPath;
    private String outputCameraPath;
    private String selectedFolderPath;

    private TextView tvTitle;
    private TextView tvOK;
    private TextView tvEmpty;
    private TextView tvPreview;
    private RelativeLayout rlTitle;
    private MDImagePickerAdapter adapter;
    private List<MDLocalImage> imageList = new ArrayList<>();
    private List<MDLocalImageFolder> folderList = new ArrayList<>();
    private MDFolderPopupWindow folderWindow;
    private RxPermissions rxPermissions;
    private MDLocalImageLoader mediaLoader;

    public static void openActivity(Activity activity, int requestCode) {
        if (!MDDoubleClickUtils.isFastDoubleClick()) {
            Intent intent = new Intent(activity, MDImagePickerActivity.class);
            activity.startActivityForResult(intent, requestCode);
        }
    }

    public static void openActivity(Fragment fragment, int requestCode) {
        if (!MDDoubleClickUtils.isFastDoubleClick() && fragment.getActivity() != null) {
            Intent intent = new Intent(fragment.getActivity(), MDImagePickerActivity.class);
            fragment.startActivityForResult(intent, requestCode);
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        outputCameraPath = config.getSaveCameraPath();
        rxPermissions = new RxPermissions(this);

        if (savedInstanceState != null) {
            cameraPath = savedInstanceState.getString(MDImageConstant.EXTRA_CAMERA_PATH);
            selectedFolderPath = savedInstanceState.getString(MDImageConstant.EXTRA_SELECTED_FOLDER_PATH);
        }
        if (config.isCameraOrGallery()) {
            if (savedInstanceState == null) {
                rxPermissions.request(Manifest.permission.WRITE_EXTERNAL_STORAGE)
                        .subscribe(new Observer<Boolean>() {
                            @Override
                            public void onSubscribe(Disposable d) {
                            }

                            @Override
                            public void onNext(Boolean aBoolean) {
                                i(TAG, "onCreate init camera");
                                if (aBoolean) {
                                    onTakePhoto();
                                } else {
                                    MDToastUtils.show(MDImagePickerActivity.this, getString(R.string.md_refused_camera));
                                    finish();
                                }
                            }

                            @Override
                            public void onError(Throwable e) {
                            }

                            @Override
                            public void onComplete() {
                            }
                        });
            }
            getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN
                    , WindowManager.LayoutParams.FLAG_FULLSCREEN);
            setContentView(R.layout.md_activity_camera);
        } else {
            setContentView(R.layout.md_activity_image_picker);
            initView(savedInstanceState);
        }
    }

    private void initView(Bundle savedInstanceState) {
        rlTitle = findViewById(R.id.md_rl_title);

        findViewById(R.id.md_fl_back).setOnClickListener(this);

        tvTitle = findViewById(R.id.md_tv_title);
        tvTitle.setText(getString(R.string.md_all_images));
        tvTitle.setOnClickListener(this);

        ImageView ivTitleArrow = findViewById(R.id.md_iv_title_arrow);
        ivTitleArrow.setVisibility(View.VISIBLE);

        tvOK = findViewById(R.id.md_tv_ok);
        tvOK.setText(config.getSelectMode() == MDImageConstant.SINGLE ? getString(R.string.md_confirm)
                : getString(R.string.md_selected_images, 0, config.getSelectMax()));
        tvOK.setOnClickListener(this);

        findViewById(R.id.md_iv_check).setVisibility(View.GONE);

        tvPreview = findViewById(R.id.md_tv_preview);
        tvPreview.setOnClickListener(this);

        tvEmpty = findViewById(R.id.md_tv_empty);

        RecyclerView cvImages = findViewById(R.id.md_cv_images);
        cvImages.setHasFixedSize(true);
        cvImages.addItemDecoration(new MDImageItemDecoration(this, config.getSpanCount()));
        cvImages.setLayoutManager(new GridLayoutManager(this, config.getSpanCount()));
        ((SimpleItemAnimator) cvImages.getItemAnimator()).setSupportsChangeAnimations(false);// 解决调用 notifyItemChanged 闪烁问题,取消默认动画

        folderWindow = new MDFolderPopupWindow(this);
        folderWindow.setImageTitle(ivTitleArrow);
        folderWindow.setOnItemClickListener(this);

        List<MDLocalImage> selectedImageList = config.getSelectedImages();
        if (savedInstanceState != null) {
            // 防止拍照内存不足时activity被回收，导致拍照后的图片未选中
            selectedImageList = savedInstanceState.getParcelableArrayList(EXTRA_SELECT_LIST);
        }
        if (selectedImageList == null) {
            selectedImageList = new ArrayList<>();
        }
        adapter = new MDImagePickerAdapter(this, config);
        adapter.setOnPhotoSelectChangedListener(MDImagePickerActivity.this);
        adapter.setSelectImageList(selectedImageList);
        cvImages.setAdapter(adapter);

        mediaLoader = new MDLocalImageLoader(this, config.isShowGif());
        rxPermissions.request(Manifest.permission.WRITE_EXTERNAL_STORAGE)
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Observer<Boolean>() {
                    @Override
                    public void onSubscribe(Disposable d) {
                    }

                    @Override
                    public void onNext(Boolean aBoolean) {
                        if (aBoolean) {
                            showLoading();
                            loadAllImages();
                        } else {
                            MDToastUtils.show(MDImagePickerActivity.this, getString(R.string.md_refused_sd));
                        }
                    }

                    @Override
                    public void onError(Throwable e) {
                    }

                    @Override
                    public void onComplete() {
                    }
                });

    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putString(MDImageConstant.EXTRA_CAMERA_PATH, cameraPath);
        outState.putString(MDImageConstant.EXTRA_SELECTED_FOLDER_PATH, selectedFolderPath);
        if (adapter != null) {
            List<MDLocalImage> selectedImages = adapter.getSelectedImageList();
            outState.putParcelableArrayList(EXTRA_SELECT_LIST, new ArrayList<>(selectedImages));
        }
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
        MDCurrentAlbumRepository.getInstance().clearLocalMedia();
    }

    @Override
    public void onBackPressed() {
        if (folderWindow != null && folderWindow.isShowing()) {
            folderWindow.dismiss();
        } else {
            finish();
        }
    }

    private void loadAllImages() {
        mediaLoader.loadAllImages(new MDLocalImageLoader.LocalImageLoadListener() {
            @Override
            public void loadComplete(List<MDLocalImageFolder> folders) {
                if (folders.size() > 0) {
                    folderList = folders;

                    MDLocalImageFolder folder = folderList.get(0);
                    for (MDLocalImageFolder f : folderList) {
                        if (TextUtils.equals(f.getPath(), selectedFolderPath)) {
                            folder = f;
                        }
                    }

                    MDImagePickerActivity.this.imageList = folder.getImages();
                    folderWindow.setFolderData(folders);
                }
                if (adapter != null) {
                    adapter.setImageList(imageList);
                    tvEmpty.setVisibility(MDCollectionUtils.isEmpty(imageList) ? View.VISIBLE : View.INVISIBLE);
                }
                dismissLoading();
            }
        });
    }


    @Override
    public void onClick(View v) {
        int id = v.getId();
        if (id == R.id.md_fl_back) {
            if (folderWindow != null && folderWindow.isShowing()) {
                folderWindow.dismiss();
            } else {
                finish();
            }
        }
        if (id == R.id.md_tv_title) {
            if (folderWindow.isShowing()) {
                folderWindow.dismiss();
                return;
            }
            if (!MDCollectionUtils.isEmpty(imageList)) {
                folderWindow.showAsDropDown(rlTitle);
            }
        }
        if (id == R.id.md_tv_preview) {
            List<MDLocalImage> selectedImages = adapter.getSelectedImageList();
            MDImagePreviewActivity.openActivity(this, selectedImages, selectedImages, 0);
        }
        if (id == R.id.md_tv_ok) {
            List<MDLocalImage> images = adapter.getSelectedImageList();
            if (config.getSelectMode() == MDImageConstant.MULTIPLE
                    && config.getSelectMin() > 0 && config.getSelectMin() > images.size()) {
                MDToastUtils.show(this, getString(R.string.md_min_images, config.getSelectMin()));
                return;
            }
            finishSelectImage(images);
        }
    }

    /**
     * 相册选择回调
     */
    @Override
    public void onFolderItemClick(@NonNull MDLocalImageFolder folder) {
        adapter.setShowCamera(config.isHasCamera() && TextUtils.equals(folder.getName(), getString(R.string.md_all_images)));
        selectedFolderPath = folder.getPath();
        tvTitle.setText(folder.getName());
        adapter.setImageList(folder.getImages());
        folderWindow.dismiss();
    }

    /**
     * 拍照点击回调
     */
    @Override
    public void onTakePhoto() {
        // 启动相机拍照,先判断手机是否有拍照权限
        rxPermissions.request(Manifest.permission.CAMERA, Manifest.permission.WRITE_EXTERNAL_STORAGE)
                .subscribe(new Observer<Boolean>() {
                    @Override
                    public void onSubscribe(Disposable d) {
                    }

                    @Override
                    public void onNext(Boolean aBoolean) {
                        i(TAG, "onTakePhoto request camera");
                        if (aBoolean) {
                            openCamera();
                        } else {
                            MDToastUtils.show(MDImagePickerActivity.this, getString(R.string.md_refused_camera));
                            if (config.isCameraOrGallery()) {
                                finish();
                            }
                        }
                    }

                    @Override
                    public void onError(Throwable e) {
                    }

                    @Override
                    public void onComplete() {
                    }
                });
    }

    @Override
    public void onChange(List<MDLocalImage> selectImages) {
        boolean notEmpty = !MDCollectionUtils.isEmpty(selectImages);

        tvPreview.setEnabled(notEmpty);
        tvPreview.setSelected(true);

        tvOK.setEnabled(notEmpty);
        tvOK.setText(config.getSelectMode() == MDImageConstant.SINGLE ? getString(R.string.md_confirm)
                : getString(R.string.md_selected_images, selectImages.size(), config.getSelectMax()));
    }

    @Override
    public void onImageClick(MDLocalImage media, int position) {
        List<MDLocalImage> images = adapter.getImageList();
        MDCurrentAlbumRepository.getInstance().saveLocalMedia(images);//使用一个仓库来保存 preview 页面，相册列表，防止大列表在intent中崩溃
        MDImagePreviewActivity.openActivity(this, adapter.getSelectedImageList(), position);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (resultCode == RESULT_OK) {
            switch (requestCode) {
                case MDImageConstant.REQUEST_CODE_PREVIEW:
                    handlePreviewResult(data);
                    break;
                case UCrop.REQUEST_CROP:
                    handleCropResult(data);
                    break;
                case MDImageConstant.REQUEST_CAMERA:
                    handleCameraResult();
                    break;
            }
        } else if (resultCode == RESULT_CANCELED) {
            if (config.isCameraOrGallery()) {
                finish();
            }
        } else if (resultCode == UCrop.RESULT_ERROR) {
            Throwable throwable = (Throwable) data.getSerializableExtra(UCrop.EXTRA_ERROR);
            MDToastUtils.show(MDImagePickerActivity.this, throwable.getMessage());
        }
    }

    private void handleCameraResult() {
        final File file = new File(cameraPath);
        sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.fromFile(file)));

        int degree = MDImageUtils.getImageDegree(file.getAbsolutePath());
        MDImageUtils.rotateImage(degree, file);
        // 生成新拍照片或视频对象
        MDLocalImage localImage = new MDLocalImage();
        localImage.setPath(cameraPath);

        int[] imageSize = MDImageUtils.getImageSize(cameraPath);
        localImage.setWidth(imageSize[0]);
        localImage.setHeight(imageSize[1]);
        localImage.setMimeType(MDMimeType.createImageType(cameraPath));

        // 因为加入了单独拍照功能，所有如果是单独拍照的话也默认为单选状态
        if (config.isCameraOrGallery()) {
            ArrayList<MDLocalImage> selectedImageList = new ArrayList<>();
            selectedImageList.add(localImage);
            finishSelectImage(selectedImageList);
        } else {
            // 多选 返回列表并选中当前拍照的
            imageList.add(0, localImage);
            if (adapter != null) {
                List<MDLocalImage> selectedImages = adapter.getSelectedImageList();
                // 没有到最大选择量 才做默认选中刚拍好的
                if (selectedImages.size() < config.getSelectMax()) {
                    // 如果是单选，则清空已选中的并刷新列表(作单一选择)
                    if (config.getSelectMode() == MDImageConstant.SINGLE) {
                        selectedImages.clear();
                    }
                    selectedImages.add(localImage);
                    adapter.setSelectImageList(selectedImages);
                }
                adapter.notifyDataSetChanged();
                tvEmpty.setVisibility(imageList.size() > 0 ? View.INVISIBLE : View.VISIBLE);
                // 解决部分手机拍照完Intent.ACTION_MEDIA_SCANNER_SCAN_FILE
                // 不及时刷新问题手动添加
                manualSaveFolder(localImage);
            }
        }
    }

    private void handleCropResult(Intent data) {
        Uri resultUri = UCrop.getOutput(data);
        if (resultUri == null) {
            return;
        }
        String cutPath = resultUri.getPath();
        List<MDLocalImage> imageList = new ArrayList<>();
        MDLocalImage image;
        if (config.isCameraOrGallery()) {
            image = new MDLocalImage(cameraPath, 1, 0);
            image.setCut(true);
            image.setCutPath(cutPath);
            image.setMimeType(MDMimeType.createImageType(cutPath));
            imageList.add(image);
            compressCropImages(imageList);
        } else {
            if (adapter != null) {
                // 取单张裁剪已选中图片的path作为原图
                List<MDLocalImage> selectedImageList = adapter.getSelectedImageList();
                image = selectedImageList.size() > 0 ? selectedImageList.get(0) : null;
                if (image != null) {
                    MDLocalImage newImage = new MDLocalImage(image.getPath(), image.getPosition(), image.getSelectNum());
                    newImage.setWidth(image.getWidth());
                    newImage.setHeight(image.getHeight());
                    newImage.setCutPath(cutPath);
                    newImage.setCut(true);
                    newImage.setMimeType(MDMimeType.createImageType(cutPath));
                    imageList.add(newImage);
                    compressCropImages(imageList);
                }
            }
        }
    }

    private void compressCropImages(List<MDLocalImage> images) {
        if (config.isEnableLuban()) {
            compressImage(images);
        } else {
            onResultFinish(images);
        }
    }

    private void handlePreviewResult(Intent data) {
        if (data == null) {
            return;
        }
        List<MDLocalImage> selectedImageList = MDImagePickerCreator.obtainResult(data);
        boolean finish = data.getBooleanExtra(MDImageConstant.RESULT_EXTRA_FINISH, true);
        if (!MDCollectionUtils.isEmpty(selectedImageList)) {
            adapter.setSelectImageList(selectedImageList);
        }
        if (finish) {
            finishSelectImage(selectedImageList);
        }
    }

    private void finishSelectImage(List<MDLocalImage> images) {
        if (config.isEnableUCrop()) {
            openCropImageList(images);
        } else if (config.isEnableLuban()) {
            compressImage(images);
        } else {
            onResultFinish(images);
        }
    }

    private void openCropImageList(@NonNull List<MDLocalImage> images) {
        if (config.getSelectMode() == MDImageConstant.SINGLE) {
            MDLocalImage localMedia = images.size() > 0 ? images.get(0) : null;
            if (localMedia != null) {
                MDCropActivity.openActivity(this, localMedia.getPath());
            }
        } else {
            MDToastUtils.show(this, getString(R.string.md_only_support_single_image));
        }
    }

    /**
     * 手动添加拍照后的相片到图片列表，并设为选中
     */
    private void manualSaveFolder(MDLocalImage media) {
        if (folderList.size() == 0) {
            // 没有相册 先创建一个最近相册出来
            MDLocalImageFolder newFolder = new MDLocalImageFolder();
            String folderName = getString(R.string.md_all_images);
            newFolder.setName(folderName);
            newFolder.setPath("");
            newFolder.setFirstImagePath("");
            folderList.add(newFolder);
        }

        MDLocalImageFolder folder = MDImageUtils.getImageFolder(media.getPath(), folderList);
        MDLocalImageFolder cameraFolder = folderList.size() > 0 ? folderList.get(0) : null;
        if (cameraFolder != null && folder != null) {
            // 相机胶卷
            cameraFolder.setFirstImagePath(media.getPath());
            cameraFolder.setImages(imageList);
            cameraFolder.setImageNum(cameraFolder.getImageNum() + 1);
            // 拍照相册
            int num = folder.getImageNum() + 1;
            folder.setImageNum(num);
            folder.getImages().add(0, media);
            folder.setFirstImagePath(cameraPath);
            folderWindow.setFolderData(folderList);
        }
    }

    private void openCamera() {
        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (intent.resolveActivity(getPackageManager()) != null) {
            File cameraFile = MDFileUtils.createCameraFile(this, outputCameraPath);
            cameraPath = cameraFile.getAbsolutePath();
            Uri imageUri = MDFileUtils.getUriFromFile(this, cameraFile);
            intent.putExtra(MediaStore.EXTRA_OUTPUT, imageUri);
            startActivityForResult(intent, MDImageConstant.REQUEST_CAMERA);
        }
    }
}
