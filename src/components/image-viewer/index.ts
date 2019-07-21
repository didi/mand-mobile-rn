import ImagePicker from '../../natives/ImagePicker';

export default class ImageViewer {
  public static show (list: string[], initialIndex = 0, hasDots = false) {
    ImagePicker.previewImageList(list, initialIndex, hasDots);
  }
}
