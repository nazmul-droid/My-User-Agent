// ১. পাসওয়ার্ড সিকিউরিটি লজিক
const SECRET_PASSWORD = "@Nhs#653&858$?";

function checkAccess() {
    const input = document.getElementById('pass-input').value;
    if (input === SECRET_PASSWORD) {
        document.getElementById('auth-modal').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
    } else {
        document.getElementById('auth-error').style.display = 'block';
    }
}

// ২. অটোমেটিক ডাইনামিক ও লেটেস্ট ভার্সন জেনারেটর (Lifetime Update)
function getDynamicVersions() {
    const currentYear = new Date().getFullYear();
    const yearOffset = Math.max(0, currentYear - 2024);
    
    // ক্রোম ভার্সন হিসেব (১৪৮-১৬০+ অটোমেটিক লেটেস্ট)
    const baseChrome = 124 + (yearOffset * 12); 
    const chromeVersion = Math.floor(baseChrome + Math.random() * 10);
    const chromeBuild = Math.floor(Math.random() * 9000) + 1000;
    const chromePatch = Math.floor(Math.random() * 150) + 10;

    // iOS / Safari ভার্সন
    const baseiOS = 17 + yearOffset;
    const iOSMinor = Math.floor(Math.random() * 5);

    return {
        chrome: `${chromeVersion}.0.${chromeBuild}.${chromePatch}`,
        safari: `${baseiOS}.${iOSMinor}`,
        ios: `${baseiOS}_${iOSMinor}`,
        androidVersion: 14 + Math.min(yearOffset, 3)
    };
}

// ৩. র‍্যান্ডম হেল্পার ফংশন
function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// ৪. ইউজার এজেন্ট জেনারেটর (সকল ড্রপডাউন ও ফিল্টার সাপোর্টসহ)
function generateUserAgents() {
    const dyn = getDynamicVersions();
    
    // HTML Elements থেকে ভ্যালু নেওয়া (আইডি না থাকলে সতর্কতার সাথে হ্যান্ডেল)
    const countInput = document.getElementById('count') || document.querySelector('input[type="number"]');
    const platformSelect = document.getElementById('platform') || document.querySelectorAll('select')[0];
    const browserSelect = document.getElementById('browser') || document.querySelectorAll('select')[1];
    const resultBox = document.getElementById('results') || document.querySelector('textarea');

    const count = parseInt(countInput ? countInput.value : 10) || 10;
    const platform = platformSelect ? platformSelect.value : 'all';
    const browser = browserSelect ? browserSelect.value : 'all';

    let userAgents = [];
    const androidDevices = [`SM-S928B`, `Pixel 8 Pro`, `SM-S938B`, `Pixel 9 Pro`];

    for (let i = 0; i < count; i++) {
        let ua = "";
        
        // ডাইনামিক ইউজার এজেন্ট বিল্ডিং
        const isWin = platform.includes('win') || platform === 'all' || platform.includes('mix') || platform.includes('Devices');
        const isMac = platform.includes('mac');
        const isAndroid = platform.includes('android');
        const isIOS = platform.includes('ios') || platform.includes('iphone');

        // ফিল্টার লজিক
        let chosenType = 'chrome_win';
        if (isAndroid) chosenType = 'chrome_android';
        else if (isIOS) chosenType = 'safari_ios';
        else if (isMac) chosenType = 'chrome_mac';
        else {
            const types = ['chrome_win', 'chrome_mac', 'safari_ios', 'chrome_android'];
            chosenType = getRandomItem(types);
        }

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

// বাটনের অনক্লিক ইভেন্ট না থাকলে ব্যাকআপ সাপোর্ট
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('button.btn-primary') || document.querySelectorAll('button')[1];
    if (btn) {
        btn.onclick = generateUserAgents;
    }
});
