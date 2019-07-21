package com.mandmobile.react.imagepicker.adapter;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.request.RequestOptions;
import com.mandmobile.react.imagepicker.R;
import com.mandmobile.react.imagepicker.config.MDImageConstant;
import com.mandmobile.react.imagepicker.config.MDImagePickerConfig;
import com.mandmobile.react.imagepicker.entity.MDLocalImage;
import com.mandmobile.react.imagepicker.util.MDCollectionUtils;
import com.mandmobile.react.imagepicker.util.MDDoubleClickUtils;
import com.mandmobile.react.imagepicker.util.MDImageUtils;
import com.mandmobile.react.imagepicker.util.MDToastUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by youzicong.
 */
public class MDImagePickerAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {
    private static final int TYPE_CAMERA = 1;
    private static final int TYPE_IMAGE = 2;
    private Context context;
    private boolean showCamera;
    private OnPhotoSelectChangedListener imageSelectChangedListener;
    private int maxSelectNum;
    private List<MDLocalImage> images = new ArrayList<>();
    private List<MDLocalImage> selectedImageList = new ArrayList<>();
    @MDImageConstant.SelectionMode
    private int selectionMode;
    private final RequestOptions options;

    public MDImagePickerAdapter(Context context, MDImagePickerConfig config) {
        this.context = context;
        this.selectionMode = config.getSelectMode();
        this.showCamera = config.isHasCamera();
        this.maxSelectNum = config.getSelectMax();
        float sizeMultiplier = config.getGlideThumbnailSize();

        options = new RequestOptions()
                .diskCacheStrategy(DiskCacheStrategy.ALL)
                .centerCrop()
                .placeholder(R.color.md_grey_9)
                .sizeMultiplier(sizeMultiplier);

    }

    public void setShowCamera(boolean showCamera) {
        this.showCamera = showCamera;
    }

    public void setImageList(@NonNull List<MDLocalImage> images) {
        this.images = images;
        notifyDataSetChanged();
    }

    @NonNull
    public List<MDLocalImage> getImageList() {
        if (images == null) {
            images = new ArrayList<>();
        }
        return images;
    }

    public void setSelectImageList(@NonNull List<MDLocalImage> images) {
        // 这里重新构构造一个新集合，不然会产生已选集合一变，结果集合也会添加的问题
        this.selectedImageList = new ArrayList<>(images);
        resetSelectedPosition();
        if (imageSelectChangedListener != null) {
            imageSelectChangedListener.onChange(selectedImageList);
        }
    }

    @NonNull
    public List<MDLocalImage> getSelectedImageList() {
        if (selectedImageList == null) {
            selectedImageList = new ArrayList<>();
        }
        return selectedImageList;
    }

    @Override
    public int getItemCount() {
        return showCamera ? images.size() + 1 : images.size();
    }

    @Override
    public int getItemViewType(int position) {
        if (showCamera && position == 0) {
            return TYPE_CAMERA;
        } else {
            return TYPE_IMAGE;
        }
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        if (viewType == TYPE_CAMERA) {
            View view = LayoutInflater.from(context).inflate(R.layout.md_adpater_camera_item, parent, false);
            return new CameraViewHolder(view);
        } else {
            View view = LayoutInflater.from(context).inflate(R.layout.md_adpater_image_item, parent, false);
            return new ImageHolder(view);
        }
    }

