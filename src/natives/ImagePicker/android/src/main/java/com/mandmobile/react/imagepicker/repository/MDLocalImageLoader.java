package com.mandmobile.react.imagepicker.repository;

import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.LoaderManager;
import android.support.v4.content.CursorLoader;
import android.support.v4.content.Loader;

import com.mandmobile.react.imagepicker.R;
import com.mandmobile.react.imagepicker.entity.MDLocalImage;
import com.mandmobile.react.imagepicker.entity.MDLocalImageFolder;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;


/**
 * Created by youzicong.
 */
public class MDLocalImageLoader {
    private static final Uri QUERY_URI = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
    private static final String[] PROJECTION = {
            MediaStore.Images.Media._ID,
            MediaStore.Images.Media.DATA,
            MediaStore.Images.Media.MIME_TYPE,
            MediaStore.Images.Media.WIDTH,
            MediaStore.Images.Media.HEIGHT};
    private static final String SELECTION_NOT_GIF = MediaStore.Images.Media.MIME_TYPE + "!='image/gif'";
    private static final String ORDER_BY = MediaStore.Images.Media.DATE_ADDED + " DESC";

    private FragmentActivity activity;
    private boolean isGif;


    public MDLocalImageLoader(FragmentActivity activity, boolean isGif) {
        this.activity = activity;
        this.isGif = isGif;
    }

    public void loadAllImages(final LocalImageLoadListener imageLoadListener) {
        activity.getSupportLoaderManager().initLoader(0, null,
                new LoaderManager.LoaderCallbacks<Cursor>() {
                    @NonNull
                    @Override
                    public Loader<Cursor> onCreateLoader(int id, Bundle args) {
                        return new CursorLoader(activity, QUERY_URI, PROJECTION,
                                isGif ? null : SELECTION_NOT_GIF, null, ORDER_BY);
                    }

                    @Override
                    public void onLoadFinished(@NonNull Loader<Cursor> loader, Cursor data) {
                        List<MDLocalImageFolder> imageFolderList = new ArrayList<>();
                        MDLocalImageFolder allImageFolder = new MDLocalImageFolder();
                        List<MDLocalImage> imageList = new ArrayList<>();
                        if (data != null) {
                            data.moveToFirst();
                            do {
                                String path = data.getString(data.getColumnIndexOrThrow(PROJECTION[1]));
                                String mimeType = data.getString(data.getColumnIndexOrThrow(PROJECTION[2]));
                                int width = data.getInt(data.getColumnIndexOrThrow(PROJECTION[3]));
                                int height = data.getInt(data.getColumnIndexOrThrow(PROJECTION[4]));

                                MDLocalImage image = new MDLocalImage(path, mimeType, width, height);

                                MDLocalImageFolder folder = getImageFolder(path, imageFolderList);
                                folder.getImages().add(image);
                                folder.setImageNum(folder.getImageNum() + 1);

                                allImageFolder.setImageNum(allImageFolder.getImageNum() + 1);

                                imageList.add(image);
                            } while (data.moveToNext());

                            sortFolder(imageFolderList);
                            allImageFolder.setFirstImagePath(imageList.get(0).getPath());
                            allImageFolder.setName(activity.getString(R.string.md_all_images));
                            allImageFolder.setImages(imageList);
                            imageFolderList.add(0, allImageFolder);
                            imageLoadListener.loadComplete(imageFolderList);
                        } else {
                            imageLoadListener.loadComplete(imageFolderList);
                        }
                    }

                    @Override
                    public void onLoaderReset(@NonNull Loader<Cursor> loader) {
                    }
                });
    }

    private void sortFolder(List<MDLocalImageFolder> imageFolders) {
        Collections.sort(imageFolders, new Comparator<MDLocalImageFolder>() {
            @Override
            public int compare(MDLocalImageFolder lhs, MDLocalImageFolder rhs) {
                if (lhs.getImages() == null || rhs.getImages() == null) {
                    return 0;
                }
                return lhs.getImageNum() - rhs.getImageNum();
            }
        });
    }

    private MDLocalImageFolder getImageFolder(String path, List<MDLocalImageFolder> imageFolders) {
        File imageFile = new File(path);
        File folderFile = imageFile.getParentFile();
        for (MDLocalImageFolder folder : imageFolders) {
            if (folder.getName().equals(folderFile.getName())) {
                return folder;
            }
        }
        MDLocalImageFolder newFolder = new MDLocalImageFolder();
        newFolder.setName(folderFile.getName());
        newFolder.setPath(folderFile.getAbsolutePath());
        newFolder.setFirstImagePath(path);
        imageFolders.add(newFolder);
        return newFolder;
    }

    public interface LocalImageLoadListener {
        void loadComplete(List<MDLocalImageFolder> folders);
    }
}
