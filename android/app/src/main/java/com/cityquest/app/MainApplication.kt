package com.cityquest.app

import android.app.Application
import android.content.res.Configuration
import android.util.Log

import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.ReactHost
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader

import expo.modules.ApplicationLifecycleDispatcher
import expo.modules.ReactNativeHostWrapper

import com.yandex.mapkit.MapKitFactory

class MainApplication : Application(), ReactApplication {

  companion object {
    private const val TAG = "MainApplication"
    private const val YANDEX_MAPS_API_KEY = "3d295877-17f1-4276-94a1-32cddde3a048"
  }

  override val reactNativeHost: ReactNativeHost = ReactNativeHostWrapper(
        this,
        object : DefaultReactNativeHost(this) {
          override fun getPackages(): List<ReactPackage> {
            val packages = PackageList(this).packages
            // Packages that cannot be autolinked yet can be added manually here, for example:
            // packages.add(MyReactNativePackage())
            return packages
          }

          override fun getJSMainModuleName(): String = ".expo/.virtual-metro-entry"

          override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

          override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
          override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }
  )

  override val reactHost: ReactHost
    get() = ReactNativeHostWrapper.createReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    
    try {
      SoLoader.init(this, OpenSourceMergedSoMapping)
      Log.d(TAG, "SoLoader initialized successfully")
    } catch (e: Exception) {
      Log.e(TAG, "Error initializing SoLoader: ${e.message}", e)
    }
    
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      try {
        // If you opted-in for the New Architecture, we load the native entry point for this app.
        load()
        Log.d(TAG, "New Architecture loaded successfully")
      } catch (e: Exception) {
        Log.e(TAG, "Error loading New Architecture: ${e.message}", e)
      }
    }
    
    // Initialize Yandex Maps with better error handling
    initializeYandexMaps()
    
    try {
      ApplicationLifecycleDispatcher.onApplicationCreate(this)
      Log.d(TAG, "Application lifecycle dispatcher initialized")
    } catch (e: Exception) {
      Log.e(TAG, "Error initializing application lifecycle dispatcher: ${e.message}", e)
    }
  }

  private fun initializeYandexMaps() {
    try {
      Log.d(TAG, "Starting Yandex Maps initialization...")
      
      // Set API key before initialization
      MapKitFactory.setApiKey(YANDEX_MAPS_API_KEY)
      Log.d(TAG, "Yandex Maps API key set successfully")
      
      // Initialize MapKit
      MapKitFactory.initialize(this)
      Log.d(TAG, "Yandex Maps initialized successfully")
      
    } catch (e: SecurityException) {
      Log.e(TAG, "Security error initializing Yandex Maps: ${e.message}", e)
    } catch (e: IllegalArgumentException) {
      Log.e(TAG, "Invalid argument error initializing Yandex Maps: ${e.message}", e)
    } catch (e: Exception) {
      Log.e(TAG, "Unexpected error initializing Yandex Maps: ${e.message}", e)
    }
  }

  override fun onConfigurationChanged(newConfig: Configuration) {
    super.onConfigurationChanged(newConfig)
    try {
      ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig)
    } catch (e: Exception) {
      Log.e(TAG, "Error handling configuration change: ${e.message}", e)
    }
  }
}
