// ১. পাসওয়ার্ড সেটিংস
const SECRET_PASSWORD = "@Nhs#653&858$?:";

function checkAccess() {
    const input = document.getElementById('pass-input').value;
    if (input === SECRET_PASSWORD) {
        document.getElementById('auth-modal').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
    } else {
        document.getElementById('auth-error').style.display = 'block';
    }
}

// ২. অটোমেটিক ডাইনামিক ও লেটেস্ট ভার্সন জেনারেটর (Lifetime Automatic Update)
function getDynamicVersions() {
    const currentYear = new Date().getFullYear();
    const yearOffset = Math.max(0, currentYear - 2024);
    
    // ক্রোম ভার্সন হিসেব (২০২৬ সালে ১৪৮-১৫৮+ জেনারেট করবে)
    const baseChrome = 124 + (yearOffset * 12); 
    const chromeVersion = Math.floor(baseChrome + Math.random() * 10);
    const chromeBuild = Math.floor(Math.random() * 9000) + 1000;
    const chromePatch = Math.floor(Math.random() * 150) + 10;

    // iOS / Safari ভার্সন হিসেব
    const baseiOS = 17 + yearOffset;
    const iOSMinor = Math.floor(Math.random() * 5);

    return {
        chrome: `${chromeVersion}.0.${chromeBuild}.${chromePatch}`,
        safari: `${baseiOS}.${iOSMinor}`,
        ios: `${baseiOS}_${iOSMinor}`,
        androidVersion: 14 + Math.min(yearOffset, 3)
    };
}

// ৩. র‍্যান্ডম আইটেম সিলেক্ট করার ফাংশন
function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// ৪. ইউজার এজেন্ট জেনারেট করার আসল লজিক
function generateUserAgent() {
    const dyn = getDynamicVersions();
    const countInput = document.getElementById('count');
    const count = parseInt(countInput.value) || 10;
    const resultBox = document.getElementById('results');
    
    let userAgents = [];

    const androidDevices = [
        `SM-S928B`, `Pixel 8 Pro`, `SM-S938B`, `Pixel 9 Pro`
    ];

    for (let i = 0; i < count; i++) {
        const types = ['chrome_win', 'chrome_mac', 'safari_ios', 'chrome_android'];
        const chosenType = getRandomItem(types);
        let ua = "";

        if (chosenType === 'chrome_win') {
            ua = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${dyn.chrome} Safari/537.36`;
        } else if (chosenType === 'chrome_mac') {
            ua = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${dyn.chrome} Safari/537.36`;
        } else if (chosenType === 'safari_ios') {
            ua = `Mozilla/5.0 (iPhone; CPU iPhone OS ${dyn.ios} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/${dyn.safari} Mobile/15E148 Safari/604.1`;
        } else if (chosenType === 'chrome_android') {
            const device = getRandomItem(androidDevices);
            ua = `Mozilla/5.0 (Linux; Android ${dyn.androidVersion}; ${device}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${dyn.chrome} Mobile Safari/537.36`;
        }

        userAgents.push(ua);
    }

    if (resultBox) {
        resultBox.value = userAgents.join('\n');
    }
}
