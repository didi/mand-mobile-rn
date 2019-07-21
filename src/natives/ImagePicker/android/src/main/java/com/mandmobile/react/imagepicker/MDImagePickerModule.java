package com.mandmobile.react.imagepicker;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.mandmobile.react.imagepicker.config.MDImageConstant;
import com.mandmobile.react.imagepicker.entity.MDLocalImage;
import com.mandmobile.react.imagepicker.util.MDImageUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by youzicong.
 */
public class MDImagePickerModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    private static final String REASON_IMAGE_LIST_IS_EMPTY = "image list is empty";
    private static final String REASON_CODE = "0";
    private MDImagePickerOptions options;
    private Callback successCallback;
    private Callback errorCallback;
    private Promise promise;
    private List<MDLocalImage> selectedList = new ArrayList<>();

    public MDImagePickerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);

    }

    @Override
    public String getName() {
        return "MDImagePicker";
    }

    /**
     * 显示图片选择器，通过 {@link Callback} 方式
     *
     * @param options         初始化参数 {@link MDImagePickerOptions#parser(ReadableMap)}
     * @param successCallback 成功回调
     * @param errorCallback   错误回调
     */
    @ReactMethod
    public void showImagePicker(ReadableMap options, Callback successCallback, Callback errorCallback) {
        this.options = MDImagePickerOptions.parser(options);
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
        this.promise = null;
        this.openImagePicker();
    }

    /**
     * 显示图片选择器，通过 {@link Promise} 方式
     *
     * @param options 初始化参数 {@link MDImagePickerOptions#parser(ReadableMap)}
     * @param promise {@link Promise}
     */
    @ReactMethod
    public void asyncShowImagePicker(ReadableMap options, Promise promise) {
        this.options = MDImagePickerOptions.parser(options);
        this.promise = promise;
        this.successCallback = null;
        this.errorCallback = null;
        this.openImagePicker();
    }

    /**
     * 显示拍照，通过 {@link Callback} 方式
     *
     * @param options         初始化参数 {@link MDImagePickerOptions#parser(ReadableMap)}
     * @param successCallback 成功回调
     * @param errorCallback   错误回调
     */
    @ReactMethod
    public void openCamera(ReadableMap options, Callback successCallback, Callback errorCallback) {
        this.options = MDImagePickerOptions.parser(options);
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
        this.promise = null;
        this.openCamera();
    }

    /**
     * 显示拍照，通过 {@link Promise} 方式
     *
     * @param options 初始化参数 {@link MDImagePickerOptions#parser(ReadableMap)}
     * @param promise {@link Promise}
     */
    @ReactMethod
    public void asyncOpenCamera(ReadableMap options, Promise promise) {
        this.options = MDImagePickerOptions.parser(options);
        this.promise = promise;
        this.successCallback = null;
        this.errorCallback = null;
        this.openCamera();
    }

    /**
     * 移除每次选中图片缓存列表中的某张
     *
     * @param index 缓存图片集合索引
     */
    @ReactMethod
    public void removeImage(int index) {
        if (!selectedList.isEmpty() && selectedList.size() > index) {
            selectedList.remove(index);
        }
    }

    /**
     * 移除每次选中图片缓存列表中的所有图片
     */
    @ReactMethod
    public void removeAll() {
        selectedList.clear();
    }


    /**
     * 预览图片
     *
     * @param imageList 图片uri集合
     * @param index     显示索引的图片
     * @param showTitle 是否显示title
     */
    @ReactMethod
    public void previewImageList(ReadableArray imageList, int index, boolean showTitle) {
        if (null == imageList || 0 == imageList.size()) {
            return;
        }
        ArrayList<String> list = new ArrayList<>();
        for (int i = 0; i < imageList.size(); i++) {
            list.add(imageList.getString(i));
        }
        MDImagePickerCreator.openPreview()
                .list(list)
                .index(index)
                .showTitle(showTitle)
                .forResult(getCurrentActivity(), MDImageConstant.REQUEST_CODE_CHOOSE);
    }

    private void openImagePicker() {
        if (this.options.isRemoveSelected()) {
            removeAll();
        }

        MDImagePickerCreator.openGallery()
                .spanCount(options.getImageSpanCount())
                .selectMode(options.getImageCount() > 1 ? MDImageConstant.MULTIPLE : MDImageConstant.SINGLE)
                .selectMin(0)
                .selectMax(options.getImageCount())
                .selectedImages(this.selectedList)
                .hasCamera(options.isShowCamera())
                .showGif(options.isShowGif())
                .saveCameraPath("/MandMobileRN")
                .enableUCrop(options.isCropEnable())
                .uCropAspectRatio(options.getCropWidth(), options.getCropHeight())
                .uCropWidthAndHeight(options.getCropWidth(), options.getCropHeight())
                .uCropCompressQuality(options.getCropQuality())
                .enableLuban(true)
                .forResult(getCurrentActivity(), MDImageConstant.REQUEST_CODE_CHOOSE);
    }

    private void openCamera() {
        MDImagePickerCreator.openCamera()
                .saveCameraPath("/MandMobileRN")
                .enableUCrop(options.isCropEnable())
                .uCropAspectRatio(options.getCropWidth(), options.getCropHeight())
                .uCropWidthAndHeight(options.getCropWidth(), options.getCropHeight())
                .uCropCompressQuality(options.getCropQuality())
                .enableLuban(true)
                .forResult(getCurrentActivity(), MDImageConstant.REQUEST_CODE_CHOOSE);
    }

    @Override
    public void onNewIntent(Intent intent) {
        // DO NOTHING
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if (MDImageConstant.REQUEST_CODE_CHOOSE == requestCode && resultCode == Activity.RESULT_OK) {
            List<MDLocalImage> selectList = MDImagePickerCreator.obtainResult(data);
            if (selectList == null) {
                invokeError();
                return;
            }
            this.selectedList = selectList;

            WritableNativeArray imageList = new WritableNativeArray();
            for (MDLocalImage localImage : selectList) {
                MDImage image = new MDImage();
                boolean isCompress = localImage.isCompressed();
                boolean isCut = localImage.isCut();

                String path = isCompress ? localImage.getCompressPath() :
                        isCut ? localImage.getCutPath() : localImage.getPath();

                int[] imageSize = MDImageUtils.getImageSize(path);
                image.setWidth(imageSize[0]);
                image.setHeight(imageSize[1]);

                image.setURI(path);
                if (options.isEnableBase64()) {
                    image.setBase64(MDImageUtils.encodeBase64(path));
                }
                imageList.pushMap(image);
            }
            if (imageList.size() == 0) {
                invokeError();
            } else {
                invokeSuccess(imageList);
            }
        }
    }

    private void invokeSuccess(WritableArray imageList) {
        if (this.successCallback != null) {
            this.successCallback.invoke(imageList);
        }
        if (this.promise != null) {
            this.promise.resolve(imageList);
        }
    }

    private void invokeError() {
        if (this.errorCallback != null) {
            this.errorCallback.invoke(REASON_IMAGE_LIST_IS_EMPTY);
        }
        if (this.promise != null) {
            this.promise.reject(REASON_CODE, REASON_IMAGE_LIST_IS_EMPTY);
        }
    }
}