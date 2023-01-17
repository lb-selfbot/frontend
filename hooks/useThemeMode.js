import React from "react";

var currentThemeMode = "dark";
var themeModeListeners = [];

function useThemeMode() {
  const [themeMode, _setThemeMode] = React.useState(currentThemeMode);

  React.useEffect(() => {
    const onThemeModeChange = (newThemeMode) => {
      _setThemeMode(newThemeMode);
    };

    themeModeListeners.push(onThemeModeChange);

    return () => {
      themeModeListeners = themeModeListeners.filter(
        (listener) => listener !== onThemeModeChange
      );
    };
  }, []);

  const toggleThemeMode = () => {
    var newThemeMode = themeMode === "light" ? "dark" : "light";
    _setThemeMode(newThemeMode);
    themeModeListeners.forEach((listener) => listener(newThemeMode));
    currentThemeMode = newThemeMode;
  };

  const setThemeMode = (newThemeMode) => {
    _setThemeMode(newThemeMode);
    themeModeListeners.forEach((listener) => listener(newThemeMode));
    currentThemeMode = newThemeMode;
  };

  return { themeMode, setThemeMode, toggleThemeMode };
}

export default useThemeMode;
