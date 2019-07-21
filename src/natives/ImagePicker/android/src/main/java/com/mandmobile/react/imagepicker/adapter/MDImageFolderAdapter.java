package com.mandmobile.react.imagepicker.adapter;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.request.RequestOptions;
import com.mandmobile.react.imagepicker.R;
import com.mandmobile.react.imagepicker.entity.MDLocalImageFolder;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by youzicong.
 */
public class MDImageFolderAdapter extends RecyclerView.Adapter<MDImageFolderAdapter.ViewHolder> {
    private Context mContext;
    private List<MDLocalImageFolder> folders = new ArrayList<>();
    private final RequestOptions options;

    public MDImageFolderAdapter(Context mContext) {
        this.mContext = mContext;
        options = new RequestOptions()
                .placeholder(R.color.md_grey_9)
                .centerCrop()
                .sizeMultiplier(0.5f)
                .diskCacheStrategy(DiskCacheStrategy.ALL)
                .override(160, 160);
    }

    public void setFolderData(@NonNull List<MDLocalImageFolder> folders) {
        this.folders = folders;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(mContext).inflate(R.layout.md_adapter_image_folder_item, parent, false);
        return new ViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull final ViewHolder holder, int position) {
        final MDLocalImageFolder folder = folders.get(position);
        String name = folder.getName();
        int imageNum = folder.getImageNum();
        String imagePath = folder.getFirstImagePath();
        boolean isChecked = folder.isChecked();

        holder.tvFolderName.setText(name);
        holder.tvFolderImageCount.setText(String.valueOf(imageNum));
        holder.itemView.setSelected(isChecked);

        Glide.with(holder.itemView.getContext())
                .asBitmap()
                .load(imagePath)
                .apply(options)
                .into(holder.ivFolderImage);

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (onFolderItemClickListener != null) {
                    for (MDLocalImageFolder mediaFolder : folders) {
                        mediaFolder.setChecked(false);
                    }
                    folder.setChecked(true);
                    notifyDataSetChanged();
                    onFolderItemClickListener.onFolderItemClick(folder);
                }
            }
        });
    }

    @Override
    public int getItemCount() {
        return folders.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        ImageView ivFolderImage;
        TextView tvFolderName;
        TextView tvFolderImageCount;

        public ViewHolder(View itemView) {
            super(itemView);
            ivFolderImage = itemView.findViewById(R.id.md_iv_folder_image);
            tvFolderName = itemView.findViewById(R.id.md_tv_folder_name);
            tvFolderImageCount = itemView.findViewById(R.id.md_tv_folder_image_count);
        }
    }

    private OnFolderItemClickListener onFolderItemClickListener;

    public void setOnFolderItemClickListener(OnFolderItemClickListener onFolderItemClickListener) {
        this.onFolderItemClickListener = onFolderItemClickListener;
    }

    public interface OnFolderItemClickListener {
        void onFolderItemClick(@NonNull MDLocalImageFolder folder);
    }
}
