package com.mandmobilern.sample;

import android.app.Application;

import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.devsupport.DevInternalSettings;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.horcrux.svg.SvgPackage;
import com.mandmobile.MDNumberKeyboardPackage;
import com.mandmobile.react.imagepicker.MDImagePickerPackage;
import com.mandmobile.react.refreshcontrol.MDRefreshControlPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new RNGestureHandlerPackage(),
          new MDImagePickerPackage(),
          new MDNumberKeyboardPackage(),
          new MDRefreshControlPackage(),
                    new VectorIconsPackage(),
                    new SvgPackage(),
                    new LinearGradientPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        // 处理 haul delta 包 和 rn 不兼容问题
        new DevInternalSettings(this,null).setBundleDeltasEnabled(false);
    }
}
