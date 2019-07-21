package com.mandmobile.react.imagepicker.repository;


import com.mandmobile.react.imagepicker.entity.MDLocalImage;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by youzicong.
 */
public class MDCurrentAlbumRepository {

    private List<MDLocalImage> medias;
    private static MDCurrentAlbumRepository sRepository;

    private MDCurrentAlbumRepository() {
        medias = new ArrayList<>();
    }

    public static MDCurrentAlbumRepository getInstance() {
        if (sRepository == null) {
            synchronized (MDCurrentAlbumRepository.class) {
                if (sRepository == null) {
                    sRepository = new MDCurrentAlbumRepository();
                }
            }
        }
        return sRepository;
    }


    /**
     * 存储图片
     *
     * @param list
     */
    public void saveLocalMedia(List<MDLocalImage> list) {
        medias = list;
    }


    /**
     * 读取图片
     */
    public List<MDLocalImage> readLocalMedias() {
        if (medias == null) {
            medias = new ArrayList<>();
        }
        return medias;
    }


    public void clearLocalMedia() {
        if (medias != null) {
            medias.clear();
        }
    }

}