import React, { useState, useEffect, useRef, createContext, Children } from "react";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

const AppLoadingContext = createContext();

const fetchFonts = () => {
    return Font.loadAsync({
        "gmarketsans-font": require("../assets/fonts/GmarketSansTTFMedium.ttf"),
    });
};

export const AppLoadingProvider = ({ children }) => {
    const [fontsLoaded, setFontLoaded] = useState(false);
    useEffect(() => {

        const loadFonts = async () => {
            try {
                await fetchFonts(); //폰트 로드
                console.log('성공');
                await new Promise((resolve) => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e); //폰트 로드 중 오류 발생 시 경고
            } finally {
                setFontLoaded(true);
                await SplashScreen.hideAsync(); //폰트 로드 완료 시 스플래시 스크린 숨김
            }
        };

        //스플래시 스크린이 자동으로 숨겨지지 않게 설정
        SplashScreen.preventAutoHideAsync();

        loadFonts();
    }, []);

    return (
        <AppLoadingContext.Provider value={{ fontsLoaded }}>
            {children}
        </AppLoadingContext.Provider>
    );
};

export default AppLoadingContext;