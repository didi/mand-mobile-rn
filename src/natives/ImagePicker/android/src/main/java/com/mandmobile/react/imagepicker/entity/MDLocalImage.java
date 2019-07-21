package com.mandmobile.react.imagepicker.entity;

import android.os.Parcel;
import android.os.Parcelable;
import android.text.TextUtils;

/**
 * Created by youzicong.
 */
public class MDLocalImage implements Parcelable {
    private String path;
    private String compressPath;
    private String cutPath;
    private boolean isCut;
    private String mimeType;
    private boolean compressed;
    private int width;
    private int height;
    /**
     * RecyclerView holder position
     */
    private int position;
    /**
     * 选中序号
     */
    private int selectNum;

    public MDLocalImage() {

    }

    public MDLocalImage(String path, String mimeType) {
        this.path = path;
        this.mimeType = mimeType;
    }

    public MDLocalImage(String path, String mimeType, int width, int height) {
        this.path = path;
        this.mimeType = mimeType;
        this.width = width;
        this.height = height;
    }

    public MDLocalImage(String path, int position, int selectNum) {
        this.path = path;
        this.position = position;
        this.selectNum = selectNum;
    }

    public String getMimeType() {
        if (TextUtils.isEmpty(mimeType)) {
            mimeType = "image/jpeg";
        }
        return mimeType;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getCompressPath() {
        return compressPath;
    }

    public void setCompressPath(String compressPath) {
        this.compressPath = compressPath;
    }

    public String getCutPath() {
        return cutPath;
    }

    public void setCutPath(String cutPath) {
        this.cutPath = cutPath;
    }

    public boolean isCut() {
        return isCut;
    }

    public void setCut(boolean cut) {
        isCut = cut;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public int getSelectNum() {
        return selectNum;
    }

    public void setSelectNum(int selectNum) {
        this.selectNum = selectNum;
    }

    public boolean isCompressed() {
        return compressed;
    }

    public void setCompressed(boolean compressed) {
        this.compressed = compressed;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(this.path);
        dest.writeString(this.compressPath);
        dest.writeString(this.cutPath);
        dest.writeByte(this.isCut ? (byte) 1 : (byte) 0);
        dest.writeInt(this.position);
        dest.writeInt(this.selectNum);
        dest.writeString(this.mimeType);
        dest.writeByte(this.compressed ? (byte) 1 : (byte) 0);
        dest.writeInt(this.width);
        dest.writeInt(this.height);
    }

    protected MDLocalImage(Parcel in) {
        this.path = in.readString();
        this.compressPath = in.readString();
        this.cutPath = in.readString();
        this.isCut = in.readByte() != 0;
        this.position = in.readInt();
        this.selectNum = in.readInt();
        this.mimeType = in.readString();
        this.compressed = in.readByte() != 0;
        this.width = in.readInt();
        this.height = in.readInt();
    }

    public static final Parcelable.Creator<MDLocalImage> CREATOR = new Parcelable.Creator<MDLocalImage>() {
        @Override
        public MDLocalImage createFromParcel(Parcel source) {
            return new MDLocalImage(source);
        }

        @Override
        public MDLocalImage[] newArray(int size) {
            return new MDLocalImage[size];
        }
    };

    @Override
    public String toString() {
        return "MDLocalImage{" +
                "path='" + path + '\'' +
                ", compressPath='" + compressPath + '\'' +
                ", cutPath='" + cutPath + '\'' +
                ", isCut=" + isCut +
                ", position=" + position +
                ", selectNum=" + selectNum +
                ", mimeType='" + mimeType + '\'' +
                ", compressed=" + compressed +
                ", width=" + width +
                ", height=" + height +
                '}';
    }
}
