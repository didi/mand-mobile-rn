package com.mandmobile.react.imagepicker.adapter;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.PointF;
import android.support.annotation.NonNull;
import android.support.v4.view.PagerAdapter;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.bumptech.glide.Priority;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.request.RequestOptions;
import com.davemorrissey.labs.subscaleview.ImageSource;
import com.davemorrissey.labs.subscaleview.ImageViewState;
import com.davemorrissey.labs.subscaleview.SubsamplingScaleImageView;

import java.util.List;

import uk.co.senab.photoview.PhotoView;
import uk.co.senab.photoview.PhotoViewAttacher;

/**
 * Created by youzicong on 2019/1/15
 */
public class MDBaseImagePreviewAdapter<T> extends PagerAdapter {
    protected final List<T> images;
    protected final Context context;
    protected final LayoutInflater inflater;
    protected final MDBaseImagePreviewAdapter.OnImageClickListener onImageClickListener;
    protected final RequestOptions gifOptions;
    protected final RequestOptions imageOptions;

    public MDBaseImagePreviewAdapter(Context context, List<T> images, OnImageClickListener onImageClickListener) {
        this.context = context;
        this.images = images;
        this.inflater = LayoutInflater.from(context);
        this.onImageClickListener = onImageClickListener;
        gifOptions = new RequestOptions()
                .override(480, 800)
                .priority(Priority.HIGH)
                .diskCacheStrategy(DiskCacheStrategy.NONE);
        imageOptions = new RequestOptions()
                .diskCacheStrategy(DiskCacheStrategy.ALL);
    }

    @Override
    public int getCount() {
        if (images != null) {
            return images.size();
        }
        return 0;
    }

    @Override
    public void destroyItem(@NonNull ViewGroup container, int position, @NonNull Object object) {
        (container).removeView((View) object);
    }

    @Override
    public boolean isViewFromObject(@NonNull View view, @NonNull Object object) {
        return view == object;
    }

    protected void displayLongImage(Bitmap bmp, SubsamplingScaleImageView imageView) {
        imageView.setQuickScaleEnabled(true);
        imageView.setZoomEnabled(true);
        imageView.setPanEnabled(true);
        imageView.setDoubleTapZoomDuration(100);
        imageView.setMinimumScaleType(SubsamplingScaleImageView.SCALE_TYPE_CENTER_CROP);
        imageView.setDoubleTapZoomDpi(SubsamplingScaleImageView.ZOOM_FOCUS_CENTER);
        imageView.setImage(ImageSource.cachedBitmap(bmp), new ImageViewState(0, new PointF(0, 0), 0));
    }

    protected void setOnClickListener(final int position, PhotoView preview, SubsamplingScaleImageView longPreview) {
        preview.setOnViewTapListener(new PhotoViewAttacher.OnViewTapListener() {
            @Override
            public void onViewTap(View view, float x, float y) {
                if (null != onImageClickListener) {
                    onImageClickListener.onImageClick(position);
                }
            }
        });
        longPreview.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (null != onImageClickListener) {
                    onImageClickListener.onImageClick(position);
                }
            }
        });
    }

    /**
     * Created by youzicong on 2019/1/15
     */
    public interface OnImageClickListener {
        void onImageClick(int position);
    }
}
