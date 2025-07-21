-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }

-keepclassmembers class * {
    @com.facebook.react.uimanager.ReactProp <methods>;
}

-keep class * extends com.facebook.react.bridge.JavaScriptModule { *; }
-keep class * extends com.facebook.react.bridge.NativeModule { *; }
-keep class * extends com.facebook.react.bridge.ReactContextBaseJavaModule { *; }

-keepclassmembers,includedescriptorclasses class * {
    native <methods>;
}

-dontwarn com.facebook.react.**
-dontwarn com.facebook.hermes.**

-keep class com.fliqzworldceleb.** { *; }