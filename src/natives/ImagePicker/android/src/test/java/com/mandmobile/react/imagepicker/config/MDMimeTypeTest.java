package com.mandmobile.react.imagepicker.config;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

/**
 * Created by youzicong on 2019/1/23
 */

public class MDMimeTypeTest {

    @Test
    public void isGif() {
        String type = "image/gif";
        assertTrue(MDMimeType.isGif(type));
        type = "image/GIF";
        assertTrue(MDMimeType.isGif(type));
    }

    @Test
    public void getImageSuffix() {
        String path = "/test/test.gif";
        assertEquals(".png", MDMimeType.getImageSuffix(path));
        path = "test/test";
        assertEquals(".png", MDMimeType.getImageSuffix(path));
        path = "test/test.jpeg";
        assertEquals(".jpeg", MDMimeType.getImageSuffix(path));
    }
}