let time_text = ""
let hour_12 = 0
let minute_text = ""
esp8266.init(SerialPin.P1, SerialPin.P2, BaudRate.BaudRate115200)
esp8266.connectWiFi("ssid", "password")
if (esp8266.isWifiConnected()) {
    basic.showIcon(IconNames.Yes)
} else {
    basic.showIcon(IconNames.No)
}
esp8266.initInternetTime(8)
if (esp8266.isInternetTimeInitialized()) {
    basic.showIcon(IconNames.Yes)
} else {
    basic.showIcon(IconNames.No)
}
basic.clearScreen()
basic.forever(function () {
    esp8266.updateInternetTime()
    if (esp8266.isInternetTimeUpdated()) {
        if (esp8266.getMinute() < 10) {
            minute_text = "0" + esp8266.getMinute()
        } else {
            minute_text = convertToText(esp8266.getMinute())
        }
        if (esp8266.getHour() > 12) {
            hour_12 = esp8266.getHour() - 12
        } else {
            hour_12 = esp8266.getHour()
        }
        time_text = "" + hour_12 + ":" + minute_text
        basic.showString(time_text)
    } else {
        basic.showIcon(IconNames.Sad)
    }
})
