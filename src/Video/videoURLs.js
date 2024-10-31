export const urls = {
    tapestry: {
        adaptive: 'https://sitesecuritysystems.net:7001/hls/484c9876-0f8c-71b6-18b8-224cc998fd37.m3u?auth=ZGFyc2huYS52QGluYXBwLmNvbTpydGZaaXB3ODl2ZXpBWEt1VXlCS1VldVp3eE0yMGc9aHp0aWZtOjczZjI1ZjNjMThkZDdhODVlOWMwYmU0NTk0NjMzN2Iy',
        get hiTrue() { return this.adaptive + '&hi=true' },
        get loTrue() { return this.adaptive + '&lo=true' },
        get hi() { return this.adaptive + '&hi' },
        get lo() { return this.adaptive + '&lo' },
    },
    s999: {
        adaptive: "https://sitesecuritysystems.net:7001/hls/0dd4078d-d280-c611-373a-dcd7b2df96ac.m3u?auth=ZGFyc2huYS52QGluYXBwLmNvbTpydGZaaXB3ODl2ZXpBWEt1VXlCS1VldVp3eE0yMGc9aHpjZHV2OmJjMDM2NmY3MDQyYTA1Y2JjMGNkOTdlZDlkMzhhYTUw",
        get hiTrue() { return this.adaptive + '&hi=true' },
        get loTrue() { return this.adaptive + '&lo=true' },
        get hi() { return this.adaptive + '&hi' },
        get lo() { return this.adaptive + '&lo' },
    },
    s888: {
        adaptive: "https://sitesecuritysystems.net:7001/hls/dd12d347-b25d-2406-d25a-17c283dae425.m3u?auth=ZGFyc2huYS52QGluYXBwLmNvbTpydGZaaXB3ODl2ZXpBWEt1VXlCS1VldVp3eE0yMGc9aHpndmlhOmQxOGMzM2NhYjg0NjYwOTEzOGJmYTA1YjZiZjczZmNl",
        get hiTrue() { return this.adaptive + '&hi=true' },
        get loTrue() { return this.adaptive + '&lo=true' },
        get hi() { return this.adaptive + '&hi' },
        get lo() { return this.adaptive + '&lo' },
    },
    storybook: {
        adaptive: "https://sitesecuritysystems.net:7001/hls/18f9a604-dea2-1a00-8404-faf166e4f091.m3u?auth=ZGFyc2huYS52QGluYXBwLmNvbTpydGZaaXB3ODl2ZXpBWEt1VXlCS1VldVp3eE0yMGc9aHpxamRiOmQwNmM2ZTgyZTY1MDUzOWRjZjYyNGM5MzM1YTQ4MTYw",
        get hiTrue() { return this.adaptive + '&hi=true' },
        get loTrue() { return this.adaptive + '&lo=true' },
        get hi() { return this.adaptive + '&hi' },
        get lo() { return this.adaptive + '&lo' },
    },
    hevc: {
        apple: {
            url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_adv_example_hevc/master.m3u8"
        },
        bitmovin: {
            url: "http://bitmovin-a.akamaihd.net/content/dataset/multi-codec/hevc/stream_fmp4.m3u8"
        },
        bitmovin_simple: {
            url: "https://bitmovin-a.akamaihd.net/content/dataset/multi-codec/hevc/v1080p_1_fmp4.m3u8"
        },
        local: {
            url: "hevc_miramer.mkv"
        }
    }
}