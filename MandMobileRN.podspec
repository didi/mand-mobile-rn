
require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |spec|

  spec.name         = "MandMobileRN"
  spec.version      = package["version"]
  spec.summary      = "MandMobileRN."
  spec.description  = <<-DESC
                      mand-mobile-rn 是滴滴金融 FE 团队开发的面向金融场景的 react-native 组件库。
                      DESC
  spec.homepage     = "https://github.com/didi/mand-mobile-rn"
  spec.license      = "MIT"
  spec.authors      = { "renhongyu", "huangbinxing", "zhuchu", "weijiangmin", "youzicong", "liuwei" }
  spec.platform     = :ios
  spec.platform     = :ios, "9.0"
  spec.source       = { :git => "https://github.com/didi/mand-mobile-rn.git", :tag => spec.version }

  spec.subspec "Core" do |ss|
    # ss.dependency             "yoga", "#{package["version"]}.React"
    ss.source_files  = "src/natives/Core/Classes", "src/natives/Core/Classes/*.{h,m}"
    ss.public_header_files = "src/natives/Core/Classes/*.h"
    ss.resources = "src/assets/**/*.{ttf,json,png,jpg,svg,strings,otf}"
  end

  spec.subspec "MDNumberKeyboard" do |ss|
    ss.source_files = "src/natives/NumberKeyboard/ios/*.{h,m}"
    ss.public_header_files = "src/natives/NumberKeyboard/ios/*.h"
  end

  spec.subspec "MDRefreshControl" do |ss|
    ss.source_files = "src/natives/RefreshControl/ios/*.{h,m}"
    ss.public_header_files = "src/natives/RefreshControl/ios/*.h"
    ss.dependency "MJRefresh", "~> 3.1"
  end

  spec.subspec "MDImagePicker" do |ss|
    ss.source_files = "src/natives/ImagePicker/ios/*.{h,m}","src/natives/ImagePicker/ios/MDImagePickerController/*.{h,m}"
    ss.public_header_files = "src/natives/ImagePicker/ios/*.h"
  end

  spec.requires_arc = true
  spec.dependency "React"
end
