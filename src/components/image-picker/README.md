# 图片选择器

用于相册照片读取或拉起拍照。

## 使用

**import**

```javascript
import MDImagePicker from 'mand-mobile-rn'
```

### 调用

**相册**

```jsx
MDImagePicker.showImagePicker(
  options,
  (imageList) => {
    console.info(imageList)
    this.setState({
      imageList,
    })
  },
  (err) => {
    console.log(err)
  },
)
// OR
MDImagePicker.asyncShowImagePicker(options)
  .then((imageList) =>
    this.setState({
      imageList,
    }),
  )
  .catch((err) => console.log(err))
```

**相机**

```jsx
MDImagePicker.openCamera(
  options,
  (imageList) => {
    console.info(imageList)
    this.setState({
      imageList,
    })
  },
  (err) => {
    console.log(err)
  },
)
// OR
MDImagePicker.asyncOpenCamera(options)
  .then((imageList) =>
    this.setState({
      imageList,
    }),
  )
  .catch((err) => console.log(err))
```

## API

**相册**

```jsx
MDImagePicker.showImagePicker (
    options: IMDImagePickerOptions,
    successCallback: (imageList: IMDImage[]) => void,
    errorCallback: (e: string) => void
  )
// OR
MDImagePicker.asyncShowImagePicker (
    options: IMDImagePickerOptions
  ): Promise<IMDImage[]>
```

**相机**

```jsx
MDImagePicker.openCamera (
    options: IMDImagePickerOptions,
    successCallback: (imageList: IMDImage[]) => void,
    errorCallback: (e: string) => void
  )
// OR
MDImagePicker.asyncOpenCamera (
    options: IMDImagePickerOptions
  ): Promise<IMDImage[]>
```

### IMDImagePickerOptions

| 属性           | 说明                     | 类型    | 默认值               | 必须 | 备注                                       |
| :------------- | :----------------------- | :------ | :------------------- | :--- | :----------------------------------------- |
| imageSpanCount | 相册每行图片数           | number  | 4                    | N    |                                            |
| imageCount     | 相册最大选择图片数       | number  | 6                    | N    |                                            |
| showGif        | 相册是否显示 GIF 图片    | boolean | false                | N    |                                            |
| showCamera     | 相册是否显示拍照按钮     | boolean | false                | N    |                                            |
| cropEnable     | 拍照或选择图片后是否裁剪 | boolean | false                | N    | 相册只支持一张图片（imageCount=1）裁剪     |
| cropWidth      | 裁剪比例最大宽度         | number  | window 宽度的 0.6 倍 | N    |                                            |
| cropHeight     | 裁剪比例最大高度         | number  | window 宽度的 0.6 倍 | N    |                                            |
| cropQuality    | 裁剪图片质量             | number  | 90                   | N    | 图片质量 0-100                             |
| enableBase64   | 是否返回 Base64 编码     | boolean | false                | N    |                                            |
| removeSelected | 是否移除已选图片         | boolean | true                 | N    | Native 端，会维持一份上一次选择的图片 List |

## 类型

- `IMDImage`

```js
export interface IMDImage {
  width?: number;
  height?: number;
  uri?: string;
  base64?: string;
}
```

| 属性   | 说明          | 类型   | 默认值 | 备注                                                 |
| :----- | :------------ | :----- | :----- | :--------------------------------------------------- |
| width  | 图片的宽度    | number | -      |                                                      |
| height | 图片的高度    | number | -      |                                                      |
| uri    | 图片的 uri    | string | -      |                                                      |
| base64 | 图片的 Base64 | string | -      | `IMDImagePickerOptions.enableBase64 = true` 才会返回 |

# 使用的第三方库

## Android

|             名称             | 协议                          | 地址                                                                                                                           |
| :--------------------------: | :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
|            Glide             | BSD, part MIT and Apache 2.0. | [https://github.com/bumptech/glide](https://github.com/bumptech/glide)                                                         |
|          PhotoView           | Apache 2.0                    | [https://github.com/chrisbanes/PhotoView](https://github.com/chrisbanes/PhotoView)                                             |
|            RxJava            | Apache 2.0                    | [https://github.com/ReactiveX/RxJava](https://github.com/ReactiveX/RxJava)                                                     |
|          RxAndroid           | Apache 2.0                    | [https://github.com/ReactiveX/RxAndroid](https://github.com/ReactiveX/RxAndroid)                                               |
| Subsampling Scale Image View | Apache 2.0                    | [https://github.com/davemorrissey/subsampling-scale-image-view](https://github.com/davemorrissey/subsampling-scale-image-view) |
|        RxPermissions         | Apache 2.0                    | [https://github.com/tbruyelle/RxPermissions](https://github.com/tbruyelle/RxPermissions)                                       |
|            Luban             | Apache 2.0                    | [https://github.com/Curzibn/Luban](https://github.com/Curzibn/Luban)                                                           |
|            uCrop             | Apache 2.0                    | [https://github.com/Yalantis/uCrop](https://github.com/Yalantis/uCrop)                                                         |
