// リンク変更用コールバック関数を定義
const callback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            let mtb = mutation.target.closest("a")
            let linkim = mtb.getElementsByTagName("span");
            let url1 = linkim[0].getAttribute("to");
            mtb.setAttribute("href", url1);
            mtb.setAttribute("target","_blank");
            let cloneblock = mtb.cloneNode(true);
            mtb.after(cloneblock);
            mtb.remove();
        }
    }
};

const observer = new MutationObserver(callback);
const config = { attributes: true, childList: true, subtree: true };
window.onload = function(){
    const wind1 = document.getElementsByClassName("sc-162tykz-0");
    const observer2 = new MutationObserver((mutations) => {
        mutations.forEach((mutation2) => {
            const elms = wind1[0].querySelectorAll("div");
            // 検索欄のイラストについて絞り込み
            const ildat = Array.from(elms).filter(element => element.textContent === '人気のイラストタグ');
            let ilpar = ildat[0].closest(".sc-1fde8uu-0");
            let iltargetElements = ilpar.querySelectorAll("a");
            for (const element of iltargetElements) {
                observer.observe(element,config);
            }

            // 検索欄の小説について絞り込み
            const nvdat = Array.from(elms).filter(element => element.textContent === '人気の小説タグ');
            let nvpar = nvdat[0].closest(".sc-1fde8uu-0");
            let nvtargetElements = nvpar.getElementsByTagName("a");
            for (const element of nvtargetElements) {
                observer.observe(element,config);
            }
        });
    });
    observer2.observe(wind1[0], config);
}