    @Override
    public void onBindViewHolder(@NonNull final RecyclerView.ViewHolder holder, int position) {
        if (getItemViewType(holder.getAdapterPosition()) == TYPE_CAMERA) {
            CameraViewHolder headerHolder = (CameraViewHolder) holder;
            headerHolder.cameraView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (imageSelectChangedListener != null && !MDDoubleClickUtils.isFastDoubleClick()) {
                        imageSelectChangedListener.onTakePhoto();
                    }
                }
            });
        } else {
            final int imagePosition = showCamera ? holder.getAdapterPosition() - 1 : holder.getAdapterPosition();

            final ImageHolder contentHolder = (ImageHolder) holder;
            final MDLocalImage image = images.get(imagePosition);
            final String path = image.getPath();
            image.setPosition(contentHolder.getAdapterPosition());

            contentHolder.tvCheck.setSelected(MDImageUtils.isSelected(selectedImageList, image));
            contentHolder.tvCheck.setText(image.getSelectNum() == 0 ? "" : String.valueOf(image.getSelectNum()));

            contentHolder.tvCheck.setText("");
            for (MDLocalImage selectedImage : selectedImageList) {
                if (selectedImage.getPath().equals(path)) {
                    image.setSelectNum(selectedImage.getSelectNum());
                    contentHolder.tvCheck.setText(String.valueOf(image.getSelectNum()));
                }
            }

            Glide.with(context)
                    .asBitmap()
                    .load(path)
                    .apply(options)
                    .into(contentHolder.ivImage);

            contentHolder.flCheck.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    changeCheckState(contentHolder, image);
                }
            });
            contentHolder.imageView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    imageSelectChangedListener.onImageClick(image, imagePosition);
                }
            });
        }
    }

    /**
     * 改变图片选中状态
     */
    private void changeCheckState(ImageHolder contentHolder, MDLocalImage image) {
        boolean isSelected = contentHolder.tvCheck.isSelected();
        if (selectionMode == MDImageConstant.MULTIPLE && selectedImageList.size() >= maxSelectNum && !isSelected) {
            String str = context.getString(R.string.md_max_images_tip, maxSelectNum);
            MDToastUtils.show(context, str);
            return;
        }

        if (isSelected) {
            for (MDLocalImage media : selectedImageList) {
                if (media.getPath().equals(image.getPath())) {
                    selectedImageList.remove(media);
                    resetSelectedPosition();
                    break;
                }
            }
        } else {
            // 如果是单选，清空已选列表，同时更新上一个选中的 Item
            if (selectionMode == MDImageConstant.SINGLE && !MDCollectionUtils.isEmpty(selectedImageList)) {
                MDLocalImage localImage = selectedImageList.get(0);
                notifyItemChanged(localImage.getPosition());
                selectedImageList.clear();
            }
            selectedImageList.add(image);
            image.setSelectNum(selectedImageList.size());
        }
        //通知点击项发生了改变
        notifyItemChanged(contentHolder.getAdapterPosition());
        if (imageSelectChangedListener != null) {
            imageSelectChangedListener.onChange(selectedImageList);
        }
    }

    /**
     * 更新选择的顺序
     */
    private void resetSelectedPosition() {
        int size = selectedImageList.size();
        for (int i = 0; i < size; i++) {
            MDLocalImage media = selectedImageList.get(i);
            media.setSelectNum(i + 1);
            notifyItemChanged(media.getPosition());
        }
    }

    public void setOnPhotoSelectChangedListener(OnPhotoSelectChangedListener imageSelectChangedListener) {
        this.imageSelectChangedListener = imageSelectChangedListener;
    }

    public interface OnPhotoSelectChangedListener {

        /**
         * 拍照回调
         */
        void onTakePhoto();

        /**
         * 已选Media回调
         */
        void onChange(List<MDLocalImage> selectImages);

        /**
         * 图片预览回调
         */
        void onImageClick(MDLocalImage media, int position);
    }

    public class CameraViewHolder extends RecyclerView.ViewHolder {

        View cameraView;

        CameraViewHolder(View itemView) {
            super(itemView);
            cameraView = itemView;
        }
    }

    public class ImageHolder extends RecyclerView.ViewHolder {
        ImageView ivImage;
        TextView tvCheck;
        View imageView;
        FrameLayout flCheck;

        ImageHolder(View itemView) {
            super(itemView);
            imageView = itemView;
            ivImage = itemView.findViewById(R.id.md_iv_folder_image);
            tvCheck = itemView.findViewById(R.id.md_tv_check);
            flCheck = itemView.findViewById(R.id.md_fl_check);
        }
    }
}
