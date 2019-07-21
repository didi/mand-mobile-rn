package com.mandmobile.react.imagepicker.adapter;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.drawable.Drawable;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.DataSource;
import com.bumptech.glide.load.engine.GlideException;
import com.bumptech.glide.load.resource.gif.GifDrawable;
import com.bumptech.glide.request.RequestListener;
import com.bumptech.glide.request.target.SimpleTarget;
import com.bumptech.glide.request.target.Target;
import com.bumptech.glide.request.transition.Transition;
import com.davemorrissey.labs.subscaleview.SubsamplingScaleImageView;
import com.mandmobile.react.imagepicker.R;
import com.mandmobile.react.imagepicker.config.MDMimeType;

import java.util.List;

import uk.co.senab.photoview.PhotoView;

/**
 * Created by youzicong on 2019/1/14
 */
public class MDImageSimplePreviewAdapter extends MDBaseImagePreviewAdapter<String> {

    public MDImageSimplePreviewAdapter(Context context, List<String> images, OnImageClickListener onImageClickListener) {
        super(context, images, onImageClickListener);
    }

    @NonNull
    @Override
    public Object instantiateItem(@NonNull ViewGroup container, final int position) {
        String path = images.get(position);

        View contentView = inflater.inflate(R.layout.md_adapter_image_preview, container, false);
        final PhotoView ivPreview = contentView.findViewById(R.id.md_iv_preview);
        final SubsamplingScaleImageView ivLongPreview = contentView.findViewById(R.id.md_iv_long_preview);
        final ProgressBar pbLoading = contentView.findViewById(R.id.md_pb_loading);
        ivPreview.setVisibility(View.GONE);
        ivLongPreview.setVisibility(View.GONE);

        if (path != null) {
            if (MDMimeType.isImageGif(path)) {
                Glide.with(contentView)
                        .asGif()
                        .apply(gifOptions)
                        .load(path)
                        .listener(new RequestListener<GifDrawable>() {
                            @Override
                            public boolean onLoadFailed(@Nullable GlideException e, Object model
                                    , Target<GifDrawable> target, boolean isFirstResource) {
                                pbLoading.setVisibility(View.GONE);
                                return false;
                            }

                            @Override
                            public boolean onResourceReady(GifDrawable resource, Object model
                                    , Target<GifDrawable> target, DataSource dataSource,
                                                           boolean isFirstResource) {
                                ivPreview.setVisibility(View.VISIBLE);
                                pbLoading.setVisibility(View.GONE);
                                return false;
                            }
                        })
                        .into(ivPreview);
            } else {
                Glide.with(contentView)
                        .asBitmap()
                        .load(path)
                        .apply(imageOptions)
                        .into(new SimpleTarget<Bitmap>(480, 800) {
                            @Override
                            public void onLoadFailed(@Nullable Drawable errorDrawable) {
                                super.onLoadFailed(errorDrawable);
                                pbLoading.setVisibility(View.GONE);
                            }

                            @Override
                            public void onResourceReady(@NonNull Bitmap resource, Transition<? super Bitmap> transition) {
                                pbLoading.setVisibility(View.GONE);
                                if (MDMimeType.isLongImage(resource)) {
                                    ivLongPreview.setVisibility(View.VISIBLE);
                                    displayLongImage(resource, ivLongPreview);
                                } else {
                                    ivPreview.setVisibility(View.VISIBLE);
                                    ivPreview.setImageBitmap(resource);
                                }
                            }
                        });
            }
            setOnClickListener(position, ivPreview, ivLongPreview);
        }
        (container).addView(contentView, 0);
        return contentView;
    }

}
