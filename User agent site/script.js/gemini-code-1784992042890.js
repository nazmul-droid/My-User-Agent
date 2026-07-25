// ১. পাসওয়ার্ড সেটিংস (এখানে আপনার নিজের পাসওয়ার্ড সেট করুন)
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

// Tier 1 Country Spec/Version Generators (iOS, Android, Mac, Windows, Linux)
const versions = {
    chrome: ["122.0.6261.112", "123.0.6312.86", "124.0.6367.60", "125.0.6422.112"],
    safari: ["17.3.1", "17.4", "17.4.1"],
    ios: ["17_3_1", "17_4", "17_4_1"],
    android: ["12; SM-S908B", "13; SM-S918B", "14; Pixel 8 Pro", "14; SM-S928B"]
};

// ইউজার এজেন্ট টেমপ্লেট
function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateSingleAgent(platform, browser) {
    let agent = "";
    const chromeVer = getRandomItem(versions.chrome);
    const safariVer = getRandomItem(versions.safari);
    const iosVer = getRandomItem(versions.ios);
    const androidVer = getRandomItem(versions.android);

    // Platform logic
    let selectedPlatform = platform;
    if (platform === 'all') {
        const platforms = ['ios', 'android', 'mac', 'windows', 'linux'];
        selectedPlatform = getRandomItem(platforms);
    }

    if (selectedPlatform === 'ios') {
        agent = `Mozilla/5.0 (iPhone; CPU iPhone OS ${iosVer} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/${safariVer} Mobile/15E148 Safari/604.1`;
    } else if (selectedPlatform === 'android') {
        agent = `Mozilla/5.0 (Linux; Android ${androidVer}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVer} Mobile Safari/537.36`;
    } else if (selectedPlatform === 'mac') {
        if (browser === 'safari') {
            agent = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/${safariVer} Safari/605.1.15`;
        } else {
            agent = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVer} Safari/537.36`;
        }
    } else if (selectedPlatform === 'windows') {
        agent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVer} Safari/537.36`;
    } else if (selectedPlatform === 'linux') {
        agent = `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVer} Safari/537.36`;
    }

    // Strict Filter: Facebook User Agent Filter Out
    if (agent.includes("FBAN") || agent.includes("FBAV") || agent.includes("FB_IAB")) {
        return generateSingleAgent(platform, browser); // Re-generate
    }

    return agent;
}

function generateAgents() {
    const count = parseInt(document.getElementById('count').value);
    const platform = document.getElementById('platform').value;
    const browser = document.getElementById('browser').value;
    
    let result = [];
    for (let i = 0; i < count; i++) {
        result.push(generateSingleAgent(platform, browser));
    }

    document.getElementById('result-box').value = result.join('\n');
}

function copyToClipboard() {
    const textarea = document.getElementById('result-box');
    if (!textarea.value) return;
    textarea.select();
    document.execCommand('copy');
    alert('✅ সব ইউজার এজেন্ট কপি করা হয়েছে!');
}

function downloadTxt() {
    const text = document.getElementById('result-box').value;
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const anchor = document.createElement("a");
    anchor.download = "user_agents.txt";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target = "_blank";
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}
