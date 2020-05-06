package com.rsg.chess;

import android.app.Application;
import androidx.multidex.MultiDexApplication;

import com.facebook.react.ReactApplication;
import io.invertase.firebase.crashlytics.ReactNativeFirebaseCrashlyticsPackage;
import io.invertase.firebase.admob.ReactNativeFirebaseAdmobPackage;
import io.invertase.firebase.analytics.ReactNativeFirebaseAnalyticsPackage;
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
            new ReactNativeFirebaseCrashlyticsPackage(),
            new ReactNativeFirebaseAdmobPackage(),
            new ReactNativeFirebaseAnalyticsPackage(),
            new ReactNativeFirebaseAppPackage(),
            new RNCWebViewPackage(),
        new SplashScreenReactPackage(),
        new SnackbarPackage()
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
    // RNF: Fabric.with(this, new Crashlytics());
    SoLoader.init(this, /* native exopackage */ false);
  }
}
